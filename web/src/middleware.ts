import { NextRequest, NextResponse, userAgent } from 'next/server';
import { fetchTargetUrl, isIgnoredPath } from '@shtcut/hooks';
import requestIp from 'request-ip';

export async function middleware(request: NextRequest) {
    const url = request.nextUrl;
    const alias = url.pathname.slice(1);
    const detectedIp = requestIp.getClientIp(request as any);

    if (isIgnoredPath(alias)) {
        return NextResponse.next();
    }

    if (alias) {
        console.log('alias', alias);
        const response = await fetchTargetUrl(alias);
        console.log('response:::', response);
        if (response) {
            const { target, isPrivate, expiryDate } = response;

            // Check if the link has password
            if (isPrivate) {
                return NextResponse.redirect(
                    `${process.env.NEXT_PUBLIC_URL}/link-password?alias=${encodeURIComponent(alias)}`
                );
            }
            // Check if the link has expired
            if (expiryDate && new Date(expiryDate) < new Date()) {
                return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/expired-link`);
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
    unstable_allowDynamic: ['**/node_modules/lodash/_root.js']
};
