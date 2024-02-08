export default {
  error: {
    badRequest: 'Bad request / Validation error',
    server: 'Error in setup interaction',
    internalServer: 'A problem with the server, our engineers are currently on this. Try again later. Thanks',
    resourceNotfound: 'Resource not found!',
    resourceAlreadyExist: 'Duplicate record is not allowed',
    inputs: 'There are problems with your input',
    unAuthorized: 'Not authorized',
    cannotPerformOperation: 'Cannot perform operation',
    notAuthToken: 'No authorization token provided',
    notFound: 'Data not found',
    noUpdateInput: 'Nothing to update',
    forbidden: 'User is not authorized to perform operation',
    requestIpModule: 'First, you need to register the RequestIpModule module in the root module.',
  },

  redis: {
    notConnected: 'Redis disconnected',
    invalidExpire:
      'Invalid ttl format, if you use strings, make sure to provide time units(minutes, hours, days, etc.) for example: "30m", 8h", "7d"',
  },

  app: {
    duplicate: 'Duplicate record is not allowed',
    createNotAllow: 'Create is not allowed for this Item',
    findNotAllow: 'Find is not allowed for this Item',
    findOneNotAllow: 'Get one is not allowed for this Item',
    updateNotAllow: 'Put is not allowed for this Item',
    patchNotAllow: 'Patch is not allowed for this Item',
    deleteNotAllow: 'Delete is not allowed for this Item',
  },

  vercel: {
    unableToAddDomain: 'The attempt to add a domain was unsuccessful.',
    unableToFetchProjectDomain: 'The attempt to fetch projects domain was unsuccessful.',
    unableToProjectDomain: 'The attempt to fetch projects domain was unsuccessful.',
    cannotVerifyDomain: 'The attempt to verify domain was unsuccessful.',
  },
};
