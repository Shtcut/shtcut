'use client';

import { Card, Dict } from '@shtcut-ui/react';
import { AppAlert, Logo } from '@shtcut/components';
import { ForgotPasswordForm } from '@shtcut/components/form';
import { useAuth } from '@shtcut/hooks/auth';
import { IconAlertCircle } from '@tabler/icons-react';
import { get } from 'lodash';
import { useRouter } from 'next/navigation';

export const ForgotPasswordContainer = () => {
    const { push } = useRouter();
    const { forgotPassword, forgotPasswordResponse } = useAuth();
    const { isSuccess, isLoading, error, data } = forgotPasswordResponse;

    const errorMessage = get(error, ['data', 'meta', 'error', 'message'], 'An error occurred, please try again.');

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

    const ErrorAlert = ({ message }: { message: string }) => (
        <AppAlert
            variant="destructive"
            className="mx-auto mb-3 items-center"
            description={message}
            icon={<IconAlertCircle />}
        />
    );

    return (
        <Card className="p-6">
            <div className="mb-4 flex items-center justify-center">
                <Logo />
            </div>
            <div className="flex flex-col items-center justify-center space-y-3 border-bpx-4 py-6 pt-8 text-center sm:px-16">
                <h1 className="text-2xl flex items-center justify-center font-semibold tracking-tight">
                    Forgot password
                </h1>
                <p className="text-sm w-52 mb-10 space-x-2 justify-center text-muted-foreground">
                    Enter your email for the verification process, we will send 6 digits code to your email.
                </p>
            </div>
            <div className="mt-2">{error && errorMessage && <ErrorAlert message={errorMessage} />}</div>
            <ForgotPasswordForm
                handleForgotPasswordSubmit={handleForgotPasswordSubmit}
                isLoading={isLoading}
                error={error}
            />
        </Card>
    );
};
