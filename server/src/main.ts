import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { readFileSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    process.env.NODE_ENV === 'prod'
      ? {
          httpsOptions: {
            key: readFileSync('./ssl/private-key.pem'),
            cert: readFileSync('./ssl/public-certificate.pem')
          }
        }
      : {}
  );
  app.setGlobalPrefix('api');
  app.use(morgan(process.env.NODE_ENV === 'prod' ? 'common' : 'dev'));
  await app.listen(8080, () => console.info('Servidor escuchando en el puerto 8080'));
}
bootstrap();
