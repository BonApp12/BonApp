import { Controller, Get, Param } from '@nestjs/common';
import { OrderPlateService } from './order-plate.service';

@Controller('order-plate')
export class OrderPlateController {
  constructor(private readonly orderPlateService: OrderPlateService) {}

  @Get()
  findAll() {
    return this.orderPlateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderPlateService.findOne(+id);
  }

  @Get('/restaurant/:id/best-plate/:type')
  findBestPlate(@Param('id') id: string, @Param('type') type: string) {
      return this.orderPlateService.findBestPlate(+id,type === 'many');
  }
}
