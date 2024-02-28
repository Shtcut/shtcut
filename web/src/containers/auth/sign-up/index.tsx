/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { Card, Dict } from '@shtcut-ui/react';
import { Logo, NavLink } from '@shtcut/components';
import { AppAlert } from '@shtcut/components/_shared';
import { SignUpForm } from '@shtcut/components/form';
import { useAuth } from '@shtcut/hooks/auth';
import { get } from 'lodash';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const SignUpContainer = () => {
    const { push } = useRouter();

    const { signUp, authData, signUpResponse } = useAuth();
    const { isSuccess: isSignUpSuccess, isLoading, error } = signUpResponse;

    const isVerifiedEmail = authData?.verifications?.['email'];

    const handleSignInSubmit = (payload: Dict) => {
        signUp({
            payload,
            options: { noSuccessMessage: true }
        });
    };

    useEffect(() => {
        if (isSignUpSuccess) {
            if (!isVerifiedEmail) {
                push(`/auth/verify-email`);
            } else {
                // todo trigger current logged in user
                push(`/welcome`);
            }
        }
    }, [isSignUpSuccess, isVerifiedEmail]);

    return <SignUpForm handleSignUpSubmit={handleSignInSubmit} isLoading={isLoading} error={error} />;
};
