import { AbstractCRUDController } from 'src/shared/controllers';
import { Task } from 'src/shared/entity';
import { TaskDTO } from '../DTO';
import { TaskService } from '../providers';
export declare class TaskController extends AbstractCRUDController<TaskDTO, Task, TaskService> {
    private taskService;
    constructor(taskService: TaskService);
}
