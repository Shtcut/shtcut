
import { AuthContainer } from '@shtcut/containers/auth/ui';
import AuthLayout from './layout';

import { GoogleOAuthProvider } from '@react-oauth/google';

const SignIn = () => {
    return (
        <AuthLayout>
            <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}>
                <AuthContainer />
            </GoogleOAuthProvider>
        </AuthLayout>
    );
};

export default SignIn;
