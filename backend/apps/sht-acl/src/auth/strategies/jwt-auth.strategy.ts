import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../service';
import { AppException } from 'shtcut/core';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    config: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('app.encryptionKey'),
    });
  }

  async validate(payload: Record<string, any>) {
    const auth = await this.authService.findObject(payload.sub);
    if (!auth) {
      throw AppException.INVALID_TOKEN();
    }
    return {
      ...auth.toJSON(),
      authId: auth._id,
    };
  }
}
