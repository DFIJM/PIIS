import { Controller, Post, Body } from '@nestjs/common';
import { Zone } from './zone';
import { FoursquareService } from '../../external-apis/foursquare/foursquare.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Controller('zone')
export class ZoneController {
  constructor(private foursquare: FoursquareService, @InjectModel('Zone') private zoneModel: Model<Zone>) {}

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
}
