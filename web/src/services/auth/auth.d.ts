export interface OptionType {
    noErrorMessage?: boolean;
    noSuccessMessage?: boolean;
    errorMessage?: string;
    successMessage?: string;
}

export interface AuthResponseType {
    meta: Record<'token', string>;
    data: Dict;
}

export interface SocialAuthRequestType {
    payload: { socialType: 'facebook' | 'google' | 'twitter' | 'github'; accessToken: string };
    options?: OptionType;
}
export interface SignInRequestType {
    payload: Record<'email' & 'password', string>;
    options?: OptionType;
}

export interface SignUpRequestType {
    payload: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
    };
    options?: OptionType;
}

export interface VerifyEmailRequestType {
    payload: { email: string; verificationCode: string };
    options?: OptionType;
}

export interface SendVerificationRequestType {
    payload: { email: string; type: 'email' | 'sms' };
    options?: OptionType;
}

export interface ForgotPasswordRequestType {
    payload: { email: string };
    options?: OptionType;
}

export interface UpdatePasswordRequestType {
    payload: { email: string; resetPasswordCode: string; password: string };
    options?: OptionType;
}

export interface ChangePasswordRequestType {
    payload: { currentPassword: string; password: string };
    options?: OptionType;
}
