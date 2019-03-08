import { Transport, ClientOptions } from '@nestjs/microservices';
import { join } from 'path';
import { ServerCredentials } from 'grpc';

export const grpcServerOption : ClientOptions ={
    transport: Transport.GRPC,
    options: {
        package: 'gateway',
        url: '0.0.0.0:50051',
        credentials: ServerCredentials.createInsecure(),
        protoPath: join(__dirname, '../../PDCam/cam.proto'),
    }
}
