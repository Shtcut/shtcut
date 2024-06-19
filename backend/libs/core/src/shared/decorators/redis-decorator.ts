import { Inject } from '@nestjs/common';
import { REDIS_CLIENT } from '../constants';

export const InjectRedis = (): ParameterDecorator => Inject(REDIS_CLIENT) as ParameterDecorator;
