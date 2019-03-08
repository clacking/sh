import { Controller, Get } from '@nestjs/common';
import { Temperature } from './temperature.entity';
import { NewDataDTO } from '../shared/dto/new-data.dto';
import { TemperatureService } from './temperature.service';

@Controller('temperature')
export class TemperatureController {
    constructor(private temperatureService: TemperatureService) {}

    @Get()
    async getAllData() {
        return await this.temperatureService.findAll();
    }
}
