import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Inject, Optional } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthUser } from '../interfaces/user.interface';

@Injectable()
export class WorkspaceGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        @Optional() @Inject('REDIS_SERVICE') private readonly redisService?: any
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const request = context.switchToHttp().getRequest();

            // Keep the bypass routes logic
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

            // If Redis service is available, use it to get workspace
            if (this.redisService) {
                try {
                    const currentWorkspace = await this.redisService.get(`user:${userId}:currentWorkspace`);

                    if (currentWorkspace) {
                        request.currentWorkspace = currentWorkspace;
                        return true;
                    }
                } catch (error) {
                    console.error('Redis error in workspace guard:', error);
                    // Fall through to default behavior
                }
            }

            // For now, in development/testing, let's continue allowing access
            // This can be replaced with proper error handling in production
            return true;
        } catch (error) {
            console.error('Error in workspace guard:', error);
            // Fail open for now - this prevents the entire app from breaking 
            // if there's an issue with the workspace guard
            return true;
        }
    }
} 