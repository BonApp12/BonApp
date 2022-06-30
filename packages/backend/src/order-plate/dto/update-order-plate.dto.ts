import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderPlateDto } from './create-order-plate.dto';

export class UpdateOrderPlateDto extends PartialType(CreateOrderPlateDto) {}
