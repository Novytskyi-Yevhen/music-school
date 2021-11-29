import { Controller } from '@nestjs/common';
import { AbstractCRUDController } from 'src/public/controllers';
import { Task } from 'src/shared/entity';
import { TaskDTO } from '../DTO';
import { TaskService } from '../providers';

@Controller('task')
export class TaskController extends AbstractCRUDController<
  TaskDTO,
  Task,
  TaskService
> {
  constructor(private taskService: TaskService) {
    super(taskService, 'Task');
  }
}
