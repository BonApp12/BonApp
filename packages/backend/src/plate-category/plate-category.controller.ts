import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlateCategoryService } from './plate-category.service';
import { CreatePlateCategoryDto } from './dto/create-plate-category.dto';
import { UpdatePlateCategoryDto } from './dto/update-plate-category.dto';

@Controller('plate-category')
export class PlateCategoryController {
  constructor(private readonly plateCategoryService: PlateCategoryService) {}

  @Post()
  create(@Body() createPlateCategoryDto: CreatePlateCategoryDto) {
    return this.plateCategoryService.create(createPlateCategoryDto);
  }

  @Get()
  findAll() {
    return this.plateCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.plateCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlateCategoryDto: UpdatePlateCategoryDto) {
    return this.plateCategoryService.update(+id, updatePlateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.plateCategoryService.remove(+id);
  }
}
