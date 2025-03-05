import { ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import {
  Body,
  Delete,
  Get,
  HttpCode,
  Logger,
  Next,
  Param,
  Patch,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import {
  AppException,
  CONFLICT,
  CREATED,
  JwtAuthGuard,
  METHOD_NOT_ALLOWED,
  MongoBaseService,
  OK,
  Pagination,
  QueryParser,
} from 'shtcut/core';
import * as _ from 'lodash';
import lang from 'shtcut/core/lang';

@ApiTags('Common API')
export abstract class BaseController {
  protected lang: any = {
    get: (key = 'Data') => {
      return {
        created: `${key} successfully created`,
        updated: `${key} successfully updated`,
        deleted: `${key} successfully deleted`,
        notFound: `The ${key} could not be found.`,
      };
    },
  };

  constructor(
    protected config: ConfigService,
    protected service: MongoBaseService,
    protected key?: string,
  ) { }

  @Get('/unique/:key')
  @HttpCode(OK)
  public async findByUniqueKey(
    @Param('key') key: string,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const value = await this.service.findByUniqueKey(key, req.params);
      const response = await this.service.getResponse({
        code: OK,
        value,
      });
      return res.status(OK).json(response);
    } catch (e) {
      next(e);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  @HttpCode(CREATED)
  public async create(
    @Body() payload: Record<string, any>,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const queryParser = new QueryParser(Object.assign({}, req.query));

      if (!this.service.routes.create) {
        const appError = new AppException(METHOD_NOT_ALLOWED, lang.get('app').createNotAllow);
        return next(appError);
      }

      const reqObj = await this.service.prepareBodyObject(req);
      let value = await this.service.retrieveExistingResource(reqObj);

      if (value) {
        const returnIfFound = this.service.entity.config.returnDuplicate;
        if (!returnIfFound) {
          const messageObj =
            this.service.entity.config.uniques.length > 0
              ? this.service.entity.config.uniques.map((m: string) => ({
                [m]: `${m} must be unique`,
              }))
              : null;

          const appError = new AppException(CONFLICT, lang.get('app').duplicate, messageObj);
          return next(appError);
        }
      } else {
        const checkError = await this.service.validateCreate(reqObj);
        if (checkError) {
          return next(checkError);
        }
        value = await this.service.createNewObject(reqObj);
      }

      const response = await this.service.getResponse(
        await this.service.postCreate({
          queryParser,
          value,
          code: CREATED,
          message: this.lang.get(this.key || this.service.modelName).created,
        }),
      );
      return res.status(CREATED).json(response);
    } catch (e) {
      return next(e);
    }
  }

  @Get('/')
  @HttpCode(OK)
  public async find(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    try {
      const queryParser = new QueryParser(Object.assign({}, req.query));
      const pagination = new Pagination(req.originalUrl, this.service.baseUrl, this.service.itemsPerPage);

      if (!this.service.routes.find) {
        const appError = new AppException(METHOD_NOT_ALLOWED, lang.get('app').findNotAllow);
        return next(appError);
      }

      const { value, count } = await this.service.buildModelQueryObject(pagination, queryParser, req);

      const response = await this.service.getResponse(
        await this.service.postFind({
          code: OK,
          queryParser,
          value,
          pagination,
          count,
        }),
      );

      return res.status(OK).json(response);
    } catch (e) {
      Logger.log('err::', e);
      return next(e);
    }
  }

  @Get('/:id')
  @HttpCode(OK)
  public async findOne(@Param('id') id: string, @Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    try {
      const queryParser = new QueryParser(Object.assign({}, req.query));

      if (!this.service.routes.findOne) {
        const appError = new AppException(METHOD_NOT_ALLOWED, lang.get('app').findOneNotAllow);
        return next(appError);
      }

      const value = await this.service.findObject(id, queryParser);

      const response = await this.service.getResponse(
        await this.service.postFindOne({
          queryParser,
          code: OK,
          value,
        }),
      );

      return res.status(OK).json(response);
    } catch (e) {
      return next(e);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  @HttpCode(OK)
  public async patch(
    @Param('id') id: string,
    @Body() payload: Record<string, any>,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const queryParser = new QueryParser(Object.assign({}, req.query));

      if (!this.service.routes.patch) {
        const appError = new AppException(METHOD_NOT_ALLOWED, lang.get('app').patchNotAllow);
        return next(appError);
      }

      let object = await this.service.findObject(id, queryParser);
      object = await this.service.patchUpdate(object, payload);

      const canUpdateError = await this.service.validateUpdate(object, payload);
      if (!_.isEmpty(canUpdateError)) {
        throw canUpdateError;
      }

      const response = await this.service.getResponse(
        await this.service.postPatch({
          queryParser,
          code: OK,
          value: object,
          message: this.lang.get(this.service.modelName).updated,
        }),
      );

      return res.status(OK).json(response);
    } catch (e) {
      return next(e);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  @HttpCode(OK)
  public async update(
    @Param('id') id: string,
    @Body() payload: Record<string, any>,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const queryParser = new QueryParser(Object.assign({}, req.query));

      if (!this.service.routes.update) {
        const appError = new AppException(METHOD_NOT_ALLOWED, lang.get('app').updateNotAllow);
        return next(appError);
      }

      let object = await this.service.findObject(id, queryParser);
      if (!object) {
        throw AppException.NOT_FOUND;
      }

      const canUpdateError = await this.service.validateUpdate(object, payload);
      if (!_.isEmpty(canUpdateError)) {
        throw canUpdateError;
      }

      object = await this.service.updateObject(id, payload);

      const response = await this.service.getResponse(
        await this.service.postPatch({
          queryParser,
          code: OK,
          value: object,
          message: this.lang.get(this.service.modelName).updated,
        }),
      );

      return res.status(OK).json(response);
    } catch (e) {
      return next(e);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  @HttpCode(OK)
  public async remove(@Param('id') id: string, @Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    try {
      const queryParser = new QueryParser(Object.assign({}, req.query));

      if (!this.service.routes.remove) {
        const appError = new AppException(METHOD_NOT_ALLOWED, lang.get('app').deleteNotAllow);
        return next(appError);
      }

      let object = await this.service.findObject(id, queryParser);
      if (!object) {
        throw AppException.NOT_FOUND;
      }

      const canUpdateError = await this.service.validateDelete(object);
      if (!_.isEmpty(canUpdateError)) {
        throw canUpdateError;
      }

      object = await this.service.deleteObject(object._id);

      const response = await this.service.getResponse(
        await this.service.postPatch({
          queryParser,
          code: OK,
          value: { _id: object['_id'] || object['publicId'] },
          message: this.lang.get(this.service.modelName).deleted,
        }),
      );

      return res.status(OK).json(response);
    } catch (e) {
      return next(e);
    }
  }
  @Get('/:id/validate')
  @HttpCode(OK)
  public async validate(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const payload = { id };
      const object = await this.service.validateObject(payload);
      const response = await this.service.getResponse({
        code: OK,
        value: {
          _id: object ? object._id || object.publicId : null,
        },
      });
      return res.status(OK).json(response);
    } catch (e) {
      return next(e);
    }
  }

  @Get('/search/one')
  @HttpCode(OK)
  public async searchOne(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const queryParser = new QueryParser(Object.assign({}, req.query));

      let object = null;
      if (!_.isEmpty(queryParser.query)) {
        object = await this.service.searchOneObject(queryParser.query);
      }

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

  @Delete('/delete/many')
  @HttpCode(OK)
  public async deleteMany(@Req() req, @Res() res, @Next() next: NextFunction) {
    try {
      const objects: any = await this.service.deleteMany(req.body);
      const response = await this.service.getResponse(
        await this.service.postDeleteMany({
          code: OK,
          value: {
            ids: objects,
          },
        }),
      );
      return res.status(OK).json(response);
    } catch (err) {
      next(err);
    }
  }
}