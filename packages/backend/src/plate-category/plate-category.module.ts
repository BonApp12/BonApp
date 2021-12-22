import { Module } from '@nestjs/common';
import { PlateCategoryService } from './plate-category.service';
import { PlateCategoryController } from './plate-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlateCategory } from './entities/plate-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlateCategory])],
  controllers: [PlateCategoryController],
  providers: [PlateCategoryService],
})
export class PlateCategoryModule {}
