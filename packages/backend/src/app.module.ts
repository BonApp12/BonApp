import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {UsersModule} from './users/users.module';
import {RestaurantModule} from './restaurant/restaurant.module';
import {AddressModule} from './address/address.module';
import {PlateModule} from './plate/plate.module';
import {IngredientsModule} from './ingredients/ingredients.module';
import {PlateCategoryModule} from './plate-category/plate-category.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AuthModule} from './auth/auth.module';
import {ConfigModule} from '@nestjs/config';
import {OrdersModule} from './orders/orders.module';
import * as Joi from 'joi';
import {StripeModule} from './stripe/stripe.module';
import {MailModule} from './mail/mail.module';
import {GoogleModule} from './google/google.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import {PdfModule} from "./pdf/pdf.module";
import { OrderPlateModule } from './order-plate/order-plate.module';

@Module({
    imports: [
        UsersModule,
        RestaurantModule,
        AddressModule,
        PlateModule,
        IngredientsModule,
        PlateCategoryModule,
        TypeOrmModule.forRoot(),
        AuthModule,
        ServeStaticModule.forRoot(),
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
                JWT_ACCESS_TOKEN_EXPIRATION_TIME_WEB: Joi.string().required(),
                JWT_ACCESS_TOKEN_EXPIRATION_TIME_MOBILE: Joi.string().required(),
                STRIPE_SECRET_KEY: Joi.string(),
                STRIPE_CURRENCY: Joi.string(),
            }),
        }),
        OrdersModule,
        StripeModule,
        GoogleModule,
        MailModule,
        PdfModule,
        OrderPlateModule
    ],
    controllers: [AppController],
})
export class AppModule {
}
