import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from 'src/shared/entity';
import { BoardService } from './providers';
import * as controllers from './controllers';
import * as providers from './providers';

@Module({
  imports: [TypeOrmModule.forFeature([Board])],
  exports: [BoardService],
  providers: Object.values(providers),
  controllers: Object.values(controllers),
})
export class BoardModule {}
