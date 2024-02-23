export const GET = 'GET';
export const POST = 'POST';
export const PUT = 'PUT';
export const PATCH = 'PATCH';
export const DELETE = 'DELETE';

/** URL */
export const ACL = {
    signUpUrl: 'acl/auth/sign-up',
    signInUrl: 'acl/auth/sign-in',
    verifyEmailUrl: 'acl/auth/verify-email',
    sendVerificationUrl: 'acl/auth/send-verification',
    forgotPasswordUrl: 'acl/auth/password-reset',
    resetPasswordUrl: 'acl/auth/reset-password',
    changePasswordUrl: 'acl/auth/change-password',
    loggedInUserUrl: 'acl/users/me',
};

export const AUTH_TOKEN_KEY = process.env.NEXT_PUBLIC_STORAGE_KEY as string;
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;
export const API_KEY = process.env.NEXT_PUBLIC_API_KEY as string;