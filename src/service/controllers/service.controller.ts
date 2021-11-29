import { Controller } from '@nestjs/common';
import { AbstractCRUDController } from 'src/public/controllers';
import { Service } from 'src/shared/entity';
import { ServiceDTO } from '../DTO';
import { ServiceService } from '../providers';

@Controller('service')
export class ServiceController extends AbstractCRUDController<
  ServiceDTO,
  Service,
  ServiceService
> {
  constructor(private serviceService: ServiceService) {
    super(serviceService, 'Service');
  }
}
