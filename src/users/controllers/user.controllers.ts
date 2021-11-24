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
import { UsersDTO } from '../dto/usersDTO';
import { UserService } from '../providers/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get('/findOne')
  async findOneByName(@Query('name') name: string) {
    return await this.userService.findOneByName(name);
  }

  @Patch('/update/:id')
  async update(@Param('id') id: number, @Body() data: Partial<UsersDTO>) {
    await this.userService.update(id, data);
  }

  @Post('/create')
  async createUser(@Body() data: UsersDTO) {
    return await this.userService.create(data);
  }
  @Delete('/delete/:id')
  async delete(@Param('id') id: number) {
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
