'use client';

import { Dict, ToastAction, toast } from '@shtcut-ui/react';
import { VerifyEmailPasswordForm } from '@shtcut/components/form';
import { useRouter } from 'next/navigation';
import { useAuth } from '@shtcut/hooks/auth';
import { AppAlert } from '@shtcut/components/_shared';
import { get } from 'lodash';
import { WelcomePage } from '@shtcut/components/ui/auth/sign-in';
import { routes } from '@shtcut/_shared/utils/route';
import useResponsiveScreen from '@shtcut/hooks/responsive-hook';

const VerifyEmailContainer = () => {
    const { mobileDesktop, mobileTab, smallScreen } = useResponsiveScreen();
    const { push } = useRouter();
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
        <section>
            <div className="flex items-center   h-screen ">
                {!mobileTab && <WelcomePage />}
                <div className=" w-full h-full" style={{ paddingTop: mobileTab ? '100px' : '196px' }}>
                    <div
                        style={{ width: smallScreen ? '100%' : mobileDesktop ? '83%' : '511px' }}
                        className={`${smallScreen && 'px-4'} mx-auto `}
                    >
                        <h1 className=" text-3xl font-bold text-[#0F172A]">Verification Code</h1>

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
                            mobileDesktop={mobileDesktop}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VerifyEmailContainer;
