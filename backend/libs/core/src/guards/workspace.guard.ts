import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { RedisService } from '../services/redis/redis.service';
import { Reflector } from '@nestjs/core';
import { AppException } from '../shared';
import { InjectModel } from '@nestjs/mongoose';
import { Workspace, WorkspaceDocument } from '../models';
import { Model } from 'mongoose';

@Injectable()
export class WorkspaceGuard implements CanActivate {
  constructor(
    private readonly redisService: RedisService,
    private reflector: Reflector,
    @InjectModel(Workspace.name)
    protected workspaceModel: Model<WorkspaceDocument>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const bypassRoutes = [
      { path: '/workspaces', method: 'POST' },
      { path: '/workspaces/current', method: 'GET' },
      { path: '/workspaces/current', method: 'PUT' },
    ];

    const shouldBypass = bypassRoutes.some(
      (route) => request.path.endsWith(route.path) && request.method === route.method,
    );

    if (shouldBypass) {
      return true;
    }

    const userId = request.user['_id'];

    if (!userId) {
      throw new UnauthorizedException('Authentication required');
    }

    try {
      const cacheKey = `workspace_${userId}`;
      let currentWorkspace = await this.redisService.get(cacheKey);
      request.workspace = currentWorkspace;
      if (currentWorkspace) {
        return true;
      }

      const workspaces = await this.workspaceModel.find({ user: userId, deleted: false });
      if (!workspaces || workspaces.length === 0) {
        throw AppException.FORBIDDEN('You must select a current workspace to access this feature');
      }
      const workspace = workspaces.find((w) => w.isDefault) || workspaces[0];
      currentWorkspace = workspace._id as string;
      await this.redisService.set(cacheKey, currentWorkspace);
      request.workspace = currentWorkspace;
      return true;
    } catch (error) {
      console.error('Error in workspace guard:', error);
      return true;
    }
  }
}
