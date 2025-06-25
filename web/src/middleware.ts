import { NextRequest, NextResponse, userAgent } from 'next/server';
import { fetchTargetUrl, isIgnoredPath } from '@shtcut/hooks';

const AUTH_TOKEN_KEY = 'shtcut';

export async function middleware(request: NextRequest) {
    const url = request.nextUrl;
    const token = request.cookies.get(AUTH_TOKEN_KEY)?.value;

    // ✅ Check if token exists and is a valid JWT
    if (!token || token.split('.').length !== 3) {
        return redirectToLogin(request);
    }

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.exp * 1000 < Date.now()) {
            return redirectToLogin(request);
        }
    } catch (error) {
        console.error('JWT decoding error:', error);
        return redirectToLogin(request);
    }

    // 🔗 Handle dynamic short links
    const pathAlias = url.pathname.slice(1);
    const queryAlias = url.searchParams.get('alias');
    const alias = queryAlias || pathAlias;

    if (!alias || isIgnoredPath(alias)) {
        return addViewportParam(request);
    }

    const response = await fetchTargetUrl(alias);

    if (response) {
        const { target, isPrivate, expiryDate } = response;

        if (expiryDate && new Date(expiryDate) < new Date()) {
            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/expired-link`);
        }

        if (isPrivate) {
            return NextResponse.redirect(
                `${process.env.NEXT_PUBLIC_URL}/link-password?alias=${encodeURIComponent(alias)}`
            );
        }

        if (target) {
            return NextResponse.redirect(target);
        }
    }

    return addViewportParam(request);
}

// 👇 Adds viewport=mobile/desktop as a query param
function addViewportParam(request: NextRequest) {
    const url = request.nextUrl.clone();
    const { device } = userAgent(request);
    const viewport = device.type === 'mobile' ? 'mobile' : 'desktop';
    url.searchParams.set('viewport', viewport);

    return NextResponse.rewrite(url);
}

// 👇 Redirects to login while preserving intended path
function redirectToLogin(request: NextRequest) {
    const loginUrl = new URL('/auth', request.url);
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
}

// ✅ Make sure /auth and public files are not matched
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|auth|link-password|expired-link).*)']
};
