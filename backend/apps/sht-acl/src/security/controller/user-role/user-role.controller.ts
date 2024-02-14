import { Controller, UseGuards } from '@nestjs/common';
import { AppController, JwtAuthGuard } from 'shtcut/core';
import { UserRoleService } from '../../services';
import { ConfigService } from '@nestjs/config';

@UseGuards(JwtAuthGuard)
@Controller('user-roles')
export class UserRoleController extends AppController {
  constructor(
    protected service: UserRoleService,
    protected config: ConfigService,
  ) {
    super(config, service);
  }
}
