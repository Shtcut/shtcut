'use client';

import { useEffect, useCallback } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Cookie from 'js-cookie';
import { useAuth } from '@shtcut/hooks';
import { jwtDecode } from 'jwt-decode';

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

interface DecodedToken {
    exp: number;
}

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { handleLogout } = useAuth();
    const handleUnauthorized = useCallback(() => {
        handleLogout();
        const fullPath = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
        router.push(`/auth?redirect=${encodeURIComponent(fullPath)}`);
    }, [handleLogout, pathname, searchParams, router]);

    const isPublicRoute = publicRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));

    useEffect(() => {
        const token = Cookie.get(process.env.NEXT_PUBLIC_STORAGE_KEY || 'shtcut');
        if (isPublicRoute) {
            return;
        }
        if (!token) {
            handleUnauthorized();
            return;
        }
        try {
            const decodedToken: DecodedToken = jwtDecode(token);

            if (decodedToken && decodedToken.exp) {
                const expirationTimeMs = decodedToken.exp * 1000;
                const bufferTimeMs = 60 * 1000;
                if (expirationTimeMs < Date.now() + bufferTimeMs) {
                    handleUnauthorized();
                    return;
                }
            }
        } catch (error) {
            handleUnauthorized();
            return;
        }
    }, [isPublicRoute, handleUnauthorized]);

    return <>{children}</>;
};

export default AuthGuard;
