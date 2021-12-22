import { Test, TestingModule } from '@nestjs/testing';
import { PlateController } from './plate.controller';
import { PlateService } from './plate.service';

describe('PlateController', () => {
  let controller: PlateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlateController],
      providers: [PlateService],
    }).compile();

    controller = module.get<PlateController>(PlateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
