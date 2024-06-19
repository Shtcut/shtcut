import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { AdminAuth, AdminAuthDocument, AppException } from 'shtcut/core';

@Injectable()
export class JwtAdminStrategy extends PassportStrategy(Strategy) {
  constructor(
    config: ConfigService,
    @InjectModel(AdminAuth.name) protected readonly model: Model<AdminAuthDocument>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('app.encryptionKey'),
    });
  }

  async validate(payload: Record<string, any>) {
    const adminAuth = await this.model.findById(payload.sub);
    if (!adminAuth) {
      throw AppException.INVALID_TOKEN();
    }
    return {
      ...adminAuth.toJSON(),
      authId: adminAuth._id,
      user: adminAuth._id,
    };
  }
}
