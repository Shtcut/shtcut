import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth, AuthDocument } from 'shtcut/core';

@Injectable()
export class SocialAuthService {
  constructor(
    @InjectModel(Auth.name) protected model: Model<AuthDocument>,
    private http: HttpService,
    protected config: ConfigService,
  ) {}
}
