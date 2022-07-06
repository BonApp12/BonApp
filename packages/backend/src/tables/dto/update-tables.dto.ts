import {PartialType} from '@nestjs/mapped-types';
import {TablesDto} from './TablesDto';

export class UpdateTablesDto extends PartialType(TablesDto) {
    id: string;
}
