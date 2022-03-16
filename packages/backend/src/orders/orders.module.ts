import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersGateway } from './orders.gateway';
import { Order } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './orders.controller';

@Module({
  providers: [OrdersGateway, OrdersService],
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [OrdersController],
})
export class OrdersModule {}
