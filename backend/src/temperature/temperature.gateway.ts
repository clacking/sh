import { InjectRepository } from '@nestjs/typeorm';
import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection } from '@nestjs/websockets';
import { Repository } from 'typeorm';
import { ulid } from 'ulid';
import { NewDataDTO } from '../shared/dto/new-data.dto';
import { Temperature } from './temperature.entity';
import { WsgateGateway } from '../wsgate/wsgate.gateway';

@WebSocketGateway(1234)
export class TemperatureGateway {
    @WebSocketServer() server;

    constructor(
      @InjectRepository(Temperature) private readonly temperatureRepository: Repository<Temperature>,
    ) {}

    @SubscribeMessage('message')
    handleMessage(client: any, payload: any): string {
      return 'Hello world!';
    }

    @SubscribeMessage('temperature')
    async addDataWS(client: any, payload: number): Promise<void> {
        const ent = this.addDateAndId({data: payload} as NewDataDTO);
        await this.temperatureRepository.insert(ent);
        WsgateGateway.sendData('temperature', payload);
    }

    private addDateAndId(obj: NewDataDTO): Temperature {
        const date = new Date();
        const id = ulid();
        return {...obj, id, date};
    }
}
