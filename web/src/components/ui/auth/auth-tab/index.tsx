'use client';

import { Dict, ToastAction, toast } from '@shtcut-ui/react';
import { AppAlert } from '@shtcut/components';
import { SignInForm, SignUpForm } from '@shtcut/components/form';
import { useAuth } from '@shtcut/hooks/auth';
import { IconAlertCircle } from '@tabler/icons-react';
import { get } from 'lodash';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@shtcut-ui/react';
import { routes } from '@shtcut/_shared/utils/route';

export const AuthTabs = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
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
                        redirect(`/url/${workspaces[0].slug}/overview`);
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

    const handleTabChange = (value: string) => {
        router.push(`/auth?tab=${value}`);
    };
    const defaultTab = searchParams.get('tab') || 'sign-up';

    return (
        <Tabs defaultValue={defaultTab} className="w-full relative  rounded-full" onValueChange={handleTabChange}>
            <TabsList className="grid w-full static rounded-full h-fit  border-b grid-cols-2  bg-[#ECF0FF] ">
                <TabsTrigger
                    value="sign-up"
                    className="text-[#9C9AA5] font-medium rounded-full text-lg   data-[state=active]:text-white data-[state=active]:border-primary-0 data-[state=active]:bg-primary-0  "
                >
                    Sign Up
                </TabsTrigger>
                <TabsTrigger
                    value="sign-in"
                    className="text-[#9C9AA5] font-medium rounded-full text-lg  data-[state=active]:text-white data-[state=active]:border-primary data-[state=active]:bg-primary-0 "
                >
                    Sign In
                </TabsTrigger>
            </TabsList>
            <TabsContent value="sign-in">
                <div className="mt-2">{signInError && errorMessage && <ErrorAlert message={errorMessage} />}</div>
                <SignInForm
                    handleLoginSubmit={handleSignInSubmit}
                    isLoading={signInLoading || isSocialMediaLoading}
                    error={signInError}
                    onFailure={onFailure}
                    onSuccess={onSuccess}
                />
            </TabsContent>
            <TabsContent value="sign-up">
                <div className="mt-2">{signUpError && errorMessage && <ErrorAlert message={errorMessage} />}</div>
                <SignUpForm
                    handleSignUpSubmit={handleSignUpSubmit}
                    isLoading={signUpLoading || isSocialMediaLoading}
                    error={signInError}
                    onFailure={onFailure}
                    onSuccess={onSuccess}
                />
            </TabsContent>
        </Tabs>
    );
};
