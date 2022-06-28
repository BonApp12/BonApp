import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderPlateService } from './order-plate.service';
import { CreateOrderPlateDto } from './dto/create-order-plate.dto';
import { UpdateOrderPlateDto } from './dto/update-order-plate.dto';

@Controller('order-plate')
export class OrderPlateController {
  constructor(private readonly orderPlateService: OrderPlateService) {}

  @Post()
  create(@Body() createOrderPlateDto: CreateOrderPlateDto) {
    return this.orderPlateService.create(createOrderPlateDto);
  }

  @Get()
  findAll() {
    return this.orderPlateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderPlateService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderPlateDto: UpdateOrderPlateDto) {
    return this.orderPlateService.update(+id, updateOrderPlateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderPlateService.remove(+id);
  }
}
