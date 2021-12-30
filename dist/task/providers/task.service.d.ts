import { GenericService } from 'src/shared/service';
import { Task } from 'src/shared/entity';
import { Repository } from 'typeorm';
export declare class TaskService extends GenericService<Task> {
    private taskRepository;
    constructor(taskRepository: Repository<Task>);
}
