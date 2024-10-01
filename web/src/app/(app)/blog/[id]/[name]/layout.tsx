import React from 'react';

const BlogLayoutId = ({ children }: React.PropsWithChildren) => {
    return (
        <>
            <main className="space-y-10 w-full">{children}</main>
        </>
    );
};

export default BlogLayoutId;
