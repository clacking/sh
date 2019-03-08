import { InjectRepository } from '@nestjs/typeorm';
import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection } from '@nestjs/websockets';
import { Repository } from 'typeorm';
import { ulid } from 'ulid';
import { NewDataDTO } from '../shared/dto/new-data.dto';
import { Lux } from './lux.entity';
import { WsgateGateway } from '../wsgate/wsgate.gateway';

@WebSocketGateway(1234)
export class LuxGateway {
    @WebSocketServer() server;

    constructor(
      @InjectRepository(Lux) private readonly luxRepository: Repository<Lux>,
    ) {}

    @SubscribeMessage('message')
    handleMessage(client: any, payload: any): string {
      return 'Hello world!';
    }

    @SubscribeMessage('lux')
    async addDataWS(client: any, payload: number): Promise<void> {
        const ent = this.addDateAndId({data: payload} as NewDataDTO);
        await this.luxRepository.insert(ent);
        WsgateGateway.sendData('temperature', payload);
    }

    private addDateAndId(obj: NewDataDTO): Lux {
        const date = new Date();
        const id = ulid();
        return {...obj, id, date};
    }
}
