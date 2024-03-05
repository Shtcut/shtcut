import { SignInContainer } from '@shtcut/containers/auth';
import AuthLayout from '../layout';
import Head from 'next/head';

const SignIn = () => {
    return (
        <AuthLayout title="Sign in">
            <SignInContainer />
        </AuthLayout>
    );
};

export default SignIn;
