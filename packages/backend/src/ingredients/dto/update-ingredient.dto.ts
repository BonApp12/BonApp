import {PartialType} from '@nestjs/mapped-types';
import {IngredientDto} from './ingredient.dto';

export class UpdateIngredientDto extends PartialType(IngredientDto) {}
