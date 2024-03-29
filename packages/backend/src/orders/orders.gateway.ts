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
import {TablesService} from "../tables/tables.service";
import {IsNull, Not} from "typeorm";
import {NotificationMessageEnum} from "./enum/NotificationMessageEnum";
import {Tables} from "../tables/entities/tables.entity";
import cookieParser from 'cookie-parser';

@WebSocketGateway({cors: true})
export class OrdersGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    constructor(
        private readonly ordersService: OrdersService,
        private readonly usersService: UsersService,
        private readonly tableService: TablesService,) {
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

    /**
     *
     * @param client
     * @param joiningTable
     * joiningTable has : idRestaurant, idTable, user as object Entries
     * the client user is joining the table
     */
    @SubscribeMessage('userJoinTable')
    joinTable(client: Socket, joiningTable: any) {
        // Creating room id and joining it
        const roomId = `ordersRoomTable:${joiningTable.idTable}Restaurant:${joiningTable.idRestaurant}`;
        this.logger.log(`Client ${client.id} joined table ${joiningTable.idTable} of restaurant ${joiningTable.idRestaurant}`);
        client.join(roomId);


        // Adding Client socket ID to User for retrieving it easily
        joiningTable.user["socket"] = client.id;


        // Checking if user is already in an existing room (to avoid being in 2 different tables)
        if (this.users.has(roomId)) {
            const userExists = this.users.get(roomId).filter((user) => joiningTable.user.nickname === user.nickname);
            if (userExists.length === 0) {
                this.users.set(roomId, [...this.users.get(roomId), joiningTable.user]);
            }
        } else this.users.set(roomId, [joiningTable.user]);

        this.wss.to(roomId).emit("userJoinedTable", this.users.get(roomId));
        this.wss.to(client.id).emit("getSocketId", client.id);
    }

    // this is used in restaurant Back office to watch orders
    @SubscribeMessage('StaffJoinRestaurantRoom')
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

        // Duplicate of line 79
        if (this.users.has(roomId)) {
            const userExists = this.users.get(roomId).filter((user) => args.user.nickname === user.nickname);
            if (userExists.length === 0) {
                this.users.set(roomId, [...this.users.get(roomId), user]);
            }
        } else {
            this.users.set(roomId, [user]);
        }
    }

    @SubscribeMessage('joinWaiterRoom')
    joinWaiterRoom(client: Socket, user: Record<string, any>) {
        const roomId = `Waiter:${user.restaurant.id}:Room`;
        this.logger.log(`Client ${client.id} joined waiter room ${roomId}`);
        client.join(roomId);

        const currentUser = {
            nickname: user.email,
            role: user.role,
            socket: client.id
        };
        // Duplicate of line 79
        if (this.users.has(roomId)) {
            const userExists = this.users.get(roomId).filter((user) => user.nickname === currentUser.nickname);
            if (userExists.length === 0) {
                this.users.set(roomId, [...this.users.get(roomId), currentUser]);
            }
        } else {
            this.users.set(roomId, [currentUser])
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

    /**
     *
     * @param client
     * @param args
     * This is triggered when an order is created successfully
     * Why is there a lot of rooms ?
     */
    @SubscribeMessage('createOrder')
    create(client: Socket, args: Record<string, any>) {
        const rooms = Array.from(client.rooms);
        if (this.users.get(rooms[1]) !== undefined) {
            const idRestaurant = rooms[1].substring(rooms[1].indexOf('Restaurant:') + 11);
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
    async update(client: Socket, newOrder: Record<string, any>) {
        const clientRoom = `ordersRoomTable:${newOrder.order.tableId}Restaurant:${newOrder.order.restaurantId}`;
        const clients = this.users.get(clientRoom);

        if (newOrder.order.status === "ready") {
            const notificationMessage = `La commande N°${newOrder.order.id} est prête !`;
            const table = await this.tableService.findOne(newOrder.order.tableId);
            this.sendNotificationToWaiters(newOrder.order.restaurantId, table, notificationMessage)
                .then(() => {
                    const waiterRoom = `Waiter:${newOrder.order.restaurantId}:Room`;
                    this.wss.to(waiterRoom).emit("orderStatusUpdated", newOrder.order);
                });
        }

        if (clients !== undefined) {
            if (clients.length > 1 ) {
                clients.forEach((client) => {
                    if (client.nickname === newOrder.order.nickname) {
                        if (client.order.length > 1) {
                            Object.keys(client?.order).forEach((orderId) => {
                                let intOrder = parseInt(orderId);
                                if (intOrder === newOrder.order.id) {
                                    this.wss.to(client.socket).emit("orderUpdated", newOrder.order);
                                }
                            })
                        } else if (client.order.length === 1) {
                            if (client.order.id === newOrder.order.id) {
                                this.wss.to(client.socket).emit("orderUpdated", newOrder.order);
                            }
                        }
                    }
                });
            } else if (clients.length === 1) {
                if (clients[0].nickname === newOrder.order.nickname) {
                    if (clients[0].order.id === newOrder.order.id) {
                        this.wss.to(clients[0].socket).emit("orderUpdated", newOrder.order);
                    }
                }
            }
        }
    }

    @SubscribeMessage('orderCompleted')
    orderCompleted(client: Socket, completedOrder: Record<string, any>) {
        const clientRoom = `ordersRoomTable:${completedOrder.tableId}Restaurant:${completedOrder.restaurantId}`;
        const clients = this.users.get(clientRoom);

        if (clients !== undefined) {
            clients.forEach((client) => {
                client?.order?.forEach((order) => {
                    if (order.id === completedOrder.id) {
                        this.wss.to(client.socket).emit("orderCompleted", completedOrder);
                    }
                });
            });
        }
    }

    @SubscribeMessage('needSomething')
    async needSomething(client: Socket, args: Record<string, any>) {
        const message = NotificationMessageEnum[args.thing];
        const table = await this.tableService.findOne(args.idTable);
        const waiterRoom = `Waiter:${args.idRestaurant}:Room`;
        const socketMessage = {libelleTable: table.libelle, idTable: table.id, message};

        this.wss.to(waiterRoom).emit("needSomething", socketMessage);
        await this.sendNotificationToWaiters(args.idRestaurant, table, message);
    }

    private async sendNotificationToWaiters(idRestaurant: number, table: Tables, message: string) {
        const expoTokens = [];
        const waiters = await this.usersService.findMultipleBy({
            role: 'R_SERVER',
            restaurant: idRestaurant,
            where: {
                expoToken: Not(IsNull())
            }
        });
        waiters.forEach((waiter) => {
            expoTokens.push(waiter.expoToken);
        });
        const notificationMessage = `Table ${table.libelle} : ${message}`;
        this.ordersService.sendNotification(expoTokens, notificationMessage);
    }
}
