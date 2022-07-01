import {Users} from "../../users/entities/users.entity";
import {Restaurant} from "../../restaurant/entities/restaurant.entity";
import {OrderPlate} from "../../order-plate/entities/order-plate.entity";
import {Tables} from "../../tables/entities/tables.entity";

export class CreateOrderDto {
    id: number;

    status: string;

    user: Users | undefined;

    restaurant: Restaurant;

    orderPlates: OrderPlate[];

    table: Tables;
}
