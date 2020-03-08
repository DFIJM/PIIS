import { Module } from '@nestjs/common';
import { ZoneController } from './zone.controller';

@Module({
  imports: [],
  controllers: [ZoneController]
})
export class ZoneModule {}
