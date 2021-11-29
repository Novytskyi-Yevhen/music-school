import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/shared/entity';
import { OrdersService } from './providers';
import * as controllers from './controllers';
import * as providers from './providers';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  exports: [OrdersService],
  providers: Object.values(providers),
  controllers: Object.values(controllers),
})
export class OrderModule {}
