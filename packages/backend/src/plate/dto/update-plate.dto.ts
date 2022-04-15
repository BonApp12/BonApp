import {PartialType} from '@nestjs/mapped-types';
import {PlateDto} from './plate.dto';

export class UpdatePlateDto extends PartialType(PlateDto) {}
