import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Child } from 'src/shared/entity';
import { ChildService } from './providers';
import * as controllers from './controllers';
import * as providers from './providers';

@Module({
  imports: [TypeOrmModule.forFeature([Child])],
  exports: [ChildService],
  providers: Object.values(providers),
  controllers: Object.values(controllers),
})
export class ChildModule {}
