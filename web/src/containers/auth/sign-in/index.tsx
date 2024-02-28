/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { Dict } from '@shtcut-ui/react';
import { SignInForm } from '@shtcut/components/form';
import { useAuth } from '@shtcut/hooks/auth';
import { get } from 'lodash';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const SignInContainer = () => {
    const { push } = useRouter();
    const { signIn, authData, signInResponse } = useAuth();
    const { isSuccess: isLoginSuccess, isLoading, error } = signInResponse;

    const isVerifiedEmail = authData?.verifications?.['email'];

    const handleSignInSubmit = (payload: Dict) => {
        signIn({
            payload,
            options: { noSuccessMessage: true }
        });
    };

    useEffect(() => {
        if (isLoginSuccess) {
            if (!isVerifiedEmail) {
                push(`/auth/verify-email`);
            } else {
                // todo trigger current logged in user
                push(`/welcome`);
            }
        }
    }, [isLoginSuccess, isVerifiedEmail]);

    return <SignInForm handleLoginSubmit={handleSignInSubmit} isLoading={isLoading} error={error} />;
};
