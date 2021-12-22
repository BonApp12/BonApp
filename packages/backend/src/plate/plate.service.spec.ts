import { Test, TestingModule } from '@nestjs/testing';
import { PlateService } from './plate.service';

describe('PlateService', () => {
  let service: PlateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlateService],
    }).compile();

    service = module.get<PlateService>(PlateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
