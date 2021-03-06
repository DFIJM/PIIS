import { Module } from '@nestjs/common';
import { ComparativeController } from './comparative.controller';
import { FoursquareModule } from '../../external-apis/foursquare/foursquare.module';
import { OpenStreetMapModule } from '../../external-apis/openstreetmap/openstreetmap.module';
import { TwitterModule } from '../../external-apis/twitter/twitter.module';
import { DatabaseModule } from '../../shared/database/database.module';
import { ComparativeSchema } from './comparative.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    FoursquareModule,
    OpenStreetMapModule,
    TwitterModule,
    DatabaseModule,
    MongooseModule.forFeature([{ name: 'Comparative', schema: ComparativeSchema }])
  ],
  controllers: [ComparativeController]
})
export class ComparativeModule {}
