import { useGoogleLogin } from '@react-oauth/google';
import { CommonProps, Dict } from '@shtcut-ui/react';
import { SOCIAL_MEDIA } from '@shtcut/_shared/constant';
import { AppButton } from '@shtcut/components';
import { IconBrandGithub, IconBrandGoogle, IconBrandTwitter } from '@tabler/icons-react';
import Image from 'next/image';
import GitHubLogin from 'react-github-login';

interface SocialLoginProps extends CommonProps {
    isLoading: boolean;
    onFailure: (type: string, response: Dict) => void;
    onSuccess: (type: string, response: Dict) => void;
}

export const SocialLogin = ({ isLoading, onFailure, onSuccess, ...props }: SocialLoginProps) => {

    const handleSocialCallback = (social: string, response: Dict, callbackType: 'error' | 'success') => {

        if (callbackType === 'success') {
            let accessToken: string | undefined;

            switch (social) {
                case SOCIAL_MEDIA.FACEBOOK:
                    accessToken = response.hasOwnProperty('accessToken') ? response.accessToken : undefined;
                    break;
                case SOCIAL_MEDIA.GOOGLE:
                    accessToken = response.hasOwnProperty('access_token') ? response.access_token : undefined;
                    break;
                case SOCIAL_MEDIA.GITHUB:
                    accessToken = response.hasOwnProperty('code') ? response.code : undefined;
                    break;
            }

            if (accessToken) {
                onSuccess(social, { accessToken });
            }
        }

        if (callbackType === 'error') {
            onFailure(social, response);
        }
    };

    const signUpGoogle = useGoogleLogin({
        onSuccess: (response) => handleSocialCallback(SOCIAL_MEDIA.GOOGLE, response, 'success'),
        onError: (error) => handleSocialCallback(SOCIAL_MEDIA.GOOGLE, error, 'error'),
        overrideScope: true,
        flow: 'implicit',
        scope: 'email profile https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid'
    });

    return (
        <div className="flex items-center justify-center gap-2">
            <AppButton
                variant="outline"
                className="w-20 h-10 border border-[#726C6C]"
                type="submit"
                loading={isLoading}
            >
                <GitHubLogin
                    clientId={`${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`}
                    onSuccess={(response) => handleSocialCallback(SOCIAL_MEDIA.GITHUB, response, 'success')}
                    onFailure={(error) => handleSocialCallback(SOCIAL_MEDIA.GITHUB, error, 'error')}
                    redirectUri={`${process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URL}`}
                    buttonText={''}
                />
                <IconBrandGithub className="h-6 w-6 " />
            </AppButton>
            <AppButton
                variant="outline"
                className="w-20 h-10 border border-[#726C6C]"
                type="submit"
                onClick={() => signUpGoogle()}
                loading={isLoading}
            >
                <Image src={'/images/google.png'} width={24} height={24} alt="google" />
            </AppButton>
            <AppButton
                variant="outline"
                className="w-20 h-10 border border-[#726C6C]"
                type="submit"
                loading={isLoading}
            >
                <Image src={'/images/apple.png'} width={24} height={24} alt="google" />
            </AppButton>
        </div>
    );
};
