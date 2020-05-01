import { Module, HttpModule } from '@nestjs/common';
import { TwitterService } from './twitter.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ZoneSchema } from '../../api/zone/zone.schema';
import { TweetSchema } from './twitter.schema';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: 'Zone', schema: ZoneSchema }]),
    MongooseModule.forFeature([{ name: 'Tweet', schema: TweetSchema }])
  ],
  providers: [TwitterService],
  exports: [TwitterService]
})
export class TwitterModule {}
