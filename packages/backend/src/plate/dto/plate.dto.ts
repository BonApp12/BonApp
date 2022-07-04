import {PlateCategory} from "../../plate-category/entities/plate-category.entity";
import {Order} from "../../orders/entities/order.entity";
import {RestaurantDto} from "../../restaurant/dto/restaurant.dto";
import {IngredientDto} from "../../ingredients/dto/ingredient.dto";
import {PlateRole} from "../PlateRole.enum";

export class PlateDto {

    id: number;

    restaurant: RestaurantDto;

    name: string;

    description: string;

    price: number;

    ingredients: IngredientDto[];

    categories: PlateCategory[];

    orders: Order[];

    type: PlateRole;

    photo: string;

    quantity: undefined | number;
}
