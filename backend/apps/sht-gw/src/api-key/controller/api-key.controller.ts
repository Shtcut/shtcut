import { Controller, UseGuards } from '@nestjs/common';
import { AppController, JwtAuthGuard } from 'shtcut/core';
import { ApiKeyService } from '../service/api-key.service';
import { ConfigService } from '@nestjs/config';

@UseGuards(JwtAuthGuard)
@Controller('shtner/api-keys')
export class ApiKeyController extends AppController {
  constructor(
    protected service: ApiKeyService,
    protected config: ConfigService,
  ) {
    super(config, service);
  }
}
