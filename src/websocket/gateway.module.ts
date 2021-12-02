import { Module } from '@nestjs/common';
import { RoomGateway } from './gateway';
// import { AppGateway } from './app.gateway';

@Module({
 imports: [],
 controllers: [],
 providers: [
    //  AppGateway
    RoomGateway
    ],
})
export class GatewayModule {}