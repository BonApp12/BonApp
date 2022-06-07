import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer,
} from '@nestjs/websockets';
import {OrdersService} from './orders.service';
import {CreateOrderDto} from './dto/create-order.dto';
import {UpdateOrderDto} from './dto/update-order.dto';
import {Server, Socket} from 'socket.io';
import {Logger} from "@nestjs/common";

@WebSocketGateway({cors: true})
export class OrdersGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    constructor(private readonly ordersService: OrdersService) {
    }

    @WebSocketServer() wss: Server;

    private logger: Logger = new Logger('OrdersGateway');


    afterInit(server: Server) {
      this.logger.log('Initialized');
    }

    handleDisconnect(client: Socket) {
      this.logger.log(`Disconnecting client ${client.id}`);
    }

    handleConnection(client: Socket, ...args: any[]) {
        this.logger.log(`Client ${client.id} connected`);
        this.wss.socketsJoin(`ordersRoom${client.id}`);
    }

    @SubscribeMessage('createOrder')
    update(client: Socket) {
        // TODO : Check why it sends the message to every sockets
        this.logger.log(`Client ${client.id} created an order`)
        this.wss.to(`ordersRoom${client.id}`).emit("orderCreated", "Order created");
    }

    @SubscribeMessage('removeOrder')
    remove(@MessageBody() id: number) {
        return this.ordersService.remove(id);
    }
}
