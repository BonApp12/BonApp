import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    allowedHeaders: '*',
    origin: ['http://51.68.45.99:3000', 'http://51.68.45.99:3001', 'http://51.68.45.99:8080', 'http://51.68.45.99:8888', 'http://51.68.45.99:8081'],
  });
  app.use(cookieParser());
  await app.listen(4000);
}
bootstrap();
