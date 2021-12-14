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
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards';
import { Roles } from 'src/common/decorators/roles.decorators';
import { AbstractCRUDController } from 'src/shared/controllers';
import { User } from 'src/shared/entity';
import { UsersDTO } from '../dto/usersDTO';
import { UserService } from '../providers/user.service';

@Controller('user')
export class UserController extends AbstractCRUDController<
  UsersDTO,
  User,
  UserService
> {
  constructor(private readonly userService: UserService) {
    super(userService, 'User');
  }

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Get()
  async findAll() {
    return await super.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Get('/findOneByName')
  async findOneByName(@Query('name') name: string) {
    return await this.userService.findOneByName(name);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Get('/findOneById')
  async findOneById(@Query('id') id: string) {
    return await super.findOneById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Patch('/update/:id')
  async update(@Param('id') id: string, @Body() data: Partial<UsersDTO>) {
    return await super.update(id, data);
  }

  // @UseGuards(JwtAuthGuard)
  // @Roles('admin')
  @Post('/create')
  async createUser(@Body() data: UsersDTO) {
    return await super.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Delete('/delete/:id')
  async delete(@Param('id') id: string) {
    let { affected } = await this.userService.delete(id);
    return affected === 0
      ? {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'User for delete is not found',
        }
      : {
          statusCode: HttpStatus.OK,
          message: 'User deleted successfully',
        };
  }
}
