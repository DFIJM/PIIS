import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import * as express from 'express';
import * as http from 'http';
import { readFileSync } from 'fs';

async function bootstrap() {
  const HTTP_PORT = 8083;
  const HTTPS_PORT = 8082;

  // Redirección a HTTPS
  const server = express();
  server.use((req, res) => res.redirect('https://' + req.headers.host + req.url));
  http.createServer(server).listen(HTTP_PORT);

  // Creación de la aplicación servidor
  const app = await NestFactory.create(
    AppModule,
    process.env.NODE_ENV === 'prod'
      ? {
          httpsOptions: {
            key: readFileSync('./ssl/private-key.key'),
            cert: readFileSync('./ssl/public-certificate.crt')
          }
        }
      : {}
  );
  app.setGlobalPrefix('api');
  app.use(morgan(process.env.NODE_ENV === 'prod' ? 'common' : 'dev'));
  await app.listen(HTTPS_PORT, () => console.info('Servidor HTTPS arrancado'));
}
bootstrap();
