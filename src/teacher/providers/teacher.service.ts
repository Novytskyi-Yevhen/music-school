import { InjectRepository } from '@nestjs/typeorm';
import { GenericService } from 'src/shared/service';
import { Teacher } from 'src/shared/entity';
import { Repository } from 'typeorm';

export class TeacherService extends GenericService<Teacher> {
  constructor(
    @InjectRepository(Teacher) private teacherRepository: Repository<Teacher>,
  ) {
    super(teacherRepository);
  }
}
