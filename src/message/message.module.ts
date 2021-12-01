import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from 'src/shared/entity';
import { MessageService } from './providers';
// import * as controllers from './controllers';
import * as providers from './providers';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  exports: [MessageService],
  providers: Object.values(providers),
//   controllers: Object.values(controllers),
})
export class MessageModule {}
