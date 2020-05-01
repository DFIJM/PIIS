import { Controller, Post, Body, InternalServerErrorException } from '@nestjs/common';
import { Zone, RectangleOptions } from './zone';
import { FoursquareService } from '../../external-apis/foursquare/foursquare.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TwitterService } from '../../external-apis/twitter/twitter.service';
import { OpenStreetMapService } from '../../external-apis/openstreetmap/openstreetmap.service';
import { getAreaOfPolygon, convertArea } from 'geolib';

@Controller('zone')
export class ZoneController {
  constructor(
    private foursquare: FoursquareService,
    private twitter: TwitterService,
    private openStreetMap: OpenStreetMapService,
    @InjectModel('Zone') private zoneModel: Model<Zone>
  ) {
    this.twitter.init();
  }

  @Post('get')
  get() {
    return this.zoneModel.find().exec();
  }

  @Post('create')
  async create(@Body() zone: Zone) {
    let existingZone = await this.zoneModel.findOne({ name: zone.name });
    let drawingsToAdd = [];
    // Si la zona existe, buscamos si la API se repite, en ese caso ignoramos
    // No permitimos más de una API por zona. Limitación temporal.
    if (existingZone) {
      for (let drawing of zone.drawings) {
        let exists = false;
        for (let existingDrawing of existingZone.drawings) {
          if (existingDrawing.api === drawing.api) {
            exists = true;
            break;
          }
        }
        if (!exists) {
          // Si la API no existe en la base de datos
          drawingsToAdd.push(drawing);
        }
      }
      if (drawingsToAdd.length) {
        existingZone.drawings.push(...drawingsToAdd);
        await existingZone.save();
        for (let drawing of drawingsToAdd) {
          if (drawing.api === 'twitter') {
            try {
              await this.twitter.play(existingZone.name);
              existingZone.playing = true;
              await existingZone.save();
            } catch (err) {
              console.error(err);
              existingZone.playing = false;
              await existingZone.save();
            }
            break;
          }
        }
      } else {
        throw new InternalServerErrorException('No se admiten APIs duplicadas con el mismo nombre');
      }
    } else {
      await this.zoneModel.create(zone);
    }
  }

  @Post('remove')
  async remove(@Body() { name }) {
    try {
      await this.twitter.stop(name);
    } catch (err) {} // Nos da igual si da error o no existe
    await this.twitter.remove(name);
    await this.zoneModel.deleteOne({ name }).exec();
  }

  @Post('twitter/play')
  twitterPlay(@Body() { name }) {
    return this.twitter.play(name);
  }

  @Post('twitter/stop')
  twitterStop(@Body() { name }) {
    return this.twitter.stop(name);
  }

  @Post('business')
  async business(@Body() { name }) {
    return this.foursquare.get(name);
  }

  @Post('info')
  async info(@Body() { name }) {
    let data = {
      business: await this.foursquare.info(name),
      twitter: await this.twitter.info(name),
      zone: await this.zoneModel.findOne({ name }),
      km2: null
    };

    // Calculamos km2
    let rectangle;
    for (let drawing of data.zone.drawings) {
      if (drawing.type === 'RECTANGLE') {
        rectangle = (<RectangleOptions>drawing.options).bounds;
        break;
      }
    }
    if (rectangle) {
      data.km2 = convertArea(getAreaOfPolygon(rectangle.map(coord => [coord.lat, coord.lng])), 'km2');
    }

    return data;
  }
}
