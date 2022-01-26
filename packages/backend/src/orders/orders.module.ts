import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersGateway } from './orders.gateway';

@Module({
  providers: [OrdersGateway, OrdersService]
})
export class OrdersModule {}
