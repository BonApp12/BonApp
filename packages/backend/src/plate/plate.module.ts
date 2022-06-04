import {Module} from '@nestjs/common';
import {PlateService} from './plate.service';
import {PlateController} from './plate.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Plate} from './entities/plate.entity';
import {PlateCategory} from "../plate-category/entities/plate-category.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Plate, PlateCategory])],
    controllers: [PlateController],
    providers: [PlateService],
})
export class PlateModule {
}
