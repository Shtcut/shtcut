import { SignUpContainer } from '@shtcut/containers/auth';
import AuthLayout from '../layout';
import { GoogleOAuthProvider } from '@react-oauth/google';

const SignUp = () => {
    return (
        <AuthLayout>
            <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}>
                <SignUpContainer />
            </GoogleOAuthProvider>
        </AuthLayout>
    );
};

export default SignUp;
