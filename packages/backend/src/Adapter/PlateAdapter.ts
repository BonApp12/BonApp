import {Injectable} from '@nestjs/common';
import {Plate} from "../plate/entities/plate.entity";
import {PlateDto} from "../plate/dto/plate.dto";
import {RestaurantAdapter} from "./RestaurantAdapter";
import {IngredientAdapter} from "./IngredientAdapter";

@Injectable()
export class PlateAdapter {

    static toDto(plate: Plate): PlateDto {
        const plateDto = new PlateDto();
        plateDto.id = plate.id;
        plateDto.name = plate.name;
        plateDto.price = plate.price;
        plateDto.restaurant = RestaurantAdapter.toDto(plate?.restaurant);
        plateDto.description = plate.description;
        plateDto.ingredients = plate.ingredients.map(ingredient => IngredientAdapter.toDto(ingredient));
        plateDto.category = plate.category;
        plateDto.orders = plate.orders;
        return plateDto;
    }

    static toModel(plate: PlateDto): Plate {
        console.log("le plate dans l'adapteur", plate);
        const plateModel = new Plate();
        plateModel.id = plate?.id;
        plateModel.name = plate.name;
        plateModel.price = plate?.price;
        // TODO: set le restaurant recupérer du front
        // plateModel.restaurant = RestaurantAdapter.toModel(plate.restaurant);
        plateModel.description = plate?.description;
        plateModel.ingredients = plate?.ingredients.map(ingredient => IngredientAdapter.toModel(ingredient));
        plateModel.category = plate?.category;
        plateModel.orders = plate?.orders;
        return plateModel;
    }

    static toDtoList(plates: Plate[]): PlateDto[] {
        return plates?.map(plate => PlateAdapter.toDto(plate));
    }
}
