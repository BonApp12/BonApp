import {PlateDto} from "../../plate/dto/plate.dto";
import {RestaurantDto} from "../../restaurant/dto/restaurant.dto";

export class IngredientDto {
    id: number;
    name: string;
    plates: PlateDto[];
    restaurant: RestaurantDto;
}
