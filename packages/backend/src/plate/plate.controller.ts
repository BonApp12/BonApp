import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {PlateService} from './plate.service';
import {PlateDto} from './dto/plate.dto';
import {UpdatePlateDto} from './dto/update-plate.dto';
import {PlateAdapter} from "../Adapter/PlateAdapter";
import {Plate} from "./entities/plate.entity";

@Controller('plate')
export class PlateController {
    constructor(private readonly plateService: PlateService) {
    }

    @Post()
    create(@Body() plate: Plate) {
        const plateDto = PlateAdapter.toDto(plate);
        return this.plateService.create(plateDto);
    }

    @Get()
    findAll() {
        return this.plateService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.plateService.findOne(+id);
    }

    @Get('/restaurant/:id')
    findByRestaurant(@Param('id') id: string): Promise<PlateDto[]> {
        return this.plateService.findByRestaurant(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updatePlateDto: UpdatePlateDto) {
        return this.plateService.update(+id, updatePlateDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.plateService.remove(+id);
    }
}
