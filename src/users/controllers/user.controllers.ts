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
import { UsersDTO } from '../dto/usersDTO';
import { UserService } from '../providers/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Get()
  async findAll() {
    return await this.userService.findAll();
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
  async findOneById(@Query('id') id: number){
    return await this.userService.findOneById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Patch('/update/:id')
  async update(@Param('id') id: number, @Body() data: Partial<UsersDTO>) {
    return await this.userService.update(id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Post('/create')
  async createUser(@Body() data: UsersDTO) {
    return await this.userService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
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
