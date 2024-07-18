'use client';

import React, { useState } from 'react';
import { Dict } from '@shtcut-ui/react';
import { useAuth } from '@shtcut/hooks/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import { get, omit } from 'lodash';
import { AppAlert, UpdatePasswordForm } from '@shtcut/components';
import { IconAlertCircle } from '@tabler/icons-react';
import { WelcomePage } from '@shtcut/components/ui/auth/sign-in';
import { routes } from '@shtcut/_shared/utils/route';
import useResponsiveScreen from '@shtcut/hooks/responsive-hook';

const ResetPasswordContainer = () => {
    const [step, setStep] = useState(1);
    const { mobileDesktop, mobileTab, smallScreen } = useResponsiveScreen();
    const searchParams = useSearchParams();
    const emailParams = searchParams.get('email');
    const { push } = useRouter();
    const { updatePassword, updatePasswordResponse } = useAuth();
    const { isSuccess, isLoading, error } = updatePasswordResponse;
    const errorMessage = get(error, ['data', 'meta', 'error', 'message'], 'An error occurred, please try again.');

    const handleNextStep = () => {
        setStep(step + 1);
    };

    const handleUpdatePasswordSubmit = (values: Dict) => {
        const payload = {
            email: emailParams,
            ...omit(values, ['confirmPassword'])
        };
        if (step === 2) {
            updatePassword({
                payload,
                options: {
                    successMessage: 'Password change successful'
                }
            });
        }
    };

    const ErrorAlert = ({ message }: { message: string }) => (
        <AppAlert
            variant="destructive"
            className="mx-auto mb-3 items-center"
            description={message}
            icon={<IconAlertCircle />}
        />
    );

    if (isSuccess) {
        push(routes.login);
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
                        <h1 className=" text-3xl font-bold text-[#0F172A]">
                            {step === 1 ? 'Verification Code' : ' Reset account password'}
                        </h1>
                        <p className="text-sm  text-[#475569] mt-2">
                            {step === 1
                                ? `Check your email, a verification was sent to ${emailParams} reset your password`
                                : ` Please enter a new password for ${emailParams}`}
                        </p>

                        <div className="mt-6">
                            <div className="">{error && errorMessage && <ErrorAlert message={errorMessage} />}</div>
                            <UpdatePasswordForm
                                handleUpdatePasswordSubmit={handleUpdatePasswordSubmit}
                                isLoading={isLoading}
                                error={error}
                                onNext={handleNextStep}
                                step={step}
                                mobileDesktop={mobileDesktop}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ResetPasswordContainer;
