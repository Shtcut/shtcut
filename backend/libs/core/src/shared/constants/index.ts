import { HttpStatus } from '@nestjs/common';
export const WorkerService = {
  WORKER_SERVICE_TOKEN: 'WORKER_SERVICE_TOKEN',
};

export const REDIS_MODULE_OPTIONS = Symbol('REDIS_MODULE_OPTIONS');
export const REDIS_CLIENT = Symbol('REDIS_CLIENT');

export const POST = 'post';
export const GET = 'get';
export const PUT = 'put';
export const PATCH = 'patch';
export const DELETE = 'delete';

export const OK = HttpStatus.OK;
export const CONFLICT = HttpStatus.CONFLICT;
export const INTERNAL_SERVER_ERROR = HttpStatus.INTERNAL_SERVER_ERROR;
export const CREATED = HttpStatus.CREATED;
export const BAD_REQUEST = HttpStatus.BAD_REQUEST;
export const FORBIDDEN = HttpStatus.FORBIDDEN;
export const NOT_FOUND = HttpStatus.NOT_FOUND;
export const NO_CONTENT = HttpStatus.NO_CONTENT;
export const METHOD_NOT_ALLOWED = HttpStatus.METHOD_NOT_ALLOWED;
export const UNAUTHORIZED = HttpStatus.UNAUTHORIZED;

export const DefaultPermissions = {
  ADMIN: ['can_create_user', 'can_update_user', 'can_view_user', 'can_delete_user'],
  OWNER: ['can_create_user', 'can_update_user', 'can_view_user', 'can_delete_user', 'can_invite_user'],
};
