import { Test, TestingModule } from '@nestjs/testing';
import { OrderPlateService } from './order-plate.service';

describe('OrderPlateService', () => {
  let service: OrderPlateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderPlateService],
    }).compile();

    service = module.get<OrderPlateService>(OrderPlateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
