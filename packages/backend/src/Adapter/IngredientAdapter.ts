import {Injectable} from '@nestjs/common';
import {IngredientDto} from "../ingredients/dto/ingredient.dto";
import {Ingredient} from "../ingredients/entities/ingredient.entity";
import {PlateAdapter} from "./PlateAdapter";

@Injectable()
export class IngredientAdapter {

    static toDto(ingredient: Ingredient): IngredientDto {
        const ingredientDto = new IngredientDto();
        ingredientDto.id = ingredient?.id;
        ingredientDto.name = ingredient.name;
        return ingredientDto;


    }

    static toModel(ingredient: IngredientDto): Ingredient {
        const ingredientModel = new Ingredient();
        ingredientModel.id = ingredient?.id;
        ingredientModel.name = ingredient.name;
        ingredientModel.plates = PlateAdapter.toModel(ingredient.plates);
        return ingredientModel;
    }

    static toModelInsert(ingredient: IngredientDto): Ingredient {
        const ingredientModel = new Ingredient();
        ingredientModel.name = ingredient.name;
        return ingredientModel;
    }

}

