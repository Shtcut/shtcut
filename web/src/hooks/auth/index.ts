import { useAppDispatch, useAppSelector } from '@shtcut/redux/store';
import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { Dict } from '@shtcut-ui/react';
import {
    useChangePasswordMutation,
    useForgotPasswordMutation,
    useSendVerificationMutation,
    useSignInMutation,
    useSignUpMutation,
    useSocialMutation,
    useUpdatePasswordMutation,
    useVerifyEmailMutation
} from '@shtcut/services/auth';
import { logout } from '@shtcut/redux/slices/auth';
import { AUTH_TOKEN_KEY } from '@shtcut/_shared/constant';
import Cookies from 'js-cookie';

interface UseAuthReturnType {
    // mutations
    signIn: MutationTrigger<any>;
    signUp: MutationTrigger<any>;
    socialLogin: MutationTrigger<any>;
    verifyEmail: MutationTrigger<any>;
    forgotPassword: MutationTrigger<any>;
    sendVerification: MutationTrigger<any>;
    updatePassword: MutationTrigger<any>;
    changePassword: MutationTrigger<any>;

    // response
    signInResponse: Dict;
    signUpResponse: Dict;
    socialLoginResponse: Dict;
    verifyEmailResponse: Dict;
    forgotPasswordResponse: Dict;
    sendVerificationResponse: Dict;
    updatePasswordResponse: Dict;
    changePasswordResponse: Dict;
    authData: Dict | null;
    sessionToken: string | undefined;
    isOwner: boolean;

    handleLogout: () => void;
}

export const useAuth = (): UseAuthReturnType => {
    const dispatch = useAppDispatch();
    const [signUp, signUpResponse] = useSignUpMutation();
    const [signIn, signInResponse] = useSignInMutation();
    const [socialLogin, socialLoginResponse] = useSocialMutation();
    const [verifyEmail, verifyEmailResponse] = useVerifyEmailMutation();
    const [sendVerification, sendVerificationResponse] = useSendVerificationMutation();
    const [forgotPassword, forgotPasswordResponse] = useForgotPasswordMutation();
    const [updatePassword, updatePasswordResponse] = useUpdatePasswordMutation();
    const [changePassword, changePasswordResponse] = useChangePasswordMutation();

    const { authData = {}, isOwner } = useAppSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
    };

    const sessionToken: string | undefined = Cookies.get(AUTH_TOKEN_KEY);

    return {
        signUp,
        signIn,
        socialLogin,
        verifyEmail,
        sendVerification,
        forgotPassword,
        updatePassword,
        changePassword,

        // response
        signUpResponse,
        socialLoginResponse,
        signInResponse,
        verifyEmailResponse,
        sendVerificationResponse,
        forgotPasswordResponse,
        updatePasswordResponse,
        changePasswordResponse,

        authData,
        sessionToken,
        isOwner,

        handleLogout
    };
};
