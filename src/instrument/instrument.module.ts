import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Instrument } from 'src/shared/entity';
import { InstrumentService } from './providers';
import * as controllers from './controllers';
import * as providers from './providers';

@Module({
  imports: [TypeOrmModule.forFeature([Instrument])],
  exports: [InstrumentService],
  providers: Object.values(providers),
  controllers: Object.values(controllers),
})
export class InstrumentModule {}
