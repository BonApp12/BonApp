import {PartialType} from '@nestjs/mapped-types';
import {CreateTablesDto} from './create-tables.dto';

export class UpdateTablesDto extends PartialType(CreateTablesDto) {
    id: number;
}
