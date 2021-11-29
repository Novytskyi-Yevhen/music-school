import { InjectRepository } from '@nestjs/typeorm';
import { GenericService } from 'src/public/service';
import { Child } from 'src/shared/entity';
import { Repository } from 'typeorm';

export class ChildService extends GenericService<Child> {
  constructor(
    @InjectRepository(Child) private childRepository: Repository<Child>,
  ) {
    super(childRepository);
  }
}
