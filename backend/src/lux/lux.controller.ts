import { Controller, Post, Get, Res, Param } from '@nestjs/common';
import { Lux } from './lux.entity';
import { NewDataDTO } from '../shared/dto/new-data.dto';
import { LuxService } from './lux.service';

@Controller('lux')
export class LuxController {
    constructor(private luxService: LuxService) {}

    @Get()
    async getAllData() {
        return await this.luxService.findAll();
    }
}
