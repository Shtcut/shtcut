'use client';

import { Card, Dict, Separator } from '@shtcut-ui/react';
import { AppAlert, Logo } from '@shtcut/components';
import { ForgotPasswordForm, WorkspaceForm } from '@shtcut/components/form';
import { useAuth } from '@shtcut/hooks/auth';
import { IconAlertCircle } from '@tabler/icons-react';
import { get } from 'lodash';
import { useRouter } from 'next/navigation';

export const WorkspaceContainer = () => {
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
        <div className="p-6">
            <div className="mb-4 flex items-center justify-center">
                <Logo className="py-2" />
            </div>
            <div className="flex flex-col items-center justify-center space-y-3 border-bpx-4 py-6 pt-8 text-center sm:px-16">
                <h1 className="text-xl flex items-center justify-center font-semibold tracking-tight">
                    Create a workspace
                </h1>
                <p className="text-sm w-52 mb-10 space-x-2 justify-center text-muted-foreground">
                    Create. Track. Collaborate
                </p>
            </div>
            <div className="mt-2">{error && errorMessage && <ErrorAlert message={errorMessage} />}</div>
            <Separator className="w-full" />

            <div className="mt-5 ">
                <WorkspaceForm handleWorkspaceSubmit={handleForgotPasswordSubmit} isLoading={isLoading} error={error} />
            </div>
        </div>
    );
};
