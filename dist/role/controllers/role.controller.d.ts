import { HttpStatus } from '@nestjs/common';
import { AbstractCRUDController } from 'src/shared/controllers';
import { Role } from 'src/shared/entity';
import { RoleDTO } from '../dto';
import { RoleService } from '../providers';
export declare class RoleController extends AbstractCRUDController<RoleDTO, Role, RoleService> {
    private roleService;
    constructor(roleService: RoleService);
    delete(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
