'use client';

import { Card, Dict } from '@shtcut-ui/react';
import { AppAlert } from '@shtcut/components/_shared';
import { ForgotPasswordForm } from '@shtcut/components/form';
import { Logo, NavLink } from '@shtcut/components/ui';
import { useAuth } from '@shtcut/hooks/auth';
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

    return (
        <Card className=" block w-full bg-white border-b border-gray-200 p-4 py-6 sm:p-6 sm:rounded-lg text-gray-600 space-y-8">
            <div className="text-center">
                <NavLink href="/">
                    <Logo width={150} className="mx-auto" />
                </NavLink>
                <div className="mt-5 space-y-2 w-full mx-auto md:w-1/2">
                    <h3 className="text-gray-800 text-2xl font-poppins font-bold sm:text-3xl">New Password</h3>
                    <p className="font-poppins font-thin items-center">
                        Enter your email for the verification process, we will send 4 digits code to your email.
                    </p>
                </div>
            </div>
            {error && errorMessage && (
                <AppAlert variant="destructive" className="mx-auto md:w-2/3 items-center" description={errorMessage} />
            )}

            <ForgotPasswordForm handleForgotPasswordSubmit={handleForgotPasswordSubmit} isLoading={isLoading} />

            <div className="relative w-3/5 mx-auto" />
            <div className="grid grid-cols-4 w-full sm:w-64 mx-auto gap-x-4" />
        </Card>
    );
};
