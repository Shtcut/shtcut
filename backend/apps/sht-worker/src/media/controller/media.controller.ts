import { Controller, HttpCode, Next, Post, Req, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AppController, FileInterceptor, FileUploadService, OK, QueryParser } from 'shtcut/core';
import { MediaService } from '../service/media.service';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';

@Controller('media')
export class MediaController extends AppController {
  constructor(
    protected service: MediaService,
    protected config: ConfigService,
  ) {
    super(config, service);
  }

  @Post('/')
  @HttpCode(OK)
  @UseInterceptors(new FileInterceptor('files', 3))
  public async upload(@UploadedFiles() files, @Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    try {
      const queryParser = new QueryParser(Object.assign({}, req.query));
      const value = await this.service.upload(files);
      const response = await this.service.getResponse({
        code: OK,
        value,
        queryParser,
        message: this.lang.get(this.service.modelName).created,
      });
      return res.status(OK).json(response);
    } catch (e) {
      return next(e);
    }
  }
}
