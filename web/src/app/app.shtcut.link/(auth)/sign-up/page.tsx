import { useRouter } from 'next/router';

const initialValues = {
    username: 'fcode@mailinator.com',
    password: 'password'
};

const SignUpPage = () => {
    const router = useRouter();

    return <div>Default SignUpPage</div>;
};

export default SignUpPage;
