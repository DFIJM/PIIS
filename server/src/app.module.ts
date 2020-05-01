import { Module } from '@nestjs/common';
import { ZoneModule } from './api/zone/zone.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ComparativeModule } from './api/comparative/comparative.module';

@Module({
  imports: [
    ZoneModule,
    ComparativeModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'public')
    })
  ]
})
export class AppModule {}
