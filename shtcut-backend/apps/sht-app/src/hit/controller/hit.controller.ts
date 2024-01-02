import { Controller } from '@nestjs/common';
import { AppController } from 'shtcut/core';
import { HitService } from '../service/hit.service';
import { ConfigService } from '@nestjs/config';

@Controller('hits')
export class HitController extends AppController {
  constructor(
    protected service: HitService,
    protected config: ConfigService,
  ) {
    super(config, service);
  }
}
