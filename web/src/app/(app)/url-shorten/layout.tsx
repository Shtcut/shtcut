import { Footer } from '@shtcut/components';
import { HomeNavbar } from '@shtcut/components/ui/home-landing/home-navbar';
import React from 'react';

const ShortNerLayout = ({ children }: React.PropsWithChildren) => {
    return (
        <>
            <HomeNavbar />
            <main className=" space-y-10">{children}</main>
            <Footer />
        </>
    );
};

export default ShortNerLayout;
