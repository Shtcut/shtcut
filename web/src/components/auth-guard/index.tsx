'use client';

import { useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Cookie from 'js-cookie';
import { useAuth } from '@shtcut/hooks';

const publicRoutes = [
    '/',
    '/landing',
    '/pricing',
    '/product',
    '/qr-code',
    '/auth',
    '/auth/verify',
    '/auth/update-password',
    '/auth/forgot-password',
    '/link-bio',
    '/link-password',
    '/url-shortener',
    '/waitlist',
    '/expired-link',
    '/coming-soon',
    '/blog'
];

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { handleLogout } = useAuth();

    const isPublicRoute = publicRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));

    useEffect(() => {
        const token = Cookie.get(process.env.NEXT_PUBLIC_STORAGE_KEY || 'shtcut');

        if (!token && !isPublicRoute) {
            handleLogout();
            const fullPath = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
            router.push(`/auth?redirect=${encodeURIComponent(fullPath)}`);
        }
    }, [router, pathname, searchParams, isPublicRoute, handleLogout]);

    return <>{children}</>;
};

export default AuthGuard;
