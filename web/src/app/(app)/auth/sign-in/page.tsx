import { SignInContainer } from '@shtcut/containers/auth';
import AuthLayout from '../layout';

import { GoogleOAuthProvider } from '@react-oauth/google';

const SignIn = () => {
    return (
        <AuthLayout>
            <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}>
                <SignInContainer />
            </GoogleOAuthProvider>
        </AuthLayout>
    );
};

export default SignIn;
