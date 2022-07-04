import {Controller, Get, Param, UseGuards} from '@nestjs/common';
import {OrderPlateService} from './order-plate.service';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller('order-plate')
export class OrderPlateController {
  constructor(private readonly orderPlateService: OrderPlateService) {
  }

  @Get()
  findAll() {
    return this.orderPlateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderPlateService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/restaurant/:id/best-plate/:type')
  findBestPlate(@Param('id') id: string, @Param('type') type: string) {
    return this.orderPlateService.findBestPlate(+id,type === 'many');
  }
}
