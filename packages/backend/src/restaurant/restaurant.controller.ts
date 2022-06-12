import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards,} from '@nestjs/common';
import {RestaurantService} from './restaurant.service';
import {RestaurantDto} from './dto/restaurant.dto';
import {UpdateRestaurantDto} from './dto/update-restaurant.dto';
import {JwtAuthGuard} from '../auth/jwt-auth.guard';
import {UsersDto} from "../users/dto/users.dto";
import {Tables} from "../tables/entities/tables.entity";

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

    @Post('/add-table')
    addTable(@Param('id') id: string, @Body() table: Tables) {
        return this.restaurantService.addTable(table);
    }

    @Get('/:id/tables')
    getTables(@Param('id') id: string) {
        return this.restaurantService.findAllTables(+id);
    }

    @Delete('/table/:id')
    deleteTable(@Param('id') id: string) {
        return this.restaurantService.deleteTable(+id);
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

    @Get(':id/:idTable')
    findOneWithTable(@Param('id') id: string, @Param('idTable') idTable: string) {
        return this.restaurantService.findOneWithTable(+id, +idTable);
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
