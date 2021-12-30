import { AbstractCRUDController } from 'src/shared/controllers';
import { Child } from 'src/shared/entity';
import { ChildDTO } from '../DTO';
import { ChildService } from '../providers';
export declare class ChildController extends AbstractCRUDController<ChildDTO, Child, ChildService> {
    private childService;
    constructor(childService: ChildService);
}
