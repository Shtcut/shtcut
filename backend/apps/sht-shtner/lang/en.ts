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
    invalidPassword: 'The password is invalid',
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

  qrcodes: {
    created: 'QR code successfully created',
    updated: 'QR code successfully updated',
    deleted: 'QR code successfully deleted',
    retrieved: 'QR codes successfully retrieved',
    notFound: 'QR code not found',
    duplicate: 'QR code with this title already exists',
    invalidType: 'Invalid QR code type',
    validation: {
      titleRequired: 'Title is required',
      pdfRequired: 'PDF file is required',
      urlRequired: 'URL is required',
      companyRequired: 'Company name is required',
      contactsRequired: 'Email and phone are required',
      addressRequired: 'Address details are required',
      linksRequired: 'At least one link is required',
      idsRequired: 'Please provide valid QR code IDs',
      typeRequired: 'QR code type is required and must be one of: pdf, vCard, website, or multi-link',
      linkDetailsRequired: 'Each link must have both a URL and a label',
    }
  }
};
