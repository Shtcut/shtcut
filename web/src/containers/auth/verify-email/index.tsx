'use client';

import { Button, Dict, Label, ToastAction, toast } from '@shtcut-ui/react';
import { Logo, NavLink } from '@shtcut/components/ui';
import { VerifyEmailPasswordForm } from '@shtcut/components/form';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@shtcut/hooks/auth';
import { AppAlert } from '@shtcut/components/_shared';
import { get } from 'lodash';

export const VerifyEmailContainer = () => {
    const { push } = useRouter();
    const searchParams = useSearchParams();

    const { verifyEmail, verifyEmailResponse, sendVerification, sendVerificationResponse, authData } = useAuth();
    const { isSuccess, isError, isLoading, error } = verifyEmailResponse;

    const { isLoading: isResendingCode, isSuccess: isResendCodeSuccess } = sendVerificationResponse;

    const errorMessage = get(error, ['data', 'meta', 'error', 'message'], 'An error occurred, please try again.');

    const handleVerifyEmailSubmit = (values: Dict) => {
        console.log('values:::', values);
        const payload = {
            email: authData?.email,
            ...values
        };
        verifyEmail({
            payload,
            options: { noSuccessMessage: true, noErrorMessage: true }
        });
    };

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
        push('/welcome');
    }

    return (
        <div className="relative py-14 block w-full bg-white border-b border-gray-200 p-4 sm:p-6 sm:rounded-lg text-gray-600 space-y-8">
            <div className="text-center">
                <NavLink href="/">
                    <Logo width={150} className="mx-auto" />
                </NavLink>
                <div className="mt-5 space-y-2 w-full mx-auto md:w-1/2">
                    <h3 className="text-gray-800 text-2xl font-poppins font-bold sm:text-3xl">Verification</h3>
                </div>
            </div>
            {error && errorMessage && (
                <AppAlert variant="destructive" className="mx-auto md:w-2/3 items-center" description={errorMessage} />
            )}
            <VerifyEmailPasswordForm
                handleVerifyEmailSubmit={handleVerifyEmailSubmit}
                isLoading={isLoading || isResendingCode}
            />
            <div className="text-center">
                <div>
                    <Label>You didn’t receive a code?</Label>
                    <Button
                        variant="link"
                        className="px-1 font-poppins font-normal text-blue-600 hover:text-blue-500"
                        onClick={handleResendVerification}
                    >
                        Resend
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-4 w-full sm:w-64 mx-auto gap-x-4" />
        </div>
    );
};
