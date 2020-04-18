import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';

async function bootstrap() {
  const PORT = 3000;
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(morgan(process.env.NODE_ENV === 'prod' ? 'common' : 'dev'));
  await app.listen(PORT, () => console.info('Servidor arrancado'));
}
bootstrap();
