export default {
  error: {
    badRequest: 'There are missing field(s) in your input',
    companyExist: 'Duplicate company name',
    notFound: 'Data not found',
    unAuthorized: 'You are not authorized to perform this action.',
    internalServer: 'Oops, there is a problem with our server, our engineers are currently on this.',
    unableToProcessTransaction: 'Unable to process transaction, please try again later',
  },

  auth: {
    alreadyInit: 'Admin already initialized',
    userExist: 'User with credential already exist!',
    authenticationFailure: 'Authentication Failed! Wrong email or password.',
    dataVerified: 'This account has been verified',
    invalidCode: 'Invalid verification code',
    expiredCode: 'Verification code has expired, kindly request for another one',
    socialError: 'Sorry we cannot verify your social account at the moment',
  },

  wallets: {
    transactionInProgress: 'Transaction in progress',
  },

  transactions: {
    approveFund: 'Fund approved successfully',
    notFound: 'Transaction not found',
  },
};
