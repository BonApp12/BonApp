import { Test, TestingModule } from '@nestjs/testing';
import { PlateCategoryController } from './plate-category.controller';
import { PlateCategoryService } from './plate-category.service';

describe('PlateCategoryController', () => {
  let controller: PlateCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlateCategoryController],
      providers: [PlateCategoryService],
    }).compile();

    controller = module.get<PlateCategoryController>(PlateCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
