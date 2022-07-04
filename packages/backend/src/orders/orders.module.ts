import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersGateway } from './orders.gateway';
import { Order } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './orders.controller';
import {OrderPlateModule} from "../order-plate/order-plate.module";
import {OrderPlate} from "../order-plate/entities/order-plate.entity";

@Module({
  providers: [OrdersGateway, OrdersService],
  imports: [TypeOrmModule.forFeature([Order]), TypeOrmModule.forFeature([OrderPlate]), OrderPlateModule],
  exports: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
