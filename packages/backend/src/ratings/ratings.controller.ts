import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {RatingsService} from "./ratings.service";
import {RatingsDto} from "./dto/ratings.dto";
import {UpdateRatingsDto} from "./dto/update-ratings.dto";

@Controller('ratings')
export class RatingsController {
    constructor(private readonly ratingService: RatingsService) {
    }

    @Post()
    create(@Body() createRating: RatingsDto) {
        return this.ratingService.create();
    }

    @Get()
    findAll() {
        return this.ratingService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.ratingService.findOne(+id);
    }

    @Get('/plate/:id')
    findByPlate(@Param('id') id: string) {
        return this.ratingService.findByPlate(+id);
    }

    @Get('/user/:id')
    findByUser(@Param('id') id: string) {
        return this.ratingService.findByUser(+id);
    }

    @Get('/user/:id/plate/:plate')
    findByUserAndPlate(@Param('id') id: string, @Param('plate') plate: string) {
        return this.ratingService.findByUserAndPlate(+id, plate);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateRatingsDto: UpdateRatingsDto) {
        return this.ratingService.update(+id, updateRatingsDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.ratingService.remove(+id);
    }
}
