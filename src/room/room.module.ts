import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from 'src/shared/entity';
import { RoomService } from './providers';
import * as controllers from './controllers';
import * as providers from './providers'; 

@Module({
  imports: [TypeOrmModule.forFeature([Room])],
  exports: [RoomService],
  providers: Object.values(providers),
  controllers: Object.values(controllers),
})
export class RoomModule {}
