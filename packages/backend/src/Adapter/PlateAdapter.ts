import {Injectable} from '@nestjs/common';
import {Plate} from "../plate/entities/plate.entity";
import {PlateDto} from "../plate/dto/plate.dto";
import {RestaurantAdapter} from "./RestaurantAdapter";
import {IngredientAdapter} from "./IngredientAdapter";
import {setPlateRole} from "../plate/PlateRole.enum";
import {CategoryAdapter} from "./CategoryAdapter";

@Injectable()
export class PlateAdapter {

    static toDto(plate: Plate): PlateDto {
        const plateDto = new PlateDto();
        plateDto.id = plate?.id;
        plateDto.name = plate?.name;
        plateDto.price = plate?.price;
        plateDto.restaurant = RestaurantAdapter.toDto(plate?.restaurant);
        plateDto.description = plate?.description;
        plateDto.ingredients = plate?.ingredients.map(ingredient => IngredientAdapter.toDto(ingredient));
        plateDto.categories = plate?.categories?[...plate.categories]: [];
        plateDto.type = setPlateRole(plate?.type);
        plateDto.photo = plate?.photo;
        plateDto.quantity = plate?.quantity;
        return plateDto;
    }


    static toDtoWithMultiPart(plate: any): PlateDto {
        const plateDto = new PlateDto();
        plateDto.id = plate?.id;
        plateDto.name = plate?.name;
        plateDto.price = plate?.price;
        plateDto.restaurant = RestaurantAdapter.toDto(JSON.parse(plate?.restaurant));
        plateDto.description = plate?.description;
        plateDto.ingredients = JSON.parse(plate?.ingredients).map(ingredient => IngredientAdapter.toDto(ingredient));
        plateDto.categories = [...JSON.parse(plate?.categories)];
        plateDto.type = setPlateRole(JSON.parse(plate?.type));
        plateDto.photo = plate?.photo;
        return plateDto;
    }

    static toModel(plate: PlateDto): Plate {
        const plateModel = new Plate();
        plateModel.id = plate?.id;
        plateModel.name = plate?.name;
        plateModel.price = plate?.price;
        plateModel.restaurant = plate?.restaurant ? RestaurantAdapter.toModel(plate?.restaurant) : null;
        plateModel.description = plate?.description;
        plateModel.ingredients = plate?.ingredients.map(ingredient => IngredientAdapter.toModel(ingredient));
        plateModel.categories = [...plate?.categories];
        return plateModel;
    }

    static toModelInsert(plate: PlateDto): Plate {
        const plateModel = new Plate();
        plateModel.name = plate?.name;
        plateModel.price = plate?.price;
        plateModel.restaurant = plate?.restaurant ? RestaurantAdapter.toModelInsert(plate?.restaurant) : null;
        plateModel.description = plate?.description;
        plateModel.ingredients = plate?.ingredients.map(ingredient => IngredientAdapter.toModelInsert(ingredient));
        plateModel.categories = plate?.categories ? CategoryAdapter.ToArrayModel(plate.categories) : null;
        plateModel.type = plate?.type;
        plateModel.photo = plate?.photo;
        return plateModel;
    }

    static toDtoList(plates: Plate[]): PlateDto[] {
        return plates?.map(plate => PlateAdapter.toDto(plate));
    }

    static toDtoLight(plate: Plate) {
        const plateDto = new PlateDto();
        plateDto.id = plate?.id;
        plateDto.name = plate?.name;
        plateDto.price = plate?.price;
        plateDto.display = plate?.display ?? true;
        plateDto.description = plate?.description;
        plateDto.ingredients = plate?.ingredients.map(ingredient => IngredientAdapter.toDto(ingredient));
        plateDto.categories = [...plate?.categories];
        plateDto.photo = plate?.photo;
        return plateDto;
    }
}
