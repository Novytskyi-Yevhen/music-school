import { Controller } from '@nestjs/common';
import { AbstractCRUDController } from 'src/public/controllers';
import { Child } from 'src/shared/entity';
import { ChildDTO } from '../DTO';
import { ChildService } from '../providers';

@Controller('child')
export class ChildController extends AbstractCRUDController<
  ChildDTO,
  Child,
  ChildService
> {
  constructor(private childService: ChildService) {
    super(childService, 'Child');
  }
}
