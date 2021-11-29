import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from 'src/shared/entity';
import { ServiceService } from './providers';
import * as controllers from './controllers';
import * as providers from './providers';

@Module({
  imports: [TypeOrmModule.forFeature([Service])],
  exports: [ServiceService],
  providers: Object.values(providers),
  controllers: Object.values(controllers),
})
export class ServiceModule {}
