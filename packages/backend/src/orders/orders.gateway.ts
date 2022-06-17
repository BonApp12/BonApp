import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer,
} from '@nestjs/websockets';
import {OrdersService} from './orders.service';
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
    }

    @SubscribeMessage('joinTable')
    joinTable(client: Socket, args: Record<string, unknown>) {
        const roomId = `ordersRoomTable:${args.idTable}Restaurant:${args.idRestaurant}`;
        this.logger.log(`Client ${client.id} joined table ${args.idTable} of restaurant ${args.idRestaurant}`);
        this.wss.socketsJoin(roomId);
        this.wss.to(roomId).emit("userJoinedRoom", `User ${client.id} joined table ${args.idTable}`);
    }

    @SubscribeMessage('addToCart')
    addToCart(client: Socket, args: Record<string, unknown>) {
        this.logger.log(`Client ${client.id} from table ${args.idTable} added something to his cart`);
        console.log(args.plate);
    }

    @SubscribeMessage('createOrder')
    update(client: Socket) {
        this.logger.log(`Client ${client.id} created an order`)
        this.wss.to(client.id).emit("orderCreated", `Order created by ${client.id}`);
    }

    @SubscribeMessage('removeOrder')
    remove(@MessageBody() id: number) {
        return this.ordersService.remove(id);
    }
}
