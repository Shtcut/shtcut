import Head from 'next/head';
import { ReactElement } from 'react';

type AuthLayoutProps = {
    children: ReactElement | ReactElement[];
    title?: string;
};

const AuthLayout = ({ children, title }: AuthLayoutProps) => {
    return (
        <>
            <Head>
                <title>{`Shtcut - ${title}`}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div
                className=" w-full h-screen flex flex-col items-center justify-center mx-auto px-4"
                style={{ width: '100%', maxWidth: '730px', margin: '0 auto' }}
            >
                {children}
            </div>
        </>
    );
};
export default AuthLayout;
