import { Controller } from '@nestjs/common';
import { AbstractCRUDController } from 'src/public/controllers';
import { Course } from 'src/shared/entity';
import { courseDTO } from '../DTO';
import { CourseService } from '../providers';

@Controller('course')
export class CourseController extends AbstractCRUDController<
  courseDTO,
  Course,
  CourseService
> {
  constructor(private courseService: CourseService) {
    super(courseService, 'Course');
  }
}
