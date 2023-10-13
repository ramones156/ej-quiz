import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { RealTimeGateway } from './realtime/realtime.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [RealTimeGateway],
})
export class AppModule {}
