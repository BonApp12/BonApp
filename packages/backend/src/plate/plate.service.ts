import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Plate} from './entities/plate.entity';
import {DeleteResult, Repository} from 'typeorm';
import {PlateDto} from "./dto/plate.dto";
import {PlateAdapter} from "../Adapter/PlateAdapter";
import {PlateCategory} from "../plate-category/entities/plate-category.entity";

@Injectable()
export class PlateService {
    constructor(
        @InjectRepository(Plate)
        private plateRepository: Repository<Plate>,
        @InjectRepository(PlateCategory)
        private plateCategories: Repository<PlateCategory>,
    ) {
    }

    async create(plateDto: PlateDto): Promise<PlateDto> {
        return PlateAdapter.toDtoLight(await this.plateRepository.save(PlateAdapter.toModelInsert(plateDto)));
    }

    findAll() {
        /** Récupération de tous les plats avec la relation Category */
        return this.plateRepository.find({relations: ['category']});
    }

    findCategories(): Promise<PlateCategory[]> {
        return this.plateCategories.find();
    }

    findOne(id: number) {
        /** Récupération d'un seul plat avec la relation Category */
        return this.plateRepository.findOne(id, {
            relations: ['category', 'ingredient'],
        });
    }

    async findByRestaurant(id: string): Promise<PlateDto[]> {
        return (await this.plateRepository.find({
            relations: ['restaurant', 'ingredients', "categories"],
            where: {
                'restaurant': {id},
                'display': true
            },
            order: {
                created_at: "DESC"
            }
        })).map(plate => PlateAdapter.toDto(plate));
    }

    countPlateByRestaurantCategorie(id: string) {
        const query = this.plateRepository.createQueryBuilder("p")
            .select("COUNT(*)", "count")
            .addSelect("p.type", "type")
            .innerJoin("p.restaurant", "r")
            .groupBy("p.type")
            .where("r.id = :id", {id});
        return query.getRawMany();
    }


    update(id: number): Promise<DeleteResult> {
        return this.plateRepository.update(id, {display: false});
    }
}
