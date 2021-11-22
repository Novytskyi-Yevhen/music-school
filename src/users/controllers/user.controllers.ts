import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { User } from 'src/entity';
import { UsersDTO } from '../dto/usersDTO';
import { UserService } from '../providers/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Patch('/update/:id')
  async update(@Param('id') id: number, @Body() data: Partial<UsersDTO>){
    await this.userService.update(id, data);
  }

  @Post('/create')
  async createUser(@Body() data: UsersDTO){
      return await this.userService.create(data);
  }
  @Delete('/delete/:id')
  async delete(@Param('id') id: number){
    let {affected} = await this.userService.delete(id);
    return affected === 0 ? {
      statusCode: HttpStatus.OK,
      message: 'User deleted successfully',
    } : {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'User for delete is not found'
    };
  }
}
