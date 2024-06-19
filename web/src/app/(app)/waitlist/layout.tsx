import { HomeNavbar } from '@shtcut/components/ui/home-landing/home-navbar';
import React from 'react';

const WaitListLayout = ({ children }: React.PropsWithChildren) => {
    return (
        <>
            <HomeNavbar />
            <main className=" space-y-10">{children}</main>
        </>
    );
};

export default WaitListLayout;
