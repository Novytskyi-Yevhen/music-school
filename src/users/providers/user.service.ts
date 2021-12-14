import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericService } from 'src/shared/service';
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
  async findOneByEmail(email: string){
    return await this.usersRepository.findOne({email});
  }
  private async findOneByGoogleId(googleId: string) {
    return await this.usersRepository.findOne({ googleId });
  }
  private async findOneByFacebookId(facebookId: string) {
    return await this.usersRepository.findOne({ facebookId });
  }
  private async findOneByLinkedinId(facebookId: string) {
    return await this.usersRepository.findOne({ facebookId });
  }

  async getUserBySocialId(provider: string, id: string) {
    let user;
    switch (provider) {
      case 'facebook':
        user = await this.findOneByFacebookId(id);
        break;
      case 'google':
        user = await this.findOneByGoogleId(id);
        break;
      case 'linkedin':
        user = await this.findOneByLinkedinId(id);
        break;
      default:
        user = null;
        break;
    }
    return user;
  }
}
