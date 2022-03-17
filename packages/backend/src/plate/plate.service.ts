import { Injectable } from '@nestjs/common';
import { CreatePlateDto } from './dto/create-plate.dto';
import { UpdatePlateDto } from './dto/update-plate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Plate } from './entities/plate.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlateService {
  constructor(
    @InjectRepository(Plate)
    private plateRepository: Repository<Plate>,
  ) {}
  create(createPlateDto: CreatePlateDto) {
    return 'This action adds a new plate';
  }

  findAll() {
    /** Récupération de tous les plats avec la relation Category */
    return this.plateRepository.find({ relations: ['category'] });
  }

  findOne(id: number) {
    /** Récupération d'un seul plat avec la relation Category */
    return this.plateRepository.findOne(id, {
      relations: ['category', 'ingredient'],
    });
  }

  findByRestaurant(id: number) {
    return this.plateRepository.find( {
      relations: ['restaurant'],
      where: {
        'restaurant': {id: id}
      }
    });
  }

  update(id: number, updatePlateDto: UpdatePlateDto) {
    return `This action updates a #${id} plate`;
  }

  async remove(id: number): Promise<void> {
    await this.plateRepository.delete(id);
  }
}
