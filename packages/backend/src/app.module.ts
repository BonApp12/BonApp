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
        JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
        JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),
      }),
    }),
    OrdersModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
