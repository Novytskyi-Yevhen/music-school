import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/shared/entity';
import { TaskService } from './providers';
import * as controllers from './controllers';
import * as providers from './providers';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  exports: [TaskService],
  providers: Object.values(providers),
  controllers: Object.values(controllers),
})
export class TaskModule {}
