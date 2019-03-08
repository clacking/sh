import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemperatureService } from './temperature.service';
import { TemperatureController } from './temperature.controller';
import { Temperature } from './temperature.entity';
import { TemperatureGateway } from './temperature.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Temperature])],
  providers: [TemperatureService, TemperatureGateway],
  controllers: [TemperatureController]
})
export class TemperatureModule {}
