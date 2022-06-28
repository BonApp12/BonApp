import { Test, TestingModule } from '@nestjs/testing';
import { OrderPlateController } from './order-plate.controller';
import { OrderPlateService } from './order-plate.service';

describe('OrderPlateController', () => {
  let controller: OrderPlateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderPlateController],
      providers: [OrderPlateService],
    }).compile();

    controller = module.get<OrderPlateController>(OrderPlateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
