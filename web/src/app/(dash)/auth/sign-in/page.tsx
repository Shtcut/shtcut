import { SignInContainer } from '@shtcut/containers/auth';
import AuthLayout from '../layout';
import Head from 'next/head';

const SignIn = () => {
    return (
        <AuthLayout>
            <SignInContainer />
        </AuthLayout>
    );
};

export default SignIn;
