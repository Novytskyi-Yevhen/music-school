import { AbstractCRUDController } from 'src/shared/controllers';
import { Service } from 'src/shared/entity';
import { ServiceDTO } from '../DTO';
import { ServiceService } from '../providers';
export declare class ServiceController extends AbstractCRUDController<ServiceDTO, Service, ServiceService> {
    private serviceService;
    constructor(serviceService: ServiceService);
}
