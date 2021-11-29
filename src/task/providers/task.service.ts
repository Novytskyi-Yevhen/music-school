import { InjectRepository } from '@nestjs/typeorm';
import { GenericService } from 'src/public/service';
import { Task } from 'src/shared/entity';
import { Repository } from 'typeorm';

export class TaskService extends GenericService<Task> {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {
    super(taskRepository);
  }
}
