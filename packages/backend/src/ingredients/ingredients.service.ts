import {Injectable} from '@nestjs/common';
import {IngredientDto} from './dto/ingredient.dto';
import {UpdateIngredientDto} from './dto/update-ingredient.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Ingredient} from './entities/ingredient.entity';
import {Repository} from 'typeorm';
import {IngredientAdapter} from "../Adapter/IngredientAdapter";

@Injectable()
export class IngredientsService {
    constructor(
        @InjectRepository(Ingredient)
        private ingredientRepository: Repository<Ingredient>,
    ) {
    }

    async create(createIngredientDto: IngredientDto) {
        return await this.ingredientRepository.save(IngredientAdapter.toModel(createIngredientDto));
    }

    findAll() {
        return this.ingredientRepository.find();
    }

    findOne(id: number) {
        return this.ingredientRepository.findOne(id);
    }

    findIngredientsAndPlatesLinked(id: number) {
        return this.ingredientRepository.findOne(id, {
            relations: ['plates'],
        });
    }

    update(id: number, updateIngredientDto: UpdateIngredientDto) {
        return `This action updates a #${id} ingredient`;
    }

    remove(id: number) {
        return `This action removes a #${id} ingredient`;
    }
}
