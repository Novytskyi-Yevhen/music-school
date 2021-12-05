import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericService } from 'src/public/service';
import { User } from 'src/shared/entity';
import { Repository } from 'typeorm';
import { UsersDTO } from '../dto/usersDTO';

@Injectable()
export class UserService extends GenericService<User> {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {
    super(usersRepository);
  }
  async findOneByName(name: string) {
    return await this.usersRepository.findOne({ name });
  }
  async findOneByGoogleId(googleId: string){
    return await this.usersRepository.findOne({googleId})
  }
}
