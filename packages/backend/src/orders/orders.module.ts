import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersGateway } from './orders.gateway';
import { Order } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './orders.controller';
import {OrderPlateModule} from "../order-plate/order-plate.module";
import {OrderPlate} from "../order-plate/entities/order-plate.entity";
import {UsersService} from "../users/users.service";
import {UsersModule} from "../users/users.module";
import {Users} from "../users/entities/users.entity";
import {TablesService} from "../tables/tables.service";
import {Tables} from "../tables/entities/tables.entity";

@Module({
  providers: [OrdersGateway, OrdersService, UsersService, TablesService],
  imports: [TypeOrmModule.forFeature([Order]), TypeOrmModule.forFeature([OrderPlate]),
    OrderPlateModule, TypeOrmModule.forFeature([Users]), TypeOrmModule.forFeature([Tables])],
  exports: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
