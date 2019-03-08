import { Test, TestingModule } from '@nestjs/testing';
import { WsgateService } from './wsgate.service';

describe('WsgateService', () => {
  let service: WsgateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WsgateService],
    }).compile();

    service = module.get<WsgateService>(WsgateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
