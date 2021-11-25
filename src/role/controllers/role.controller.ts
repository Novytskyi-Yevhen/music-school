import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { defaultRole } from 'src/config';
import { RoleDTO } from '../dto';
import { RoleService } from '../providers';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
  @Get()
  async findAll() {
    return await this.roleService.findAll();
  }

  @Get('/findOneByName')
  async findOneByName(@Query('name') name: string) {
    return await this.roleService.findOneByName(name);
  }

  @Patch('/update/:id')
  async update(@Param('id') id: number, @Body() data: Partial<RoleDTO>) {
    await this.roleService.update(id, data);
  }

  @Post('/create')
  async createUser(@Body() data: RoleDTO) {
    return await this.roleService.create(data);
  }
  @Delete('/delete/:id')
  async delete(@Param('id') id: number) {
    const role = await this.roleService.findOneById(id);
    if (defaultRole.includes(role.name.toLowerCase())) {
        return {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'This role does not support deletion',
          }
    }
    let { affected } = await this.roleService.delete(id);
    return affected === 0
      ? {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Role for delete is not found',
        }
      : {
          statusCode: HttpStatus.OK,
          message: 'Role deleted successfully',
        };
  }
}
