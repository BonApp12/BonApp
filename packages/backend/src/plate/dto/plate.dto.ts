import {PlateCategory} from "../../plate-category/entities/plate-category.entity";
import {Order} from "../../orders/entities/order.entity";
import {RestaurantDto} from "../../restaurant/dto/restaurant.dto";
import {IngredientDto} from "../../ingredients/dto/ingredient.dto";

export class PlateDto {

    id: number;

    restaurant: RestaurantDto;

    name: string;

    description: string;

    price: number;

    ingredients: IngredientDto[];

    category: PlateCategory;

    orders: Order[];
}
