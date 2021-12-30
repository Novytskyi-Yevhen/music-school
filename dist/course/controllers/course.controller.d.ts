import { AbstractCRUDController } from 'src/shared/controllers';
import { Course } from 'src/shared/entity';
import { courseDTO } from '../DTO';
import { CourseService } from '../providers';
export declare class CourseController extends AbstractCRUDController<courseDTO, Course, CourseService> {
    private courseService;
    constructor(courseService: CourseService);
}
