import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {PlateService} from './plate.service';
import {PlateDto} from './dto/plate.dto';
import {UpdatePlateDto} from './dto/update-plate.dto';

@Controller('plate')
export class PlateController {
    constructor(private readonly plateService: PlateService) {
    }

    @Post()
    create(@Body() createPlateDto: PlateDto): Promise<PlateDto> {
        return this.plateService.create(createPlateDto);
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
