import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ulid } from 'ulid';
import { Temperature } from './temperature.entity';
import { TemperatureInterface } from './temperature.interface';
import { NewDataDTO } from '../shared/dto/new-data.dto';

@Injectable()
export class TemperatureService {
    constructor(
        @InjectRepository(Temperature) private readonly temperatureRepository: Repository<Temperature>,
    ) {}

    async addData(newLuxDTO: NewDataDTO): Promise<TemperatureInterface> {
        const ent = this.addDateAndId(newLuxDTO);
        await this.temperatureRepository.insert(ent);
        return ent as TemperatureInterface;
    }

    async addDataWS(client, data: number): Promise<void> {
        const ent = this.addDateAndId({data} as NewDataDTO);
        await this.temperatureRepository.insert(ent);
    }

    private addDateAndId(obj: NewDataDTO): Temperature {
        const date = new Date();
        const id = ulid();
        return {...obj, id, date};
    }

    async findAll(): Promise<Temperature[]> {
        return await this.temperatureRepository.find();
    }
}
