import { Controller, Get, HttpCode, Next, Param, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';
import * as _ from 'lodash';
import { AppController, JwtAuthGuard, OK, QueryParser, WorkspaceGuard } from 'shtcut/core';
import { HitService } from '../../hit';
import { LinkBioService } from '../service/link-bio.service';

@UseGuards(JwtAuthGuard, WorkspaceGuard)
@Controller('link-bios')
export class LinkBioController extends AppController {
  constructor(
    protected service: LinkBioService,
    protected config: ConfigService,
    protected hitService: HitService,
  ) {
    super(config, service);
  }

  @Get('/search/one')
  @HttpCode(OK)
  async searchOne(@Param('id') id: string, @Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    try {
      const queryParser = new QueryParser(Object.assign({}, req.query));

      let object = null;
      if (!_.isEmpty(queryParser.query)) {
        object = await this.service.searchOneObject(queryParser.query);
      }

      if (object) await this.hitService.upsert(req, 'linkBio', object);

      const response = await this.service.getResponse({
        code: OK,
        queryParser,
        value: object ?? { _id: null },
      });

      return res.status(OK).json(response);
    } catch (e) {
      return next(e);
    }
  }
}
