import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: ['http://localhost:3000'], // TODO : Rajouter le domaine de production.
  });
  app.use(cookieParser());
  await app.listen(4000);
}
bootstrap();
