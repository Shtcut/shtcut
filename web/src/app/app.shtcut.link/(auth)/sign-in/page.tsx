import { useRouter } from 'next/router';

const initialValues = {
    username: 'fcode@mailinator.com',
    password: 'password'
};

const SignInPage = () => {
    const router = useRouter();

    return <div>Default SignInPage</div>;
};

export default SignInPage;
