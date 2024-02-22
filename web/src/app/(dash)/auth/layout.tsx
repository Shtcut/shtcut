import { ReactElement } from 'react';

type AuthLayoutProps = {
    children: ReactElement | ReactElement[];
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
    return (
        <div
            className=" w-full h-screen flex flex-col items-center justify-center mx-auto px-4"
            style={{ width: '100%', maxWidth: '730px', margin: '0 auto' }}
        >
            {children}
        </div>
    );
};
export default AuthLayout;
