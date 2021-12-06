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

  @Get('auth/redirect/google')
  @UseGuards(AuthGuard('google'))
  async googleRedirect(@Req() req) {
    return await this.socialRegisterOrLogin(req);
  }
  @Get('auth/redirect/facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookRedirect(@Req() req) {
    return await this.socialRegisterOrLogin(req);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuth() {}

  private async socialRegisterOrLogin(req) {
    if (!req.user) {
      throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
    }

    let user = await this.userService.getUserBySocialId(
      req.user.provider,
      req.user.socialId,
    );
    if (user === null) {
      throw new HttpException(
        'This provider does not supported',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!user) {
      let response = null;
      if (req.user.provider === 'google') {
        response = await firstValueFrom(
          this.httpService.get(
            `https://people.googleapis.com/v1/people/${req.user.socialId}?personFields=phoneNumbers`,
            { headers: { Authorization: `Bearer ${req.user.accessToken}` } },
          ),
        );
      }

      const phone = response?.data?.phoneNumbers
        ? response.data?.phoneNumbers[0]?.canonicalForm
        : null;
      const googleId =
        req.user.provider === 'google' ? req.user.socialId : null;
      const facebookId =
        req.user.provider === 'facebook' ? req.user.socialId : null;
      const newUser = { facebookId, googleId, phone, ...req.user };

      return await this.register(newUser);
    } else {
      return await this.login(req);
    }
  }
}
