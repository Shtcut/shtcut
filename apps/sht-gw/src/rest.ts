import { RequestMethod } from '@nestjs/common';

export const AppEndpoints = [
  { path: '/auth/*', method: RequestMethod.ALL },
  { path: '/user', method: RequestMethod.ALL },
  { path: '/user', method: RequestMethod.ALL },
  { path: '/users/*', method: RequestMethod.ALL },
];

export const WorkerEndpoints = [
  { path: '/media', method: RequestMethod.ALL },
  { path: '/media/*', method: RequestMethod.ALL },
];
