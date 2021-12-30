import { AbstractCRUDController } from 'src/shared/controllers';
import { Teacher } from 'src/shared/entity';
import { TeacherDTO } from '../DTO';
import { TeacherService } from '../providers';
export declare class TeacherController extends AbstractCRUDController<TeacherDTO, Teacher, TeacherService> {
    private teacherService;
    constructor(teacherService: TeacherService);
}
