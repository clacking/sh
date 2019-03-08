import { Test, TestingModule } from '@nestjs/testing';
import { WsgateGateway } from './wsgate.gateway';

describe('WsgateGateway', () => {
  let gateway: WsgateGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WsgateGateway],
    }).compile();

    gateway = module.get<WsgateGateway>(WsgateGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
