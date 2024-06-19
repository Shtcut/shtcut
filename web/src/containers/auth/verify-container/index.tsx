'use client';

import React, { useEffect } from 'react';
import { Button, Dict, Label, ToastAction, toast } from '@shtcut-ui/react';
import { Logo, NavLink } from '@shtcut/components/ui';
import { VerifyEmailPasswordForm } from '@shtcut/components/form';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@shtcut/hooks/auth';
import { AppAlert } from '@shtcut/components/_shared';
import { get } from 'lodash';
import { WelcomePage } from '@shtcut/components/ui/auth/sign-in';
import { useMediaQuery } from 'react-responsive';
import { routes } from '@shtcut/_shared/utils/route';

const VerifyEmailContainer = () => {
    const mobile = useMediaQuery({ query: '(max-width: 1024px' });
    const { push } = useRouter();
    const searchParams = useSearchParams();
    const { verifyEmail, verifyEmailResponse, sendVerification, sendVerificationResponse, authData } = useAuth();
    const { isSuccess, isError, isLoading, error } = verifyEmailResponse;
    const email = authData && authData?.email;

    const { isLoading: isResendingCode, isSuccess: isResendCodeSuccess } = sendVerificationResponse;

    const errorMessage = get(error, ['data', 'meta', 'error', 'message'], 'An error occurred, please try again.');

    const handleVerifyEmailSubmit = (values: Dict) => {
        const payload = {
            email: authData?.email,
            ...values
        };
        verifyEmail({
            payload,
            options: { noSuccessMessage: true, noErrorMessage: true }
        });
    };
    // useEffect(() => {
    //     handleResendVerification();
    // }, []);

    const variant = {
        success: 'default',
        danger: 'destructive'
    };
    const openNotification = (type: 'success' | 'danger' | 'info', message: string) => {
        toast({
            variant: variant[type] ?? 'default',
            title: type.toUpperCase(),
            description: message,
            action: <ToastAction altText="Okay">Okay</ToastAction>
        });
    };

    const handleResendVerification = () => {
        const payload = {
            email: authData?.email,
            type: 'email'
        };
        sendVerification({
            payload,
            options: { successMessage: true }
        });
    };

    if (isResendCodeSuccess) {
        openNotification('info', 'A verification link and code have been sent to your email');
    }

    if (isError) {
        openNotification('danger', errorMessage);
    }

    if (isSuccess) {
        openNotification('success', 'Your account has ben successfully verified');
        push(routes.workspace);
    }
    return (
        <section className="px-4">
            <div className="flex items-center gap-6 p-4 h-screen ">
                <WelcomePage />
                <div className="bg-black-500 mx-auto" style={{ width: mobile ? '100%' : '500px' }}>
                    <div className="">
                        <h3 className="text-gray-800 text-2xl font-poppins font-bold sm:text-4xl">Verification Code</h3>

                        {error && errorMessage && (
                            <AppAlert
                                variant="destructive"
                                className="mx-auto md:w-2/3 items-center"
                                description={errorMessage}
                            />
                        )}
                        <VerifyEmailPasswordForm
                            email={email}
                            handleVerifyEmailSubmit={handleVerifyEmailSubmit}
                            isLoading={isLoading || isResendingCode}
                            handleResendVerification={handleResendVerification}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VerifyEmailContainer;
