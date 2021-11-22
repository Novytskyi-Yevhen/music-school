import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity';
import { Repository } from 'typeorm';
import { UsersDTO } from '../dto/usersDTO';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}
  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }
  async create(data: UsersDTO) {
    const newUser = this.usersRepository.create(data);
    await this.usersRepository.save(newUser);
    return newUser;
  }
  async delete(id: number){
      return await this.usersRepository.delete({id: id});
  }
  async update(id: number, data: Partial<UsersDTO>){
      await this.usersRepository.update({id}, data);
      return await this.usersRepository.findOne({id});
  }
}
