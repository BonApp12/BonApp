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
                    // get every users except the one that disconnects
                    const userMap = this.users.get(room).filter((user) => user.socket !== client.id);
                    this.users.set(room, userMap);
                    this.wss.to(room).emit('userLeftRoom', `${client.id} left the room`);
                    client.leave(room);
                }
            })
        });
    }

    @SubscribeMessage('joinTable') // TODO : Déplacer tout le contenu de cette fonction dans handleConnection()
    joinTable(client: Socket, args: any) {
        // Creating room id and joining it
        const roomId = `ordersRoomTable:${args.idTable}Restaurant:${args.idRestaurant}`;
        this.logger.log(`Client ${client.id} joined table ${args.idTable} of restaurant ${args.idRestaurant}`);
        client.join(roomId);

        // Adding Client socket ID to User for retrieving it easily
        args.user["socket"] = client.id;

        // Checking if user is already in an existing room (to avoid being in 2 different tables) TODO : Faire en sorte de supprimer l'utilisateur de l'ancienne table (avec tout son contenu)
        if (this.users.has(roomId)) {
            this.users.get(roomId).map((user) => {
                if (user.email !== args.user["email"]) {
                    this.users.set(roomId, [...this.users.get(roomId), args.user]);
                }
            });
        } else this.users.set(roomId, [args.user]); // Faire en sorte que l'email soit la clé ?


        //TODO :  Notifying everybody that this user has joined (except himself, change `args` to user informations and his cart)
        this.wss.to(roomId).emit("userJoinedRoom", this.users.get(roomId));
    }


    @SubscribeMessage('userCartUpdated')
    userCartUpdated(client: Socket, args: Record<string, unknown>) {
        this.logger.log(`Client ${client.id} updated something from his cart`);
        const rooms = Array.from(client.rooms);
        const user = this.users.get(rooms[1]).filter((user) => client.id === user.socket);
        if (user !== undefined) this.wss.to(rooms[1]).emit("itemCartUpdated", {user: user[0], cart: args.cart[0]});
    }

        /* PERSISTER L'ID ET FAIRE EN SORTE DE POUVOIR LE RÉCUPÉRER, PEUT-ÊTRE VIA UN CUSTOM ID OU JSP
         (CONCATENER L'EMAIL OU UTILISER L'EMAIL DE LA PERSONNE) (OU PROMPTER L'USER AU DEBUT DU CYCLE D'ACHAT)
         METTRE TOUT ÇA EN CACHE (DOCS NESTJS CACHING) */


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
