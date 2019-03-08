import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { grpcServerOption } from './grpc-server.option';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice(grpcServerOption);
  await app.startAllMicroservicesAsync();
  await app.listen(3000);
}
bootstrap();
