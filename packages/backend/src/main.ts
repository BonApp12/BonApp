import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        credentials: true,
        //TODO: mettre les url dans un .env
        origin: [
            'http://51.68.45.99:3000',
            'http://51.68.45.99:3001',
            'http://51.68.45.99:3003',
            'http://51.68.45.99:8080',
            'http://51.68.45.99:8888',
            'http://51.68.45.99:8081',
            'http://localhost:3000',
            'http://localhost:3001',
            'http://localhost:3003',
            'http://localhost:8080',
            'http://localhost:8888',
            'https://bonapp.ninja',
            'https://resto.bonapp.ninja',
            'https://restov2.bonapp.ninja',
            'https://client.bonapp.ninja',
            'https://admin.bonapp.ninja',
        ],

    });
    app.use(cookieParser());
    await app.listen(4000);
}

bootstrap();
