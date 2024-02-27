/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { Card, Dict } from '@shtcut-ui/react';
import { Logo, NavLink } from '@shtcut/components';
import { AppAlert } from '@shtcut/components/_shared';
import { SignInForm } from '@shtcut/components/form';
import { useAuth } from '@shtcut/hooks/auth';
import { get } from 'lodash';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const SignInContainer = () => {
    const { push } = useRouter();
    const { signIn, authData, signInResponse } = useAuth();
    const { isSuccess: isLoginSuccess, isLoading, error } = signInResponse;

    const errorMessage = get(error, ['data', 'meta', 'error', 'message'], 'An error occurred, please try again.');

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
                push(`/landing`);
            }
        }
    }, [isLoginSuccess, isVerifiedEmail]);

    return <SignInForm handleLoginSubmit={handleSignInSubmit} isLoading={isLoading}/>
};
