/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { Card, Dict, Modal, ToastAction, toast } from '@shtcut-ui/react';
import { AppAlert, Logo } from '@shtcut/components';
import { SignInForm } from '@shtcut/components/form';
import { useAuth } from '@shtcut/hooks/auth';
import { IconAlertCircle } from '@tabler/icons-react';
import { get } from 'lodash';
import { redirect, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { VerifyEmailContainer } from '../verify-email';
import { useUser } from '@shtcut/hooks/user';

export const SignInContainer = () => {
    const [socialError, setSocialError] = useState<string | undefined>(undefined);

    const { push } = useRouter();
    const [openVerifyModal, setOpenVerifyModal] = useState(false);
    const { signIn, authData, signInResponse, socialLogin, socialLoginResponse } = useAuth();
    const { isSuccess: isLoginSuccess, isLoading, error, data } = signInResponse;
    const { isLoading: isSocialMediaLoading, isSuccess: isSocialLoginSuccess } = socialLoginResponse;

    const errorMessage = get(error, ['data', 'meta', 'error', 'message'], 'An error occurred, please try again.');

    const isVerifiedEmail = authData?.verifications?.['email'];

    const handleSignInSubmit = (payload: Dict) => {
        signIn({
            payload,
            options: { noSuccessMessage: true }
        });
    };

    const ErrorAlert = ({ message }: { message: string }) => (
        <AppAlert
            variant="destructive"
            className="mx-auto mb-3 items-center"
            description={message}
            icon={<IconAlertCircle />}
        />
    );

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
        setSocialError('An error occurred, please try again');
        toast({
            variant: 'destructive',
            title: 'Uh oh! Something went wrong.',
            description: socialError,
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

    useEffect(() => {
        if (isLoginSuccess || isSocialLoginSuccess) {
            if (!isVerifiedEmail) {
                setOpenVerifyModal(true);
            } else {
                if (data) {
                    const { data: authData } = data || {};
                    console.log('authData::', authData);
                    if (authData.workspaces && authData.workspaces.length > 0) {
                        const { workspaces } = authData;
                        redirect(`/url/${workspaces[0].slug}/overview`);
                    } else {
                        push('/welcome');
                    }
                }
            }
        }
    }, [isLoginSuccess, isVerifiedEmail, isSocialLoginSuccess, data]);

    return (
        <>
            <Card className="p-6">
                <div className="mb-4 flex items-center justify-center">
                    <Logo />
                </div>
                <div className="flex flex-col items-center justify-center space-y-3 border-bpx-4 py-6 pt-8 text-center sm:px-16">
                    <h1 className="text-2xl flex items-center justify-center font-semibold tracking-tight">Sign in</h1>
                    <p className="text-sm w-52 mb-10 space-x-2 justify-center text-muted-foreground">
                        Welcome back! Sign in to get started with SHTCUT
                    </p>
                </div>
                <div className="mt-2">{error && errorMessage && <ErrorAlert message={errorMessage} />}</div>
                <SignInForm
                    handleLoginSubmit={handleSignInSubmit}
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
                className="px-10 "
                preventDefaultClose={true}
            >
                <VerifyEmailContainer />
            </Modal>
        </>
    );
};
