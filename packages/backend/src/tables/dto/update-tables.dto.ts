import {PartialType} from '@nestjs/mapped-types';
import {TableDto} from './TableDto';

export class UpdateTablesDto extends PartialType(TableDto) {
    id: number;
}
