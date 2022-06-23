import {Injectable} from '@nestjs/common';
import {CreateOrderDto} from './dto/create-order.dto';
import {UpdateOrderDto} from './dto/update-order.dto';
import {Repository} from 'typeorm';
import {Order} from './entities/order.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Expo} from 'expo-server-sdk';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
    ) {
    }

    create(createOrderDto: CreateOrderDto) {
        return 'This action adds a new order';
    }

    findAll() {
        OrdersService.sendNotification();
        /* Récupération de toutes les commandes avec les relations User et Restaurant */
        return this.orderRepository.find({relations: ['user', 'restaurant', 'plate']});
    }

    findOne(id: number) {
        // TODO : Remplacer ce findOne spécifiquement pour ne récupérer que les informations pertinentes.
        //  Pour l'instant, il renvoie même le mot de passe de l'utilisateur lié.
        return this.orderRepository.findOne(id, {
            relations: ['user', 'restaurant', 'plate'],
        });
    }

    findOrderByUser(id: number) {
        return this.orderRepository.find({
            relations: ['restaurant', 'plate'],
            where: {'user': {id}},
            order: {
                created_at: "DESC"
            }
        });
    }

    findByRestaurant(id: number) {
        return this.orderRepository.find({
            relations: ['user', 'plate'],
            where: {
                'restaurant': {id}
            }
        });
    }

    findByStatus(status: string) {
        return this.orderRepository.find({
            relations: ['user', 'plate'],
            where: {
                'status': status,
            }
        })
    }

    findByRestaurantByStatus(status: string, id: string) {
        return this.orderRepository.find({
            relations: ['user', 'plate', 'restaurant'],
            where: {
                'status': status,
                'restaurant': {id}
            }
        })
    }

    async update(id: number, updateOrderDto: UpdateOrderDto) {
        return await this.orderRepository
            .createQueryBuilder()
            .update(Order)
            .set({status: "completed"})
            .where("id = :id", {id: id})
            .execute();
    }

    remove(id: number) {
        return `This action removes a #${id} order`;
    }

    private static sendNotification() {
        console.log("Sending notification");

// Create a new Expo SDK client
// optionally providing an access token if you have enabled push security
        let expo = new Expo({accessToken: process.env.EXPO_ACCESS_TOKEN});

// Create the messages that you want to send to clients
        let messages = [];
        const pushToken = "ExponentPushToken[yXejFVPZOwh_c45bQmSYih]";
        // Check that all your push tokens appear to be valid Expo push tokens
        if (!Expo.isExpoPushToken(pushToken)) {
            console.error(`Push token ${pushToken} is not a valid Expo push token`);
        }

        // Construct a message (see https://docs.expo.io/push-notifications/sending-notifications/)
        messages.push({
            to: pushToken,
            sound: 'default',
            body: 'Une nouvelle commande est prête !',
            data: {withSome: 'data'},
        });
        let chunks = expo.chunkPushNotifications(messages);
        let tickets = [];
        (async () => {
            // Send the chunks to the Expo push notification service. There are
            // different strategies you could use. A simple one is to send one chunk at a
            // time, which nicely spreads the load out over time:
            for (let chunk of chunks) {
                try {
                    let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
                    console.log(ticketChunk);
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
