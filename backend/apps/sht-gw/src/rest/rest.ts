import { RequestMethod } from '@nestjs/common';

export const AdminEndpoints = [
  { path: '/admin/auth/*', method: RequestMethod.ALL },
  { path: '/admin/plans/*', method: RequestMethod.ALL },
  { path: '/admin/features*', method: RequestMethod.ALL },
  { path: '/admin/plans*', method: RequestMethod.ALL },
];

export const AclEndpoints = [
  { path: '/acl/auth/*', method: RequestMethod.ALL },
  { path: '/acl/auth', method: RequestMethod.ALL },
  { path: '/acl/user', method: RequestMethod.ALL },
  { path: '/acl/user', method: RequestMethod.ALL },
  { path: '/acl/users/*', method: RequestMethod.ALL },
  { path: '/acl/workspaces*', method: RequestMethod.ALL },
  { path: '/acl/plans*', method: RequestMethod.ALL },
  { path: '/acl/invitations*', method: RequestMethod.ALL },
  { path: '/acl/tags*', method: RequestMethod.ALL },
  { path: '/acl/roles*', method: RequestMethod.ALL },
  { path: '/acl/permissions*', method: RequestMethod.ALL },
];

export const ShtnerEndpoints = [
  { path: '/shtner/domains*', method: RequestMethod.ALL },
  { path: '/shtner/links*', method: RequestMethod.ALL },
  { path: '/shtner/link-bios*', method: RequestMethod.ALL },
  { path: '/shtner/qrcodes*', method: RequestMethod.ALL },
];

export const WorkerEndpoints = [{ path: '/worker/media*', method: RequestMethod.ALL }];
