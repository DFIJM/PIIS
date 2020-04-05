import { Controller, Post, Body } from '@nestjs/common';
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

  @Post('set')
  set(@Body() zone: Zone) {
    return new this.zoneModel(zone).save();
  }

  @Post('info')
  info(@Body() zone: Zone) {
    return this.foursquare.get(zone);
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
    return this.twitter.play(zone);
  }
}
