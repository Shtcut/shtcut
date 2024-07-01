'use client';

import { Logo } from '@shtcut/components';
import { WelcomePage } from '@shtcut/components/ui/auth/sign-in';
import { AuthTabs } from '@shtcut/components/ui/auth/auth-tab';
import { useMediaQuery } from 'react-responsive';

export const AuthContainer = () => {
    const mobile = useMediaQuery({ query: '(max-width: 1024px' });
    return (
        <section className="px-4">
            <div className="flex items-center gap-6  p-4 h-screen ">
                <WelcomePage />
                <div
                    className="bg-black-500  mx-auto"
                    style={{
                        width: mobile ? '100%' : '500px'
                    }}
                >
                    <Logo />
                    <AuthTabs />
                </div>
            </div>
        </section>
    );
};
