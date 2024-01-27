import { RequestMethod } from '@nestjs/common';

export const AdminEndpoints = [
  { path: '/admin/auth/*', method: RequestMethod.ALL },
  { path: '/admin/plans/*', method: RequestMethod.ALL },
  { path: '/admin/features/*', method: RequestMethod.ALL },
];

export const AppEndpoints = [
  { path: '/auth/*', method: RequestMethod.ALL },
  { path: '/user', method: RequestMethod.ALL },
  { path: '/user', method: RequestMethod.ALL },
  { path: '/users/*', method: RequestMethod.ALL },
  { path: '/workspaces*', method: RequestMethod.ALL },
  { path: '/domains*', method: RequestMethod.ALL },
  { path: '/links*', method: RequestMethod.ALL },
];

export const WorkerEndpoints = [
  { path: '/media', method: RequestMethod.ALL },
  { path: '/media/*', method: RequestMethod.ALL },
];
