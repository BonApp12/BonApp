import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import {Tables} from "./entities/tables.entity";

@Injectable()
export class TablesService {
    constructor(
        @InjectRepository(Tables)
        private tablesRepository: Repository<Tables>
    ){}

    async findOne(id: number): Promise<Tables> {
        const table = await this.tablesRepository.findOne(id);
        if (table) return table;
        throw new HttpException('Table not found', HttpStatus.NOT_FOUND);
    }
}
