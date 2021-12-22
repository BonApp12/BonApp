import { PartialType } from '@nestjs/mapped-types';
import { CreatePlateCategoryDto } from './create-plate-category.dto';

export class UpdatePlateCategoryDto extends PartialType(CreatePlateCategoryDto) {}
