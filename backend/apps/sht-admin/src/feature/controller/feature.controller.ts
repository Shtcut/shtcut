import { Controller, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { BaseController, JwtAuthGuard } from 'shtcut/core';
import * as _ from 'lodash';
import { FeatureService } from '../service/feature.service';

@ApiTags('Feature')
@Controller('admin/features')
@UseGuards(JwtAuthGuard)
export class FeatureController extends BaseController {
  constructor(
    protected service: FeatureService,
    protected config: ConfigService,
  ) {
    super(config, service);
  }
}
