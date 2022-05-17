import {Test, TestingModule} from '@nestjs/testing';
import {TablesController} from './tables.controller';

describe('TablesController', () => {
  let controller: TablesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TablesController],
    }).compile();

    controller = module.get<TablesController>(TablesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
