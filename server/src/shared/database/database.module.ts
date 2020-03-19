import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://piis20:Uc%40m.2020@lorkiano.ddns.net', {
      dbName: 'piis',
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  ]
})
export class DatabaseModule {}
