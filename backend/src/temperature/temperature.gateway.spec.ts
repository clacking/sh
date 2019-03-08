import { Test, TestingModule } from '@nestjs/testing';
import { TemperatureGateway } from './temperature.gateway';

describe('TemperatureGateway', () => {
  let gateway: TemperatureGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TemperatureGateway],
    }).compile();

    gateway = module.get<TemperatureGateway>(TemperatureGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
