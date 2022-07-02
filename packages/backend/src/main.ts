import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    //credentials: true,
    //TODO: mettre les url dans un .env
    origin: '*',
  });
  app.use(cookieParser());
  await app.listen(4000);
}
bootstrap();
