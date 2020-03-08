import { Module } from '@nestjs/common';
import { ZoneController } from './zone.controller';
import { FoursquareModule } from '../../external-apis/foursquare/foursquare.module';

@Module({
  imports: [FoursquareModule],
  controllers: [ZoneController]
})
export class ZoneModule {}
