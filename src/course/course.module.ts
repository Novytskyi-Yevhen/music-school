import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/shared/entity';
import { CourseService } from './providers';
import * as controllers from './controllers';
import * as providers from './providers';

@Module({
  imports: [TypeOrmModule.forFeature([Course])],
  exports: [CourseService],
  providers: Object.values(providers),
  controllers: Object.values(controllers),
})
export class CourseModule {}
