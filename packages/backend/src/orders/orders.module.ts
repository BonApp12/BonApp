import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersGateway } from './orders.gateway';
import { Order } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [OrdersGateway, OrdersService],
  imports: [TypeOrmModule.forFeature([Order])],
})
export class OrdersModule {}
