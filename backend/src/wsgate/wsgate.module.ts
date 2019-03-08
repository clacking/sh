import { Module } from '@nestjs/common';
import { WsgateService } from './wsgate.service';
import { WsgateGateway } from './wsgate.gateway';

@Module({
  providers: [WsgateService, WsgateGateway]
})
export class WsgateModule {}
