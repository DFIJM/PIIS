import { Controller, Post, Body, InternalServerErrorException } from '@nestjs/common';
import { Zone } from './zone';
import { FoursquareService } from '../../external-apis/foursquare/foursquare.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TwitterService } from '../../external-apis/twitter/twitter.service';
import { OpenStreetMapService } from '../../external-apis/openstreetmap/openstreetmap.service';

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
      } else {
        throw new InternalServerErrorException('No se admiten APIs duplicadas con el mismo nombre');
      }
    } else {
      await this.zoneModel.create(zone);
    }
  }

  @Post('info')
  async info(@Body() { name }) {
    return this.foursquare.get(await this.zoneModel.findOne({ name }).exec());
  }

  @Post('resumen')
  resumen(@Body() zone: Zone) {
    return this.twitter.info(zone);
  }

  @Post('twitter/play')
  twitterPlay(@Body() zone: Zone) {
    return this.twitter.play(zone);
  }

  @Post('twitter/stop')
  twitterStop(@Body() zone: Zone) {
    return this.twitter.stop(zone);
  }
}
