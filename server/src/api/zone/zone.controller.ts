import { Controller, Post, Body } from '@nestjs/common';
import { Zone } from './zone';

@Controller('zone')
export class ZoneController {
  zones: Zone[] = [];

  @Post('get')
  get() {
    return this.zones;
  }

  @Post('set')
  set(@Body() body: Zone) {
    this.zones.push(body);
  }
}
