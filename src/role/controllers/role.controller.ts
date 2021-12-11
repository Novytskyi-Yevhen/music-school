import {
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { defaultRole } from 'src/config';
import { AbstractCRUDController } from 'src/public/controllers';
import { Role } from 'src/shared/entity';
import { RoleDTO } from '../dto';
import { RoleService } from '../providers';

@Controller('role')
export class RoleController extends AbstractCRUDController<
  RoleDTO,
  Role,
  RoleService
> {
  constructor(private roleService: RoleService) {
    super(roleService, 'Role');
  }
  @Delete('/delete/:id')
  async delete(@Param('id') id: string) {
    const role = await this.roleService.findOneById(id);
    if (defaultRole.includes(role.name.toLowerCase())) {
      throw new HttpException(
        'This is the default role. You do not have permission to delete.',
        HttpStatus.BAD_REQUEST,
      );
    }
    let { affected } = await this.roleService.delete(id);
    return affected === 0
      ? {
          statusCode: HttpStatus.BAD_REQUEST,
          message: `Role for delete is not found`,
        }
      : {
          statusCode: HttpStatus.OK,
          message: `Role deleted successfully`,
        };
  }
}
