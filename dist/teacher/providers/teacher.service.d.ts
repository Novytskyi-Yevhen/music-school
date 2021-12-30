import { GenericService } from 'src/shared/service';
import { Teacher } from 'src/shared/entity';
import { Repository } from 'typeorm';
export declare class TeacherService extends GenericService<Teacher> {
    private teacherRepository;
    constructor(teacherRepository: Repository<Teacher>);
}
