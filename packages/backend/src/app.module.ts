import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { AddressModule } from './address/address.module';
import { PlateModule } from './plate/plate.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { PlateCategoryModule } from './plate-category/plate-category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { OrdersModule } from './orders/orders.module';
import * as Joi from 'joi';
import { StripeModule } from './stripe/stripe.module';

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
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
        JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        STRIPE_SECRET_KEY: Joi.string(),
        STRIPE_CURRENCY: Joi.string(),
      }),
    }),
    OrdersModule,
    StripeModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
