import { GenericService } from 'src/shared/service';
import { Service } from 'src/shared/entity';
import { Repository } from 'typeorm';
export declare class ServiceService extends GenericService<Service> {
    private serviceRepository;
    constructor(serviceRepository: Repository<Service>);
}
