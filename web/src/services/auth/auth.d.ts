export interface OptionType {
    noErrorMessage?: boolean;
    noSuccessMessage?: boolean;
    errorMessage?: string;
    successMessage?: string;
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
    payload: { email: string; type: 'email' | 'sms' };
    options?: OptionType;
}
