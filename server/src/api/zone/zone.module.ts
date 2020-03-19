import { Module } from '@nestjs/common';
import { ZoneController } from './zone.controller';
import { FoursquareModule } from '../../external-apis/foursquare/foursquare.module';
import { OpenStreetMapModule } from '../../external-apis/openstreetmap/openstreetmap.module';
import { TwitterModule } from '../../external-apis/twitter/twitter.module';
import { DatabaseModule } from '../../shared/database/database.module';
import { ZoneSchema } from './zone.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    FoursquareModule,
    OpenStreetMapModule,
    TwitterModule,
    DatabaseModule,
    MongooseModule.forFeature([{ name: 'Zone', schema: ZoneSchema }])
  ],
  controllers: [ZoneController]
})
export class ZoneModule {}
