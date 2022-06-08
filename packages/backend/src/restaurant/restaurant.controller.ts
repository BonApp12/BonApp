import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards,} from '@nestjs/common';
import {RestaurantService} from './restaurant.service';
import {RestaurantDto} from './dto/restaurant.dto';
import {UpdateRestaurantDto} from './dto/update-restaurant.dto';
import {JwtAuthGuard} from '../auth/jwt-auth.guard';
import {UsersDto} from "../users/dto/users.dto";

@Controller('restaurant')
export class RestaurantController {
    constructor(private readonly restaurantService: RestaurantService) {
    }

    /** Route qui permettra de valider une demande de restaurant une fois que tout le workflow sera OK */
    @Post('/validate-restaurant')
    validateRestaurant(@Body() createRestaurantDto: RestaurantDto) {
        return this.restaurantService.create(createRestaurantDto);
    }

    @Post('/register-my-restaurant')
    sendForm(@Body() restaurant: RestaurantDto) {
        return this.restaurantService.handleRegisterForm(restaurant);
    }

    @Post(':id/edit-restaurant')
    sendEditForm(@Body() restaurant: UpdateRestaurantDto) {
        return this.restaurantService.handleUpdateForm(restaurant);
    }

    @Get()
    findAll() {
        return this.restaurantService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.restaurantService.findOne(+id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/teams/:id')
    findTeamMembers(@Param('id') id: number): Promise<UsersDto[]> {
        return this.restaurantService.findTeamMembers(id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateRestaurantDto: UpdateRestaurantDto,
    ) {
        return this.restaurantService.update(+id, updateRestaurantDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.restaurantService.remove(+id);
    }
}
