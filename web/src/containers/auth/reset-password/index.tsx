'use client';

import React, { useState } from 'react';
import { Dict } from '@shtcut-ui/react';
import { useAuth } from '@shtcut/hooks/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import { get, omit } from 'lodash';
import { AppAlert, UpdatePasswordForm } from '@shtcut/components';
import { IconAlertCircle } from '@tabler/icons-react';
import { WelcomePage } from '@shtcut/components/ui/auth/sign-in';
import { useMediaQuery } from 'react-responsive';
import { routes } from '@shtcut/_shared/utils/route';

const ResetPasswordContainer = () => {
    const [step, setStep] = useState(1);
    const mobile = useMediaQuery({ query: '(max-width: 1024px' });
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
        <section className="px-4">
            <div className="flex items-center gap-6 p-4 h-screen ">
                <WelcomePage />
                <div className="bg-black-500" style={{ width: mobile ? '100%' : '500px', margin: 'auto' }}>
                    <div className="">
                        <h3 className="text-gray-800 text-2xl font-poppins font-bold sm:text-4xl">
                            {step === 1 ? 'Verification Code' : ' Reset account password'}
                        </h3>
                        <p className="text-sm  text-muted-foreground my-4">
                            {step === 1
                                ? `Check your email, a verification was sent to ${emailParams} reset your password`
                                : ` Please enter a new password for ${emailParams}`}
                        </p>
                    </div>
                    <div className="">{error && errorMessage && <ErrorAlert message={errorMessage} />}</div>
                    <UpdatePasswordForm
                        handleUpdatePasswordSubmit={handleUpdatePasswordSubmit}
                        isLoading={isLoading}
                        error={error}
                        onNext={handleNextStep}
                        step={step}
                    />
                </div>
            </div>
        </section>
    );
};

export default ResetPasswordContainer;
