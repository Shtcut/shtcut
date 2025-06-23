import { NextRequest, NextResponse, userAgent } from 'next/server';
import { fetchTargetUrl, isIgnoredPath } from '@shtcut/hooks';
// import ip from 'ip';

const AUTH_TOKEN_KEY = 'shtcut';
function redirectToLogin(request: NextRequest) {
    const loginUrl = new URL('/auth', request.url);
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete(AUTH_TOKEN_KEY);
    response.cookies.delete(`${AUTH_TOKEN_KEY}_user`);

    return response;
}

export async function middleware(request: NextRequest) {
    const url = request.nextUrl;
    const token = request.cookies.get(AUTH_TOKEN_KEY)?.value;
    const pathname = url.pathname;

    const isProtectedRoute =
        pathname.startsWith('/url/') ||
        pathname.startsWith('/email/') ||
        pathname.startsWith('/survey/') ||
        pathname.startsWith('/social/');

    if (isProtectedRoute && !token) {
        return redirectToLogin(request);
    }

    // 🔗 Handle dynamic short links
    const pathAlias = url.pathname.slice(1);
    const queryAlias = url.searchParams.get('alias');
    const alias = queryAlias || pathAlias;

    // const ipResponse = await fetch('https://api.ipify.org?format=json');
    // const ipData = await ipResponse.json();
    // const publicIP = ipData.ip || 'Unknown IP';

    // console.log('Public IP (server-side):', publicIP);

    // console.log('Ip address', ip.address());

    if (!alias || isIgnoredPath(alias)) {
        return NextResponse.next();
    }
    if (alias) {
        const response = await fetchTargetUrl(alias);
        if (response) {
            const { target, isPrivate, expiryDate } = response;

            if (expiryDate && new Date(expiryDate) < new Date()) {
                return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/expired-link`);
            }
            // Check if the link has password
            if (isPrivate) {
                return NextResponse.redirect(
                    `${process.env.NEXT_PUBLIC_URL}/link-password?alias=${encodeURIComponent(alias)}`
                );
            }

            if (target) {
                return NextResponse.redirect(target);
            }
        }
    }

    const { device } = userAgent(request);
    const viewport = device.type === 'mobile' ? 'mobile' : 'desktop';
    url.searchParams.set('viewport', viewport);
    if (url.pathname.match(/^\/(coming-soon)/)) {
        return NextResponse.redirect(new URL('/waitlist', request.url));
    }
    return NextResponse.next();
}

export const config = {
    // runtime: 'edge',
    unstable_allowDynamic: ['**/node_modules/lodash/_root.js'],
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
