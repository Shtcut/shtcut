import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class VercelService {
  constructor(
    protected httpService: HttpService,
    protected config: ConfigService,
  ) {}
}
