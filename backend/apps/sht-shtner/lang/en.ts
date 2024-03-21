export default {
  error: {
    badRequest: 'Bad request / Validation error',
    server: 'Error in setup interaction',
    internalServer: 'Internal server error',
    resourceNotfound: 'Resource not found!',
    resourceAlreadyExist: 'Duplicate record is not allowed',
    inputs: 'There are problems with your input',
    unAuthorized: 'You are not authorized to perform this action',
    cannotPerformOperation: 'Cannot perform operation',
    notAuthToken: 'No authorization token provided',
    notFound: 'Data not found',
    noUpdateInput: 'Nothing to update',
    forbidden: 'User is not authorized to perform operation',
  },

  link: {
    duplicate: 'The custom alias already exists; please choose a different one.',
    invalidExpiryDate: 'The expiry date is invalid; it must adhere to the ISO-8601 format.',
    invalidateExpiryFutureDate: 'The expiry date must be set in the future.',
    emptyUrl: 'URL key is required',
  },

  plan: {
    notFound: 'This plan is not found',
  },

  user: {
    notFound: 'The user could not be found.',
  },

  domain: {
    notFound: 'The domain could not be found.',
    notVerified: 'The domain verification is yet to be completed.',
    verificationInprogress: 'Domain verification is currently in progress',
  },
};
