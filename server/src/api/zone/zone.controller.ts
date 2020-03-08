import { Controller, Post, Body } from '@nestjs/common';
import { Zone } from './zone';
import { FoursquareService } from '../../external-apis/foursquare/foursquare.service';

@Controller('zone')
export class ZoneController {
  constructor(private foursquare: FoursquareService) {}

  zones: Zone[] = [];

  @Post('get')
  get() {
    return this.zones;
  }

  @Post('set')
  set(@Body() zone: Zone) {
    this.zones.push(zone);
  }

  @Post('info')
  info(@Body() zone: Zone) {
    return this.foursquare.get(zone);
  }
}
