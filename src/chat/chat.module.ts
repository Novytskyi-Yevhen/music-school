import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatService } from './providers';
import * as controllers from './controllers';
import * as providers from './providers';
import { Chat } from 'src/shared/entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chat])],
  exports: [ChatService],
  providers: Object.values(providers),
  controllers: Object.values(controllers),
})
export class ChatModule {}
