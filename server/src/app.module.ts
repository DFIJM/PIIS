import { Module } from '@nestjs/common';
import { ZoneModule } from './api/zone/zone.module';

@Module({
  imports: [ZoneModule]
})
export class AppModule {}
