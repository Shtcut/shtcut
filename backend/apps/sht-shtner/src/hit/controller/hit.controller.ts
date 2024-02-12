import { Controller, UseGuards } from '@nestjs/common';
import { AppController, JwtAuthGuard } from 'shtcut/core';
import { HitService } from '../service/hit.service';
import { ConfigService } from '@nestjs/config';

@UseGuards(JwtAuthGuard)
@Controller('shtner/hits')
export class HitController extends AppController {
  constructor(
    protected service: HitService,
    protected config: ConfigService,
  ) {
    super(config, service);
  }
}
