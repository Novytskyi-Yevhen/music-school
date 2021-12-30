import { GenericService } from 'src/shared/service';
import { Course } from 'src/shared/entity';
import { Repository } from 'typeorm';
export declare class CourseService extends GenericService<Course> {
    private courseRepository;
    constructor(courseRepository: Repository<Course>);
}
