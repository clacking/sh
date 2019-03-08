import { Controller, Get } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { HumanCount } from './cam.interface';

@Controller('cam')
export class CamController {
    private humanCount: HumanCount;

    @GrpcMethod('SHRoute', 'SendDeg')
    updateCount(data: HumanCount): void {
        this.humanCount = data;
    }

    @Get()
    currentCount() {
        return this.humanCount.human;
    }
}
