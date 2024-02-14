import { Controller, UseGuards } from '@nestjs/common';
import { AppController, JwtAuthGuard } from 'shtcut/core';
import { RoleService } from '../../services';
import { ConfigService } from '@nestjs/config';

@UseGuards(JwtAuthGuard)
@Controller('roles')
export class RoleController extends AppController {
  constructor(
    protected service: RoleService,
    protected config: ConfigService,
  ) {
    super(config, service);
  }
}
