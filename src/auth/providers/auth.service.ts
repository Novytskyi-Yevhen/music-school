import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/shared/entity';
import { UsersDTO } from 'src/users/dto/usersDTO';
import { UserService } from 'src/users/providers';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(name: string, pass: string) {
    const user: User = await this.userService.findOneByName(name);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async jwtLogin(user, eventType: 'login' | 'register') {
    return {
      accessToken: this.jwtService.sign({
        username: user.name,
        email: user.email,
        userId: user.id,
      }),
      eventType,
    };
  }
}
