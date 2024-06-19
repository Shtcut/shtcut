import { HttpService } from '@nestjs/axios';
import { CanActivate, ExecutionContext, Injectable, createParamDecorator } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class GraphqlAuthGuard implements CanActivate {
  constructor(
    private http: HttpService,
    private config: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { user } = ctx.getContext();
    return !!user;
  }
}

export const AuthContext = createParamDecorator((data, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context);
  const { user, userId, headers = {} } = ctx.getContext();
  if (headers && !headers['x-api-key']) {
    headers['x-api-key'] = process.env.API_KEY;
    headers['authorization'] = '';
  }
  return { user, userId, headers };
});
