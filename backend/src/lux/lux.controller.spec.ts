import { Test, TestingModule } from '@nestjs/testing';
import { LuxController } from './lux.controller';

describe('Lux Controller', () => {
  let controller: LuxController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LuxController],
    }).compile();

    controller = module.get<LuxController>(LuxController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
