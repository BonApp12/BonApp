import {Injectable} from '@nestjs/common';
import {UpdateOrderDto} from './dto/update-order.dto';
import {Repository} from 'typeorm';
import {Order} from './entities/order.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Expo} from 'expo-server-sdk';
import {OrderPlate} from "../order-plate/entities/order-plate.entity";
import {PlateAdapter} from "../Adapter/PlateAdapter";
import {Plate} from "../plate/entities/plate.entity";
import {Restaurant} from "../restaurant/entities/restaurant.entity";
import {Tables} from "../tables/entities/tables.entity";
import {Users} from "../users/entities/users.entity";
import {OrderAdapter} from "../Adapter/OrderAdapter";
import {TableAdapter} from "../Adapter/TableAdapter";

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
        @InjectRepository(OrderPlate)
        private orderPlateRepository: Repository<OrderPlate>,
    ) {
    }

    findAll() {
        /*TODO: il est placé ici pour des fin de test
        Quand wass aura intégrer les socket il devra placer cette méthodes dans la méthode associée
        Se référer à la documentation associée à la méthode pour savoir ce qu'elle attend.
         */
        this.sendNotification( null, null);
        /* Récupération de toutes les commandes avec les relations User et Restaurant */
        return this.orderRepository.find({relations: ['user', 'restaurant', 'orderPlates', 'orderPlates.plate']});
    }

    findOne(id: number) {
        // TODO : Remplacer ce findOne spécifiquement pour ne récupérer que les informations pertinentes.
        //  Pour l'instant, il renvoie même le mot de passe de l'utilisateur lié.
        return this.orderRepository.findOne(id, {
            relations: ['user', 'restaurant', 'orderPlates', 'orderPlates.plate'],
        });
    }

    findOrderByUser(id: number) {
        return this.orderRepository.find({
            relations: ['restaurant', 'orderPlates', 'orderPlates.plate'],
            where: {'user': {id}},
            order: {
                created_at: "DESC"
            }
        });
    }

    findByRestaurant(id: number) {
        return this.orderRepository.find({
            relations: ['user', 'orderPlates', 'orderPlates.plate'],
            where: {
                'restaurant': {id}
            }
        });
    }

    findByStatus(status: string) {
        return this.orderRepository.find({
            relations: ['user', 'orderPlates', 'orderPlates.plate'],
            where: {
                'status': status,
            }
        })
    }

    findByRestaurantByStatus(status: string, id: string) {
        return this.orderRepository.find({
            relations: ['user', 'orderPlates', 'orderPlates.plate', 'restaurant'],
            where: {
                'status': status,
                'restaurant': {id}
            }
        })
    }

    countOrderByMonth(id: number, date: string) {
        const query = this.orderRepository.createQueryBuilder("o")
            .select("EXTRACT(MONTH FROM o.created_at)", "month")
            .addSelect("COUNT(*)", "count")
            .innerJoin("o.restaurant", "r")
            .where("EXTRACT(YEAR FROM o.created_at) = :date", {date: date})
            .andWhere("r.id = :id", {id})
            .groupBy("EXTRACT(MONTH FROM o.created_at)")
            .orderBy("EXTRACT(MONTH FROM o.created_at)");
        return query.getRawMany();
    }



    async update(id: number, updateOrderDto: UpdateOrderDto) {
        return await this.orderRepository
            .createQueryBuilder()
            .update(Order)
            .set({status: "completed"})
            .where("id = :id", {id: id})
            .returning("*")
            .execute();
    }

    remove(id: number) {
        return `This action removes a #${id} order`;
    }

    async create(cart: Plate[], restaurant: Restaurant, user: Users | undefined) {
        const plates = PlateAdapter.toDtoList(cart);
        const table = TableAdapter.toModel(restaurant.tables);

        // Création de l'Order
        const createOrder = new Order();
        createOrder.restaurant = restaurant;
        createOrder.table = table;
        createOrder.user = user;

        return await this.orderRepository.save(createOrder)
            .then((result) => {
                if (result.id !== undefined) {
                    plates.forEach(plate => {
                        const orderPlate = new OrderPlate();
                        orderPlate.order = createOrder;
                        orderPlate.plate = plate;
                        orderPlate.quantity = plate.quantity;
                        orderPlate.price = plate.price;
                        this.orderPlateRepository.save(orderPlate);
                    });
                    return result;
                }
            })
            .catch((error) => {
                console.log(error);
                return error;
            });
    }


    public sendNotification(expoTokens: string[], message: string) {
        /* TODO: ici on fera la requête en fonction de l'order et des serveurs qui doivent recupérer la notification
        Typiquement order.restaurant.users.filter(user => user.role === UserRole.RESTAURANT_SERVER)
        On peut aussi s'en servir pour tout tant que l'on a bien un expoToken en bdd
         */
        //const tokens = ["ExponentPushToken[GFKetONHkXVwJ3MJpYrnVF]"];
// Create a new Expo SDK client
// optionally providing an access token if you have enabled push security
        const expo = new Expo({accessToken: process.env.EXPO_ACCESS_TOKEN});

// Create the messages that you want to send to clients
        const messages = [];
        expoTokens.forEach(pushToken => {
            // Check that all your push tokens appear to be valid Expo push tokens
            if (!Expo.isExpoPushToken(pushToken)) {
                console.error(`Push token ${pushToken} is not a valid Expo push token`);
            }

            // Construct a message (see https://docs.expo.io/push-notifications/sending-notifications/)
            messages.push({
                to: pushToken,
                sound: 'default',
                body: message,
                data: {withSome: 'data'},
            });
        });


        const chunks = expo.chunkPushNotifications(messages);
        const tickets = [];
        (async () => {
            // Send the chunks to the Expo push notification service. There are
            // different strategies you could use. A simple one is to send one chunk at a
            // time, which nicely spreads the load out over time:
            for (const chunk of chunks) {
                try {
                    const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
                    tickets.push(...ticketChunk);
                    // NOTE: If a ticket contains an error code in ticket.details.error, you
                    // must handle it appropriately. The error codes are listed in the Expo
                    // documentation:
                    // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
                } catch (error) {
                    console.error(error);
                }
            }
        })();

    }
}
