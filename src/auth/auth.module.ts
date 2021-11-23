import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/users/user.module';
import { AuthService } from './providers/index';
import { LocalStrategy, JwtStrategy } from './strategy/index';
import * as controllers from './controllers/index';
import { JwtModule } from '@nestjs/jwt';
require('dotenv').config();
@Module({
  imports: [UserModule, PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {expiresIn: '1h'}
    })
  ],
  controllers: Object.values(controllers),
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
