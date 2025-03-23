import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { RedisService } from '../services/redis/redis.service';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class WorkspaceGuard implements CanActivate {
    constructor(
        private readonly redisService: RedisService,
        private reflector: Reflector
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();

        const bypassRoutes = [
            { path: '/workspaces', method: 'POST' },
            { path: '/workspaces/current', method: 'GET' },
            { path: '/workspaces/current', method: 'PUT' },
        ];

        const shouldBypass = bypassRoutes.some(route => {
            return request.path.endsWith(route.path) && request.method === route.method;
        });

        if (shouldBypass) {
            return true;
        }

        const userId = request.user?._id;

        if (!userId) {
            throw new UnauthorizedException('Authentication required');
        }

        try {
            const currentWorkspace = await this.redisService.get(`user:${userId}:currentWorkspace`);

            if (currentWorkspace) {
                request.currentWorkspace = currentWorkspace;
                return true;


            }

            throw new UnauthorizedException('You must select a current workspace to access this feature');
        } catch (error) {
            console.error('Error in workspace guard:', error);
            // Fail open if there's an error with Redis or other infrastructure
            // This prevents the entire application from becoming inaccessible due to guard issues
            return true;
        }
    }
} 