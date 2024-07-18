'use client';

import { Dict } from '@shtcut-ui/react';
import { AppAlert, ForgotPasswordForm } from '@shtcut/components';
import useWindowSize from '@shtcut/components/_shared/Responsiveness';
import { WelcomePage } from '@shtcut/components/ui/auth/sign-in';
import { useAuth } from '@shtcut/hooks';
import { IconAlertCircle } from '@tabler/icons-react';
import { get } from 'lodash';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useMediaQuery } from 'react-responsive';

const ForgotPasswordContainerPage = () => {
    const { width } = useWindowSize();
    const mobileTab = width !== undefined && width <= 992;
    const mobileDesktop = width !== undefined && width <= 1355;
    const smallScreen = width !== undefined && width <= 553;
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
        <section className="">
            <div className="flex items-center h-screen ">
                {!mobileTab && <WelcomePage />}
                <div className=" w-full h-full " style={{ paddingTop: mobileTab ? '100px' : '196px' }}>
                    <div
                        style={{ width: smallScreen ? '100%' : mobileDesktop ? '83%' : '518px' }}
                        className={`${smallScreen && 'px-4'} mx-auto `}
                    >
                        <div className=" flex flex-col gap-y-6">
                            <h1 className="text-4xl font-bold text-[#0F172A]">Reset Password</h1>
                            <p className="text-[#475569]  ">
                                Please enter the email address that is associated with your Shtcut account to get a
                                rest.
                            </p>
                            <div>
                                <div className="">{error && errorMessage && <ErrorAlert message={errorMessage} />}</div>
                                <ForgotPasswordForm
                                    handleForgotPasswordSubmit={handleForgotPasswordSubmit}
                                    isLoading={isLoading}
                                    error={error}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ForgotPasswordContainerPage;
