import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from 'src/shared/entity';
import { TeacherService } from './providers';
import * as controllers from './controllers';
import * as providers from './providers';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher])],
  exports: [TeacherService],
  providers: Object.values(providers),
  controllers: Object.values(controllers),
})
export class TeacherModule {}
