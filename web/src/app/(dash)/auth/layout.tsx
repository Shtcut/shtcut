import { Logo } from '@shtcut/components';
import Head from 'next/head';
import Image from 'next/image';
import { ReactElement } from 'react';

type AuthLayoutProps = {
    children: ReactElement | ReactElement[];
    title?: string;
};

const AuthLayout = ({ children, title }: AuthLayoutProps) => {
    return (
        <div className="container grid  flex-col items-center  justify-center lg:max-w-none lg:px-1 relative z-10 h-fit w-full max-w-md overflow-hidden">
            <div className="mb-4 flex w-full flex-col justify-center space-y-2 sm:w-[480px] lg:p-9">{children}</div>
        </div>
    );
};
export default AuthLayout;
