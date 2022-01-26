import { Test, TestingModule } from '@nestjs/testing';
import { OrdersGateway } from './orders.gateway';
import { OrdersService } from './orders.service';

describe('OrdersGateway', () => {
  let gateway: OrdersGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersGateway, OrdersService],
    }).compile();

    gateway = module.get<OrdersGateway>(OrdersGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
