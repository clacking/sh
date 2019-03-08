import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LuxService } from './lux.service';
import { LuxController } from './lux.controller';
import { Lux } from './lux.entity';
import { LuxGateway } from './lux.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Lux])],
  providers: [LuxService, LuxGateway],
  controllers: [LuxController]
})
export class LuxModule {}
