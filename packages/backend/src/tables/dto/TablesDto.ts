import {Order} from "../../orders/entities/order.entity";
import {Restaurant} from "../../restaurant/entities/restaurant.entity";

export class TablesDto {
    id: number;
    libelle: string;
    orders: Order[];
    restaurant: Restaurant;
}
