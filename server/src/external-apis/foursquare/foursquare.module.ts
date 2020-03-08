import { Module, HttpModule } from '@nestjs/common';
import { FoursquareService } from './foursquare.service';

@Module({
  imports: [HttpModule],
  providers: [FoursquareService],
  exports: [FoursquareService]
})
export class FoursquareModule {}
