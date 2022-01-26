import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@WebSocketGateway()
export class OrdersGateway {
  constructor(private readonly ordersService: OrdersService) {}

  @SubscribeMessage('createOrder')
  create(@MessageBody() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @SubscribeMessage('findAllOrders')
  findAll() {
    return this.ordersService.findAll();
  }

  @SubscribeMessage('findOneOrder')
  findOne(@MessageBody() id: number) {
    return this.ordersService.findOne(id);
  }

  @SubscribeMessage('updateOrder')
  update(@MessageBody() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(updateOrderDto.id, updateOrderDto);
  }

  @SubscribeMessage('removeOrder')
  remove(@MessageBody() id: number) {
    return this.ordersService.remove(id);
  }
}
