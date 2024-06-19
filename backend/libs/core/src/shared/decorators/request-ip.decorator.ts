import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as requestIp from 'request-ip';
import { AppException, IpAddressInfo, Request } from 'shtcut/core';
import lang from 'shtcut/core/lang';

export const GetClientInfo = (): ParameterDecorator => {
  return createParamDecorator((data: unknown, ctx: ExecutionContext): IpAddressInfo => {
    const request = ctx.switchToHttp().getRequest<Request>();
    if (!request.clientInfo) throw AppException.BAD_REQUEST(lang.get('error').requestIpModule);
    return request.clientInfo;
  })();
};
