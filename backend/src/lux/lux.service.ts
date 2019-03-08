import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ulid } from 'ulid';
import { Lux } from './lux.entity';
import { LuxInterface } from './lux.interface';
import { NewDataDTO } from '../shared/dto/new-data.dto';

@Injectable()
export class LuxService {
    constructor(
        @InjectRepository(Lux) private readonly luxRepository: Repository<Lux>,
    ) {}

    async addData(newLuxDTO: NewDataDTO): Promise<LuxInterface> {
        const ent = this.addDateAndId(newLuxDTO);
        await this.luxRepository.insert(ent);
        return ent as LuxInterface;
    }

    private addDateAndId(obj: NewDataDTO): Lux {
        const date = new Date();
        const id = ulid();
        return {...obj, id, date};
    }

    async findAll(): Promise<Lux[]> {
        return await this.luxRepository.find();
    }
}
