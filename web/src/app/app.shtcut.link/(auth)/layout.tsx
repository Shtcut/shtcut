import Head from 'next/head';
import { ReactElement } from 'react';

export interface AuthLayoutProps {
    children?: ReactElement | ReactElement[];
}

const AuthLayout = (props: AuthLayoutProps) => {
    return (
        <Head>
            <title>Shtcut | Auth</title>

            <div>{props.children}</div>
        </Head>
    );
};

export default AuthLayout;
