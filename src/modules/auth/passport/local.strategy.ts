import {Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {Strategy} from 'passport-local';

import {UserModel} from '@/models';

import {AuthService} from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    // Not using username, fallback to email
    super({usernameField: 'email'});
  }
  async validate(email: string, password: string): Promise<UserModel> {
    return this.authService.login({email, password});
  }
}
