import {MessageBody, SubscribeMessage, WebSocketGateway,} from '@nestjs/websockets';
import {OrdersService} from './orders.service';
import {CreateOrderDto} from './dto/create-order.dto';
import {UpdateOrderDto} from './dto/update-order.dto';

@WebSocketGateway({ cors: true })
export class OrdersGateway {
  constructor(private readonly ordersService: OrdersService) {}

  @SubscribeMessage('createOrder')
  create(@MessageBody() createOrderDto: CreateOrderDto) {
    this.ordersService.create(createOrderDto);
  }

  @SubscribeMessage('findAllOrders')
  findAll() {
    return this.ordersService.findAll();
  }

  @SubscribeMessage('findOneOrder')
  async findOne(@MessageBody() id: number) {
    const event = 'oneOrder';
    const data = await this.ordersService.findOne(id);
    return { event, data };
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
