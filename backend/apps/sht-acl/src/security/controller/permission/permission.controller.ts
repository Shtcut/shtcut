import { Controller, UseGuards } from '@nestjs/common';
import { AppController, JwtAuthGuard } from 'shtcut/core';
import { PermissionService } from '../../services';
import { ConfigService } from '@nestjs/config';

@UseGuards(JwtAuthGuard)
@Controller('permissions')
export class PermissionController extends AppController {
  constructor(
    protected service: PermissionService,
    protected config: ConfigService,
  ) {
    super(config, service);
  }
}
