/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { Dict } from '@shtcut-ui/react';
import { WorkspaceForm } from '@shtcut/components/form/auth';
import { useAuth } from '@shtcut/hooks/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const WorkspaceContainer = () => {
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

    return (
        <WorkspaceForm
            module="shtcut-shtner"
            handleWorkspaceSubmit={handleSignInSubmit}
            isLoading={isLoading}
            error={error}
        />
    );
};
