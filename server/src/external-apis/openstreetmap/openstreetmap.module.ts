import { Module, HttpModule } from '@nestjs/common';
import { OpenStreetMapService } from './openstreetmap.service';

@Module({
  imports: [HttpModule],
  providers: [OpenStreetMapService],
  exports: [OpenStreetMapService]
})
export class OpenStreetMapModule {}
