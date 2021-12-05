import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersDTO } from 'src/users/dto/usersDTO';
import { UserService } from 'src/users/providers';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { LocalAuthGuard } from '../guards/index';
import { AuthService } from '../providers/auth.service';
import { RoleService } from 'src/role/providers';
import { registrationRole } from 'src/config';
import { AuthGuard } from '@nestjs/passport';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private roleService: RoleService,
    private httpService: HttpService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req) {
    return this.authService.jwtLogin(req.user, 'login');
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('/register')
  async register(@Body() data: UsersDTO) {
    data.role = await this.roleService.findOneByName(registrationRole);
    const newUser = await this.userService.create(data);
    return await this.authService.jwtLogin(newUser, 'register');
  }

  @Get('auth/redirect')
  @UseGuards(AuthGuard('google'))
  async googleRedirect(@Req() req) {
    if (!req.user) {
      throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
    }
    const user = await this.userService.findOneByGoogleId(req.user.googleId);
    if (!user) {
      let response = await firstValueFrom(
        this.httpService.get(
          `https://people.googleapis.com/v1/people/${req.user.googleId}?personFields=phoneNumbers`,
          { headers: { Authorization: `Bearer ${req.user.accessToken}` } },
        ),
      );

      const phone = response.data?.phoneNumbers[0]?.canonicalForm;
      const newUser = { phone, ...req.user };

      return await this.register(newUser);
    } else {
      return await this.login(req);
    }
  }
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}
}
