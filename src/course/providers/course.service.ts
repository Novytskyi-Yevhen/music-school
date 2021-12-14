import { InjectRepository } from '@nestjs/typeorm';
import { GenericService } from 'src/shared/service';
import { Course } from 'src/shared/entity';
import { Repository } from 'typeorm';

export class CourseService extends GenericService<Course> {
  constructor(
    @InjectRepository(Course) private courseRepository: Repository<Course>,
  ) {
    super(courseRepository);
  }
}
