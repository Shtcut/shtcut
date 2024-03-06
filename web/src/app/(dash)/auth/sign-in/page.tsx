import { SignInContainer } from '@shtcut/containers/auth';
import AuthLayout from '../layout';
import Head from 'next/head';

const SignIn = () => {
    return (
        <AuthLayout
            content={
                <div className="mb-4">
                    <h3 className="mb-1">Sign In</h3>
                    <p className="font-poppins font-normal items-center">
                        Welcome back! Login to get started with SHTCUT If not yet registered, click on sign up to create
                        an account
                    </p>
                </div>
            }
        >
            <SignInContainer />
        </AuthLayout>
    );
};

export default SignIn;
