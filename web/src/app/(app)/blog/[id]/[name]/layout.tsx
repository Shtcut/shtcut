import { Footer } from '@shtcut/components';
import { HomeNavbar } from '@shtcut/components/ui/home-landing/home-navbar';
import React from 'react';

const BlogLayoutId = ({ children }: React.PropsWithChildren) => {
    return (
        <>
            <main className="space-y-10 w-full">{children}</main>
        </>
    );
};

export default BlogLayoutId;
