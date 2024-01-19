import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminAuthService } from '../service/admin-auth.service';
import lang from '../../../lang';

@Injectable()
export class AdminLocalStrategy extends PassportStrategy(Strategy) {
  constructor(private adminAuthService: AdminAuthService) {
    super({ usernameField: 'email' });
  }

  async validate(username: string, password: string) {
    const auth = await this.adminAuthService.validateAdmin(username, password);
    if (!auth) {
      throw new UnauthorizedException(lang.get('auth').invalidUser);
    }
    return auth;
  }
}
