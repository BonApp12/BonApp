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
  ],
  controllers: [AppController],
})
export class AppModule {}
