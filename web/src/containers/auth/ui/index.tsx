'use client';

import { WelcomePage } from '@shtcut/components/ui/auth/sign-in';
import { AuthTabs } from '@shtcut/components/ui/auth/auth-tab';
import useResponsiveScreen from '@shtcut/hooks/responsive-hook';

export const AuthContainer = () => {
    const { mobileDesktop, mobileTab, smallScreen } = useResponsiveScreen();
    return (
        <section className="h-screen">
            <div className="flex items-center  h-full">
                {!mobileTab && <WelcomePage />}
                <div className=" overflow-y-auto w-full h-full">
                    <div
                        style={{ width: smallScreen ? '100%' : mobileDesktop ? '83%' : '518px' }}
                        className={`${smallScreen && 'px-4'} mx-auto pt-20`}
                    >
                        <AuthTabs />
                    </div>
                </div>
            </div>
        </section>
    );
};
