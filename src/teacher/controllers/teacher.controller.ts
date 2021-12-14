import { Controller } from '@nestjs/common';
import { AbstractCRUDController } from 'src/shared/controllers';
import { Teacher } from 'src/shared/entity';
import { TeacherDTO } from '../DTO';
import { TeacherService } from '../providers';

@Controller('{}')
export class TeacherController extends AbstractCRUDController<
  TeacherDTO,
  Teacher,
  TeacherService
> {
  constructor(private teacherService: TeacherService) {
    super(teacherService, 'Teacher');
  }
}
