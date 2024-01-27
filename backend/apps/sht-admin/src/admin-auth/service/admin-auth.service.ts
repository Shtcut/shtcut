import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AdminAuth, AdminAuthDocument, AppException, MongoBaseService, Utils } from 'shtcut/core';
import { Model, ClientSession } from 'mongoose';
import lang from '../../../lang';
import * as bcrypt from 'bcryptjs';
import * as _ from 'lodash';

@Injectable()
export class AdminAuthService extends MongoBaseService {
  constructor(
    @InjectModel(AdminAuth.name) protected model: Model<AdminAuthDocument>,
    private jwtService: JwtService,
    protected config: ConfigService,
  ) {
    super(model);
  }

  /**
   * @param {Object} payload signup payload
   * @return {Object} The successful response object
   */
  public async initAdminUser(payload: Record<string, any>) {
    let session: ClientSession;
    try {
      const { email, password } = this.config.get('admin.superUser');
      let auth = await this.model.findOne({ email });
      if (auth) {
        throw AppException.CONFLICT(lang.get('auth').alreadyInit);
      }
      const hashPassword = await bcrypt.hash(password, 10);
      auth = await this.model.findOneAndUpdate(
        { email },
        {
          $setOnInsert: {
            publicId: Utils.generateUniqueId('adm'),
          },
          password: hashPassword,
        },
        {
          upsert: true,
          new: true,
          setDefaultsOnInsert: true,
          session,
        },
      );
      return this.login(auth);
    } catch (e) {
      await session?.abortTransaction();
    } finally {
      await session?.endSession();
    }
  }

  /**
   * @param {AdminAuth} auth The payload auth
   * @return {Object}
   */
  public login(auth: AdminAuth) {
    const payload = {
      username: auth.email,
      sub: auth._id,
    };
    return {
      accessToken: this.jwtService.sign(payload),
      auth,
    };
  }

  public async validateAdmin(email: string, password: string) {
    const auth = await this.model.findOne({ email }).select('+password');
    if (!auth) {
      return null;
    }
    const valid = await bcrypt.compare(password, auth.password);
    return valid ? { ..._.omit(auth.toJSON(), ['password']) } : null;
  }
}
