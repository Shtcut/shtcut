'use client';

import { Dict, ToastAction, toast } from '@shtcut-ui/react';
import { AppAlert } from '@shtcut/components';
import { SignInForm, SignUpForm } from '@shtcut/components/form';
import { useAuth } from '@shtcut/hooks/auth';
import { IconAlertCircle } from '@tabler/icons-react';
import { get } from 'lodash';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { routes } from '@shtcut/_shared/utils/route';
import AnimatedContainer from '@shtcut/components/framer/animate-div';
import BlurIn from '@shtcut/components/_shared/animations/blur-animation';
import Tabs from '@shtcut/components/_shared/Tabs';

export const AuthTabs = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [selectedTabIndex, setSelectedTabIndex] = useState(() => {
        const defaultTab = searchParams.get('tab') || 'sign-in';
        return defaultTab === 'sign-up' ? 1 : 0;
    });
    const [socialError, setSocialError] = useState<string | undefined>(undefined);
    const { push } = useRouter();
    const { signUp, signIn, authData, signInResponse, socialLogin, socialLoginResponse, signUpResponse } = useAuth();
    const { isSuccess: isLoginSuccess, isLoading: signInLoading, error: signInError, data } = signInResponse;
    const { isLoading: isSocialMediaLoading, isSuccess: isSocialLoginSuccess } = socialLoginResponse;
    const { isSuccess: isSignUpSuccess, isLoading: signUpLoading, error: signUpError } = signUpResponse;
    const errorMessage = get(
        signInError || signUpError,
        ['data', 'meta', 'error', 'message'],
        'An error occurred, please try again.'
    );

    const isVerifiedEmail = authData?.verifications?.['email'];
    const handleSignInSubmit = (payload: Dict) => {
        signIn({
            payload,
            options: { noSuccessMessage: true }
        });
    };

    const handleSignUpSubmit = (payload: Dict) => {
        signUp({
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

    if (signUpError || (signInError && errorMessage)) {
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
                push(routes.verify);
            } else {
                if (data) {
                    const { data: authData } = data || {};
                    if (authData.workspaces && authData.workspaces.length > 0) {
                        const { workspaces } = authData;
                        // redirect(`/url/${workspaces[0].slug}/overview`);
                        redirect(`/url/social-media/overview`);
                    } else {
                        redirect(routes.workspace);
                    }
                }
            }
        }
    }, [isLoginSuccess, isVerifiedEmail, isSocialLoginSuccess, data]);

    useEffect(() => {
        if (isSignUpSuccess || isSocialLoginSuccess) {
            if (!isVerifiedEmail) {
                push(routes.verify);
            } else {
                // todo trigger current logged in user
                push(routes.workspace);
            }
        }
    }, [isSignUpSuccess, isVerifiedEmail, isSocialLoginSuccess]);

    const handleTabChange = (index: number) => {
        const tabId = index === 0 ? 'sign-in' : 'sign-up';
        setSelectedTabIndex(index);
        router.push(`/auth?tab=${tabId}`);
    };

    const defaultTab = searchParams.get('tab') || 'sign-in';
    const tabs = [
        { id: 'sign-in', label: 'Sign In' },
        { id: 'sign-up', label: 'Sign Up' }
    ];

    return (
        <div>
            <BlurIn
                className="text-[#0F172A] text-3xl font-bold"
                word={defaultTab === 'sign-up' ? 'Let’s get you started with Shtcut' : 'Welcome back to Shtcut'}
            />
            <Tabs classNames="mt-[28px]" tabs={tabs} selectedTabIndex={selectedTabIndex} onTabClick={handleTabChange} />

            <div>
                {selectedTabIndex === 0 && (
                    <div>
                        <div className="mt-2">
                            {signInError && errorMessage && <ErrorAlert message={errorMessage} />}
                        </div>

                        <SignInForm
                            handleLoginSubmit={handleSignInSubmit}
                            isLoading={signInLoading || isSocialMediaLoading}
                            error={signInError}
                            onFailure={onFailure}
                            onSuccess={onSuccess}
                        />
                    </div>
                )}
                {selectedTabIndex === 1 && (
                    <div>
                        <div className="mt-2">
                            {signUpError && errorMessage && <ErrorAlert message={errorMessage} />}
                        </div>

                        <SignUpForm
                            handleSignUpSubmit={handleSignUpSubmit}
                            isLoading={signUpLoading || isSocialMediaLoading}
                            error={signInError}
                            onFailure={onFailure}
                            onSuccess={onSuccess}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
