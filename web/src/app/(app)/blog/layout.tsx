import { Footer } from '@shtcut/components';
import { HomeNavbar } from '@shtcut/components/ui/home-landing/home-navbar';
import React from 'react';

const BlogLayout = ({ children }: React.PropsWithChildren) => {
    return (
        <>
            <HomeNavbar />
            <main className="space-y-10 w-full">{children}</main>
            <Footer />
        </>
    );
};

export default BlogLayout;
