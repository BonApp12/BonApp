import {Injectable} from '@nestjs/common';
import {UpdatePlateCategoryDto} from './dto/update-plate-category.dto';
import {Repository} from "typeorm";
import {PlateCategory} from "./entities/plate-category.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class PlateCategoryService {
    constructor(
        @InjectRepository(PlateCategory)
        private readonly plateCategoryRepository: Repository<PlateCategory>,
    ) {
    }


    async create(category: any) {
        try {
            const isCategoryExistingWithThisName = await this.plateCategoryRepository.findOne(
                {
                    where:
                        {
                            restaurant: {id: category.restaurant},
                            name: category.name
                        }
                });
            if (!isCategoryExistingWithThisName)
                return await this.plateCategoryRepository.save(category);
            return isCategoryExistingWithThisName;
        } catch (e) {
            throw new Error("Une erreur est survenue lors de la création de la catégorie");
        }
    }

    findAll() {
        return `This action returns all plateCategory`;
    }

    findOne(id: number) {
        return `This action returns a #${id} plateCategory`;
    }

    update(id: number, updatePlateCategoryDto: UpdatePlateCategoryDto) {
        return `This action updates a #${id} plateCategory`;
    }

    remove(id: number) {
        return `This action removes a #${id} plateCategory`;
    }

    async findByRestaurant(id: string) {
        return await this.plateCategoryRepository.find({
            where: { restaurant: {id}},
            relations: ['plates']
        });

    }
}
