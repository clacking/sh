import { Test, TestingModule } from '@nestjs/testing';
import { LuxGateway } from './lux.gateway';

describe('LuxGateway', () => {
  let gateway: LuxGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LuxGateway],
    }).compile();

    gateway = module.get<LuxGateway>(LuxGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
