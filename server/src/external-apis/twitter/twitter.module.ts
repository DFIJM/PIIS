import { Module, HttpModule } from '@nestjs/common';
import { TwitterService } from './twitter.service';

@Module({
  imports: [HttpModule],
  providers: [TwitterService],
  exports: [TwitterService]
})
export class TwitterModule {}
