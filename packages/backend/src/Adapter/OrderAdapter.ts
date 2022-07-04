import {Injectable} from "@nestjs/common";
import {Order} from "../orders/entities/order.entity";
import * as dayjs from "dayjs";
import {CreateOrderDto} from "../orders/dto/create-order.dto";
import {OrderPlate} from "../order-plate/entities/order-plate.entity";
@Injectable()
export class OrderAdapter {
    static toTransformForPdf(order: Order): any {
        return {
            fullname: order.user.firstname + " " + order.user.lastname,
            email: order.user.email,
            plates: order.orderPlates.map(orderPlate => {
                return {
                    name: orderPlate.plate.name,
                    type: orderPlate.plate.type,
                    price: orderPlate.price,
                    quantity: orderPlate.quantity
                }
            }),
            date: dayjs(order.updated_at).format('DD/MM/YYYY à HH:mm'),
            numInvoice: order.id.toString(),
            companyName: order.restaurant.name,
            companySiren: order.restaurant.siren,
            companyAddress: 'N/A',
            companyPhone: order.restaurant.contact_phone,
            companyEmail: order.restaurant.contact_email,
        }
    }

    static toDto(order: Order, orderPlates: OrderPlate[]): CreateOrderDto {
        const createOrderDto = new CreateOrderDto();

        createOrderDto.id = order?.id;
        createOrderDto.restaurant = order?.restaurant;
        createOrderDto.table = order?.table;
        createOrderDto.user = order?.user;

        return createOrderDto;
    }
}