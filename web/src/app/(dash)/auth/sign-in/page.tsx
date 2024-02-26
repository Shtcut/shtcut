import { SignInContainer } from '@shtcut/containers/auth';
import AuthLayout from '../layout';
import Head from 'next/head';

const SignIn = () => {
    return (
        <>
            <Head>
                <title>Shtcut | Sign In</title>
            </Head>
            <AuthLayout>
                <SignInContainer />
            </AuthLayout>
        </>
    );
};

export default SignIn;
