import { GenericService } from 'src/shared/service';
import { Child } from 'src/shared/entity';
import { Repository } from 'typeorm';
export declare class ChildService extends GenericService<Child> {
    private childRepository;
    constructor(childRepository: Repository<Child>);
}
