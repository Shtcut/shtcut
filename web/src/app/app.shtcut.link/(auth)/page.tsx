import { useRouter } from 'next/router';
import SignInPage from './sign-in/page';

export default function AuthPage() {
    const router = useRouter();

    return (
        <div>
            <SignInPage />
        </div>
    );
}
