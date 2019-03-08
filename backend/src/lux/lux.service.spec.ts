import { Test, TestingModule } from '@nestjs/testing';
import { LuxService } from './lux.service';

describe('LuxService', () => {
  let service: LuxService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LuxService],
    }).compile();

    service = module.get<LuxService>(LuxService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
