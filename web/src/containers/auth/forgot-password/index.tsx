'use client';

import { Dict } from '@shtcut-ui/react';
import { ForgotPasswordForm } from '@shtcut/components/form';
import { useAuth } from '@shtcut/hooks/auth';
import { get } from 'lodash';
import { useRouter } from 'next/navigation';

export const ForgotPasswordContainer = () => {
    const { push } = useRouter();
    const { forgotPassword, forgotPasswordResponse } = useAuth();
    const { isSuccess, isLoading, error, data } = forgotPasswordResponse;

    const handleForgotPasswordSubmit = (payload: Dict) => {
        forgotPassword({
            payload,
            options: {
                successMessage: 'An email has been sent to your email address',
                errorMessage: 'This email does not exist in our database'
            }
        });
    };

    if (isSuccess) {
        push(`/auth/update-password?email=${get(data, ['data', 'email'], '')}`);
    }

    return (
        <ForgotPasswordForm
            handleForgotPasswordSubmit={handleForgotPasswordSubmit}
            isLoading={isLoading}
            error={error}
        />
    );
};
