import {Injectable} from '@nestjs/common';
import {UpdatePlateDto} from './dto/update-plate.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Plate} from './entities/plate.entity';
import {Repository} from 'typeorm';
import {PlateDto} from "./dto/plate.dto";
import {PlateAdapter} from "../Adapter/PlateAdapter";

@Injectable()
export class PlateService {
    constructor(
        @InjectRepository(Plate)
        private plateRepository: Repository<Plate>,
    ) {
    }

    async create(plateDto: PlateDto): Promise<PlateDto> {
        return PlateAdapter.toDtoLight(await this.plateRepository.save(PlateAdapter.toModelInsert(plateDto)));
    }

    findAll() {
        /** Récupération de tous les plats avec la relation Category */
        return this.plateRepository.find({relations: ['category']});
    }

    findOne(id: number) {
        /** Récupération d'un seul plat avec la relation Category */
        return this.plateRepository.findOne(id, {
            relations: ['category', 'ingredient'],
        });
    }

    async findByRestaurant(id: number): Promise<PlateDto[]> {
        return (await this.plateRepository.find({
            relations: ['restaurant', 'ingredients', "category"],
            where: {
                'restaurant': {id}
            }
        })).map(plate => PlateAdapter.toDto(plate));
    }

    update(id: number, updatePlateDto: UpdatePlateDto) {
        return `This action updates a #${id} plate`;
    }

    async remove(id: number): Promise<void> {
        await this.plateRepository.delete(id);
    }
}
