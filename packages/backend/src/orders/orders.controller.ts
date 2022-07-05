import {Body, Controller, Delete, Get, Param, Patch, UseGuards, Post} from '@nestjs/common';
import {OrdersService} from './orders.service';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {Plate} from "../plate/entities/plate.entity";
import {Users} from "../users/entities/users.entity";
import {Restaurant} from "../restaurant/entities/restaurant.entity";

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {
    }

    @Get()
    findAll() {
        return this.ordersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.ordersService.findOne(+id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/user/:id')
    findByUser(@Param('id') id: string) {
        return this.ordersService.findOrderByUser(+id);
    }

    @Get('/status/:status')
    findByStatus(@Param('status') status: string) {
        return this.ordersService.findByStatus(status);
    }

    @Get('restaurant/:id/status/:status')
    findByRestaurantByStatus(@Param() params: string[]) {
        return this.ordersService.findByRestaurantByStatus(params['status'], params['id']);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/restaurant/:id')
    findByRestaurant(@Param('id') id: string) {
        return this.ordersService.findByRestaurant(+id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/count/:date/restaurant/:id')
    countByMonth(@Param('date') date: string, @Param('id') id: string) {
        return this.ordersService.countOrderByMonth(+id,date);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body('status') status: string) {
        return this.ordersService.update(+id, status);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.ordersService.remove(+id);
    }

    @Post('/create')
    async create(@Body('cart') cart: Plate[], @Body('restaurant') restaurant: Restaurant,
           @Body('user') user: Users | undefined) {
        return await this.ordersService.create(cart, restaurant, user);
    }

}
