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

  auth: {
    socialError: 'Sorry we cannot verify your social account at the moment',
    socialEmailRequired: 'Your social email is required',
    invalidUser: 'Invalid credentials',
    userExist: 'User with credential already exist!',
    invalidCode: 'Invalid verification code',
    expiredCode: 'Verification code has expired',
    resetPassword: 'Reset Your Account',
    passwordChanged: 'Password changed successfully',
    datVerified: 'Account already verified',
    sendVerification: 'A verification link and code have been sent to your email',
    passwordReset: 'Your password reset was successfully',
  },

  workspace: {
    notFound: 'This workspace is not found',
    invalidDomain: 'The workspace does not have ownership of this domain.',
  },
};
