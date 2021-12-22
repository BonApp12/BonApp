import { Test, TestingModule } from '@nestjs/testing';
import { PlateCategoryService } from './plate-category.service';

describe('PlateCategoryService', () => {
  let service: PlateCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlateCategoryService],
    }).compile();

    service = module.get<PlateCategoryService>(PlateCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
