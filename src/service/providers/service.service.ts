import { InjectRepository } from '@nestjs/typeorm';
import { GenericService } from 'src/public/service';
import { Service } from 'src/shared/entity';
import { Repository } from 'typeorm';

export class ServiceService extends GenericService<Service> {
  constructor(
    @InjectRepository(Service) private serviceRepository: Repository<Service>,
  ) {
    super(serviceRepository);
  }
}
