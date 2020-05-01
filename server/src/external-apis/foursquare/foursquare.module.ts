import { Module, HttpModule } from '@nestjs/common';
import { FoursquareService } from './foursquare.service';
import { ZoneSchema } from '../../api/zone/zone.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [HttpModule, MongooseModule.forFeature([{ name: 'Zone', schema: ZoneSchema }])],
  providers: [FoursquareService],
  exports: [FoursquareService]
})
export class FoursquareModule {}
