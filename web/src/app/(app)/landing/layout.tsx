import { Footer } from '@shtcut/components';
import { HomeNavbar } from '@shtcut/components/ui/home-landing/home-navbar';
import React from 'react';

const LandingLayout = ({ children }: React.PropsWithChildren) => {
    return (
        <>
            <HomeNavbar />
            <main className="container space-y-10">{children}</main>
            {/* <Footer /> */}
        </>
    );
};

export default LandingLayout;
