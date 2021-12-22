import { PartialType } from '@nestjs/mapped-types';
import { CreatePlateDto } from './create-plate.dto';

export class UpdatePlateDto extends PartialType(CreatePlateDto) {}
