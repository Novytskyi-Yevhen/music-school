import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-facebook';
import { getUser } from 'src/shared/helpers';
require('dotenv').config();
@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor() {
    super({
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.FACEBOOK_REDIRECT_URL,
      scope: ['email'],
      profileFields: ['emails', 'name'],
    });
  }
  async validate(accessToken: string, refreshToken: string, profile: any, done: (err: any, user: any, info?: any) => void) {
    
    done(null, getUser(accessToken, refreshToken, profile));
  }
}
