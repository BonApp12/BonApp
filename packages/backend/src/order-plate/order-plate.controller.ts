import {Controller, Get, Param} from '@nestjs/common';
import {OrderPlateService} from './order-plate.service';

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

    @Get('/restaurant/:id/best-plate/:type')
    async findBestPlate(@Param('id') uuid: string, @Param('type') type: string) {
        const bestPlateCount = await this.orderPlateService.findBestPlate(uuid, type === 'many');
        return await bestPlateCount === undefined ? {bestPlate: null} : bestPlateCount;
    }
}
