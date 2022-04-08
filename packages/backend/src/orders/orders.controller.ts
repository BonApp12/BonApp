import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Post()
    create(@Body() createOrderDto: CreateOrderDto) {
        return this.ordersService.create(createOrderDto);
    }

    @Get()
    findAll() {
        return this.ordersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.ordersService.findOne(+id);
    }

    @Get('/status/:status')
    findByStatus(@Param('status') status: string) {
        return this.ordersService.findByStatus(status);
    }

    @Get('restaurant/:id/status/:status')
    findByRestaurantByStatus(@Param() params: string[]) {
        return this.ordersService.findByRestaurantByStatus(params['status'], params['id']);
    }

    @Get('/restaurant/:id')
    findByRestaurant(@Param('id') id: string) {
        return this.ordersService.findByRestaurant(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
        return this.ordersService.update(+id, updateOrderDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.ordersService.remove(+id);
    }

}