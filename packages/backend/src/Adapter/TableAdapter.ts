import {Tables} from "../tables/entities/tables.entity";
import {TablesDto} from "../tables/dto/TablesDto";
import {Injectable} from "@nestjs/common";

@Injectable()
export class TableAdapter {
    static toDto(table: Tables): TablesDto {
        const tableDto = new TablesDto();

        tableDto.id = table?.id;
        tableDto.libelle = table?.libelle;
        tableDto.restaurant = table?.restaurant;
        tableDto.orders = table?.orders;

        return tableDto;
    }

    /**
     * Utilisation du any par manque d'options mais on doit bien envoyer un Table[]
     * @param table
     */
    static toModel(table: any) {
        const tableModel = new Tables();

        tableModel.id = table?.id;
        tableModel.libelle = table.libelle;
        tableModel.restaurant = table.restaurant;
        tableModel.orders = table?.orders?.map(order => order);

        return tableModel;
    }
}