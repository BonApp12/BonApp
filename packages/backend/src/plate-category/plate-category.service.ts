import { Injectable } from '@nestjs/common';
import { CreatePlateCategoryDto } from './dto/create-plate-category.dto';
import { UpdatePlateCategoryDto } from './dto/update-plate-category.dto';

@Injectable()
export class PlateCategoryService {
  create(createPlateCategoryDto: CreatePlateCategoryDto) {
    return 'This action adds a new plateCategory';
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
}
