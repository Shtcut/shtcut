import { NextRequest, NextResponse, userAgent } from 'next/server';
import { fetchTargetUrl, isIgnoredPath } from '@shtcut/hooks';
import requestIp from 'request-ip';

export async function middleware(request: NextRequest) {
    const url = request.nextUrl;
    const pathAlias = url.pathname.slice(1);
    const queryAlias = url.searchParams.get('alias');
    const alias = queryAlias || pathAlias;
    const detectedIp = requestIp.getClientIp(request as any);

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
    unstable_allowDynamic: ['**/node_modules/lodash/_root.js']
};
