import { SocialAuthRequestType } from './auth.d';
import { api } from '@shtcut/_shared/api/app.api';
import {
    AuthResponseType,
    ForgotPasswordRequestType,
    SendVerificationRequestType,
    SignInRequestType,
    SignUpRequestType,
    UpdatePasswordRequestType,
    VerifyEmailRequestType
} from './auth';
import { ACL, POST } from '@shtcut/_shared/constant';

export const authApi = api?.injectEndpoints({
    endpoints: (builder) => ({
        signIn: builder.mutation<AuthResponseType, SignInRequestType>({
            query: ({ payload }) => {
                return {
                    url: ACL.signInUrl,
                    method: POST,
                    body: payload
                };
            },
            async onQueryStarted() {
                try {
                    // todo dispatch to go get current logged user
                } catch (_) {}
            }
        }),
        signUp: builder.mutation<AuthResponseType, SignUpRequestType>({
            query: ({ payload }) => {
                return {
                    url: ACL.signUpUrl,
                    method: POST,
                    body: payload
                };
            },
            async onQueryStarted() {
                try {
                    // todo dispatch to go get current logged user
                } catch (e) {
                    console.log('error::', e);
                }
            }
        }),
        social: builder.mutation<AuthResponseType, SocialAuthRequestType>({
            query: ({ payload }) => {
                return {
                    url: ACL.socialUrl,
                    method: POST,
                    body: payload
                };
            }
        }),
        verifyEmail: builder.mutation<AuthResponseType, VerifyEmailRequestType>({
            query: ({ payload }) => {
                return {
                    url: ACL.verifyEmailUrl,
                    method: POST,
                    body: payload
                };
            }
        }),
        sendVerification: builder.mutation<AuthResponseType, SendVerificationRequestType>({
            query: ({ payload }) => {
                return {
                    url: ACL.sendVerificationUrl,
                    method: POST,
                    body: payload
                };
            }
        }),
        forgotPassword: builder.mutation<AuthResponseType, ForgotPasswordRequestType>({
            query: ({ payload }) => {
                return {
                    url: ACL.forgotPasswordUrl,
                    method: POST,
                    body: payload
                };
            }
        }),
        updatePassword: builder.mutation<AuthResponseType, UpdatePasswordRequestType>({
            query: ({ payload }) => {
                return {
                    url: ACL.updatePasswordUrl,
                    method: POST,
                    body: payload
                };
            }
        }),
        changePassword: builder.mutation<AuthResponseType, UpdatePasswordRequestType>({
            query: ({ payload }) => {
                return {
                    url: ACL.changePasswordUrl,
                    method: POST,
                    body: payload
                };
            }
        })
    })
});

export const {
    useSignUpMutation,
    useSignInMutation,
    useSocialMutation,
    useVerifyEmailMutation,
    useSendVerificationMutation,
    useForgotPasswordMutation,
    useUpdatePasswordMutation,
    useChangePasswordMutation
} = authApi;
