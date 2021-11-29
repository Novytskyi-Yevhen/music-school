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
}
