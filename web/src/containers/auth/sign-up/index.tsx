/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { Card, Dict, Label, Modal, ToastAction, toast } from '@shtcut-ui/react';
import { Logo, NavLink } from '@shtcut/components';
import { AppAlert } from '@shtcut/components/_shared';
import { SignUpForm } from '@shtcut/components/form';
import { useAuth } from '@shtcut/hooks/auth';
import { IconAlertCircle } from '@tabler/icons-react';
import { get } from 'lodash';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { VerifyEmailContainer } from '..';

export const SignUpContainer = () => {
    const { push } = useRouter();
    const [openVerifyModal, setOpenVerifyModal] = useState(false);

    const { signUp, authData, signUpResponse, socialLogin, socialLoginResponse } = useAuth();
    const { isSuccess: isSignUpSuccess, isLoading, error } = signUpResponse;
    const { isLoading: isSocialMediaLoading, isSuccess: isSocialLoginSuccess } = socialLoginResponse;

    const errorMessage = get(error, ['data', 'meta', 'error', 'message'], 'An error occurred, please try again.');

    const isVerifiedEmail = authData?.verifications?.['email'];

    const handleSignInSubmit = (payload: Dict) => {
        signUp({
            payload,
            options: { noSuccessMessage: true }
        });
    };

    const onSuccess = (social: string, { accessToken }: Dict) => {
        const payload = {
            socialType: social,
            accessToken
        };
        socialLogin({
            payload,
            options: {
                successMessage: 'Welcome to Shtcut! 🚀'
            }
        });
    };

    const onFailure = (social: string, response: Dict) => {
        toast({
            variant: 'destructive',
            title: 'Uh oh! Something went wrong.',
            description: 'An error occurred, please try again',
            action: <ToastAction altText="Try again">Try again</ToastAction>
        });
    };

    if (error && errorMessage) {
        toast({
            variant: 'destructive',
            title: 'Uh oh! Something went wrong.',
            description: errorMessage,
            action: <ToastAction altText="Try again">Try again</ToastAction>
        });
    }

    const ErrorAlert = ({ message }: { message: string }) => (
        <AppAlert
            variant="destructive"
            className="mx-auto mb-3 items-center"
            description={message}
            icon={<IconAlertCircle />}
        />
    );

    useEffect(() => {
        if (isSignUpSuccess || isSocialLoginSuccess) {
            if (!isVerifiedEmail) {
                setOpenVerifyModal(true);
            } else {
                // todo trigger current logged in user
                push(`/welcome`);
            }
        }
    }, [isSignUpSuccess, isVerifiedEmail, isSocialLoginSuccess]);

    return (
        <>
            <Card className="p-6">
                <div className="mb-4 flex items-center justify-center">
                    <Logo />
                </div>
                <div className="flex flex-col items-center justify-center space-y-3 border-bpx-4 py-6 pt-8 text-center sm:px-16">
                    <h1 className="text-2xl flex items-center justify-center font-semibold tracking-tight">Sign up</h1>
                    <p>
                        <Label className="text-sm w-full mb-10 space-x-2 justify-center text-muted-foreground">
                            Embark on a journey of endless possibilities with us. Your adventure begins now! 🚀✨
                        </Label>
                    </p>
                </div>
                <div className="mt-2">{error && errorMessage && <ErrorAlert message={errorMessage} />}</div>
                <SignUpForm
                    handleSignUpSubmit={handleSignInSubmit}
                    isLoading={isLoading || isSocialMediaLoading}
                    error={error}
                    onFailure={onFailure}
                    onSuccess={onSuccess}
                />
            </Card>
            <Modal
                showModel={openVerifyModal}
                setShowModal={setOpenVerifyModal}
                onClose={() => setOpenVerifyModal(false)}
                className="px-10"
                preventDefaultClose={true}
            >
                <VerifyEmailContainer />
            </Modal>
        </>
    );
};
