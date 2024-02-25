'use client';

import { Card, Dict } from '@shtcut-ui/react';
import { SignInForm } from '@shtcut/components/form';
import { useAuth } from '@shtcut/hooks/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const SignInContainer = () => {
    const { push } = useRouter();
    const { signIn, authData, signInResponse } = useAuth();
    const { isSuccess: isLoginSuccess } = signInResponse;

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
                push(`/auth/verify-email?email=${authData?.email}`);
            } else {
                // todo trigger current logged in user
                push(`/landing`);
            }
        }
    }, [isLoginSuccess, isVerifiedEmail]);

    return (
        <SignInForm handleLoginSubmit={handleSignInSubmit} signInResponse={signInResponse} isLoading={isLoginSuccess} />
    );
};
