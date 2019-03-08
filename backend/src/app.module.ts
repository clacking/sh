import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LuxModule } from './lux/lux.module';
import { TemperatureModule } from './temperature/temperature.module';
import { CamModule } from './cam/cam.module';
import { WsgateModule } from './wsgate/wsgate.module';

@Module({
  imports: [TypeOrmModule.forRoot(), LuxModule, TemperatureModule, CamModule, WsgateModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
