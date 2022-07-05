import {
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import {OrdersService} from './orders.service';
import {Server, Socket} from 'socket.io';
import {Logger} from "@nestjs/common";
import {UsersService} from "../users/users.service";
import {IsNull, Not} from "typeorm";
import {NotificationMessageEnum} from "./enum/NotificationMessageEnum";

@WebSocketGateway({cors: true})
export class OrdersGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    constructor(
        private readonly ordersService: OrdersService,
        private readonly usersService: UsersService) {
    }

    @WebSocketServer() wss: Server;

    private logger: Logger = new Logger('OrdersGateway');
    public users = new Map();

    afterInit(server: Server) {
        this.logger.log('Initialized');
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Disconnecting client ${client.id}`);
    }

    handleConnection(client: Socket, ...args: any[]) {
        this.logger.log(`Client ${client.id} connected`);

        client.on('disconnecting', () => {
            client.rooms.forEach((room) => {
                // client.rooms contains two rooms : users personal (his id) and ordersRoomTable.
                if (room !== client.id) {
                    this.logger.log(`Client ${client.id} disconnected from room ${room}`);
                    // get every users except the one that disconnects and reassign
                    const userMap = this.users.get(room).filter((user) => user.socket !== client.id);
                    this.users.set(room, userMap);

                    this.wss.to(room).emit('userLeftRoom', this.users.get(room));
                    client.leave(room);
                }
            })
        });
    }

    @SubscribeMessage('joinTable')
    joinTable(client: Socket, args: any) {
        // Creating room id and joining it
        const roomId = `ordersRoomTable:${args.idTable}Restaurant:${args.idRestaurant}`;
        this.logger.log(`Client ${client.id} joined table ${args.idTable} of restaurant ${args.idRestaurant}`);
        client.join(roomId);

        // Adding Client socket ID to User for retrieving it easily
        args.user["socket"] = client.id;

        // Checking if user is already in an existing room (to avoid being in 2 different tables)
        if (this.users.has(roomId)) {
            const userExists = this.users.get(roomId).filter((user) => args.user.nickname === user.nickname);
            if (userExists.length === 0) {
                this.users.set(roomId, [...this.users.get(roomId), args.user]);
            }
        } else this.users.set(roomId, [args.user]);


        this.wss.to(roomId).emit("userJoinedRoom", this.users.get(roomId));
        this.wss.to(client.id).emit("getSocketId", client.id);
    }

    @SubscribeMessage('joinRestaurantRoom')
    joinRestaurantRoom(client: Socket, args: any) {
        // Creating Restaurant Room and joining it
        const roomId = `Restaurant:${args.user.restaurant.id}:Room`;
        this.logger.log(`Client ${client.id} joined restaurant room ${roomId}`);
        client.join(roomId);

        // Creating an User object
        const user = {
            nickname: args.user.email,
            role: args.user.role,
            socket: client.id
        };

        if (this.users.has(roomId)) {
            const userExists = this.users.get(roomId).filter((user) => args.user.nickname === user.nickname);
            if (userExists.length === 0) {
                this.users.set(roomId, [...this.users.get(roomId), user]);
            }
        } else {
            this.users.set(roomId, [user]);
        }
    }

    @SubscribeMessage('userCartUpdated')
    userCartUpdated(client: Socket, args: Record<string, any>) {
        // Getting Room
        const rooms = Array.from(client.rooms);

        if (this.users.get(rooms[1]) !== undefined) {
            // Getting users informations we already have.
            const user = this.users.get(rooms[1]).filter((user) => client.id === user.socket);

            this.logger.log(`Client ${client.id} (${user[0].nickname}) updated something from his cart`);

            // Adding cart inside userm
            user[0].cart = args.cart;

            // Getting every other users except this one and deleting him to add him back again with his new cart.
            const userMap = this.users.get(rooms[1]).filter((user) => client.id !== user.socket);
            userMap.push(user[0]);
            this.users.set(rooms[1], userMap);

            this.wss.to(rooms[1]).emit("itemCartUpdated", this.users.get(rooms[1]));
        }
    }

    @SubscribeMessage('removeOrder')
    remove(@MessageBody() id: number) {
        return this.ordersService.remove(id);
    }

    @SubscribeMessage('createOrder')
    create(client: Socket, args: Record<string, any>) {
        const rooms = Array.from(client.rooms);

        if (this.users.get(rooms[1]) !== undefined) {
            const idRestaurant = rooms[1].substring(rooms[1].indexOf('Restaurant:') + 11);
            console.log(idRestaurant);
            const restaurantRoom = `Restaurant:${idRestaurant}:Room`;

            // Link order and current user in this.users array
            const currentUser = this.users.get(rooms[1]).filter((user) => client.id === user.socket);
            const userMap = this.users.get(rooms[1]).filter((user) => client.id !== user.socket);

            currentUser[0].order = args;
            userMap.push(currentUser[0]);
            this.users.set(rooms[1], userMap);


            this.logger.log(`Client ${client.id} submitted an order and paid for it`);
            this.wss.to(restaurantRoom).emit("orderCreated");
        }

    }

    @SubscribeMessage('findAllOrders')
    findAll() {
        return this.ordersService.findAll();
    }

    @SubscribeMessage('findOneOrder')
    async findOne(@MessageBody() id: number) {
        const event = 'oneOrder';
        const data = await this.ordersService.findOne(id);
        return {event, data};
    }

    @SubscribeMessage('updateOrder')
    update(client: Socket, args: Record<string, any>) {
        const clientRoom = `ordersRoomTable:${args.order.tableId}Restaurant:${args.order.restaurantId}`;
        const clients = this.users.get(clientRoom);

        if (args.order.status === "ready") {
            const notificationMessage = `La commande N°${args.order.id} est prête !`;
            this.sendNotificationToWaiters(args.order.restaurantId, args.order.tableId, notificationMessage);
        }

        if (clients !== undefined) {
            clients.map((c) => {
                c.order.map((o) => {
                    if (o.id === args.order.id) {
                        this.wss.to(c.socket).emit("orderUpdated", args.order);
                        return;
                    }
                })
            });
        }
    }

    @SubscribeMessage('needSomething')
    needSomething(client: Socket, args: Record<string, any>){
        this.sendNotificationToWaiters(args.idRestaurant, args.idTable, args.thing);
    }

    private sendNotificationToWaiters(idRestaurant: number, idTable: number, message: string) {
        // TODO : Retrouver l'intitulé de la table
        this.usersService.findMultipleBy({
            role: 'R_SERVER',
            restaurant: idRestaurant,
            where: {
                expoToken: Not(IsNull())
            }
        }).then((users) => {
            const expoTokens = [];
            users.forEach((user) => {
                expoTokens.push(user.expoToken);
            })
            const notificationMessage = `Table ${idTable} : ${message}`;
            this.ordersService.sendNotification(expoTokens, notificationMessage); // Également envoyer l'ID de la table ainsi que le "thing".
        });
    }
}
