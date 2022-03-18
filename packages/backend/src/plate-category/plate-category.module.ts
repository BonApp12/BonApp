import { Module } from '@nestjs/common';
import { PlateCategoryService } from './plate-category.service';
import { PlateCategoryController } from './plate-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { plateCategory } from './entities/plate-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([plateCategory])],
  controllers: [PlateCategoryController],
  providers: [PlateCategoryService],
})
export class PlateCategoryModule {}
