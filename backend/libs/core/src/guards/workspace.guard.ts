import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { RedisService } from '../services/redis/redis.service';

@Injectable()
export class WorkspaceGuard implements CanActivate {
    constructor(private readonly redisService: RedisService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const userId = request.user?._id;

        if (!userId) {
            throw new UnauthorizedException('Authentication required');
        }

        // Get current workspace from Redis
        const currentWorkspace = await this.redisService.get(`user:${userId}:currentWorkspace`);

        if (currentWorkspace) {
            // Attach to request for controllers to use
            request.currentWorkspace = currentWorkspace;
            return true;
        }

        throw new UnauthorizedException('You must select a workspace to access this feature.');
    }
} 