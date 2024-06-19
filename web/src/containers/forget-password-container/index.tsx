'use client';

import { Dict } from '@shtcut-ui/react';
import { AppAlert, ForgotPasswordForm, Logo } from '@shtcut/components';
import { WelcomePage } from '@shtcut/components/ui/auth/sign-in';
import { useAuth } from '@shtcut/hooks';
import { IconAlertCircle } from '@tabler/icons-react';
import { get } from 'lodash';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useMediaQuery } from 'react-responsive';

const ForgotPasswordContainerPage = () => {
    const mobile = useMediaQuery({ query: '(max-width: 1024px' });
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
        <section className="px-4">
            <div className="flex items-center gap-6 p-4 h-screen ">
                <WelcomePage />
                <div className="bg-black-500" style={{ width: mobile ? '100%' : '500px', margin: 'auto' }}>
                    <div className="">
                        <h1 className="text-4xl font-bold ">Reset Password</h1>
                        <p className="text-lg   text-muted-foreground  my-4">
                            Please enter the email address that is associated with <br className="lg:flex hidden" />{' '}
                            your Shtcut account to get a rest.
                        </p>
                    </div>
                    <div className="">{error && errorMessage && <ErrorAlert message={errorMessage} />}</div>
                    <ForgotPasswordForm
                        handleForgotPasswordSubmit={handleForgotPasswordSubmit}
                        isLoading={isLoading}
                        error={error}
                    />
                </div>
            </div>
        </section>
    );
};

export default ForgotPasswordContainerPage;
