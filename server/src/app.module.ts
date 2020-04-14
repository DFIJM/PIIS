import { Module } from '@nestjs/common';
import { ZoneModule } from './api/zone/zone.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ZoneModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'public')
    })
  ]
})
export class AppModule {}
