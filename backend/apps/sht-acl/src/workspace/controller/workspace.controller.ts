import {
  Body,
  Controller,
  Get,
  HttpCode,
  Next,
  Param,
  Patch,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  AppController,
  CreateWorkspaceDto,
  JwtAuthGuard,
  OK,
  UpdateWorkspaceDto,
  AppException,
  NOT_FOUND,
  CurrentUser,
  Auth,
} from 'shtcut/core';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';
import { WorkspaceService } from '../service/workspace.service';
import * as _ from 'lodash';
import { UserService } from '../../user/service/user.service';

@UseGuards(JwtAuthGuard)
@Controller('workspaces')
export class WorkspaceController extends AppController {
  constructor(
    protected service: WorkspaceService,
    protected config: ConfigService,
    private readonly userService: UserService,
  ) {
    super(config, service);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  @HttpCode(OK)
  public async create(
    @Body() payload: CreateWorkspaceDto,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    return super.create(payload, req, res, next);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:workspace/:token')
  @HttpCode(OK)
  public async acceptInvitation(
    @Body() payload: CreateWorkspaceDto,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
    } catch (e) {
      next(e);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  @HttpCode(OK)
  public async find(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    return super.find(req, res, next);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  @HttpCode(OK)
  public async findOne(@Param('id') id: string, @Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    return super.findOne(id, req, res, next);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  @HttpCode(OK)
  public async update(
    @Param('id') id: string,
    @Body() payload: UpdateWorkspaceDto,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    return super.update(id, payload, req, res, next);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  @HttpCode(OK)
  public async patch(
    @Param('id') id: string,
    @Body() payload: UpdateWorkspaceDto,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    return super.patch(id, payload, req, res, next);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/switch/:workspaceId')
  @HttpCode(OK)
  public async activateWorkspace(
    @CurrentUser() authUser,
    @Param('workspaceId') id: string,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const workspace = await this.service.switchWorkspace(id, authUser['_id']);
      if (!workspace) {
        throw new AppException(NOT_FOUND, this.lang.get('workspace').noActiveWorkspace);
      }
      const response = await this.service.getResponse({
        code: OK,
        message: 'Workspace switched successfully',
        value: {
          _id: workspace._id,
          name: workspace.name,
        },
      });
      return res.status(OK).json(response);
    } catch (err) {
      return next(err);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/current')
  @HttpCode(OK)
  public async getCurrentWorkspace(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    try {
      const workspace = await this.service.findCurrentWorkspace(req.user['_id'].toString());

      if (!workspace) {
        throw new AppException(NOT_FOUND, this.lang.get('workspace').noActiveWorkspace);
      }

      return res.status(OK).json({
        meta: { statusCode: OK },
        data: workspace,
      });
    } catch (err) {
      return next(err);
    }
  }
}
