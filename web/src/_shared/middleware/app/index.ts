import { parse } from '@shtcut/_shared';
import { NextRequest, NextResponse } from 'next/server';

export async function AppMiddleware(req: NextRequest) {
    parse(req);
    // if (path.includes('/')) {
    //     return NextResponse.redirect(
    //         new URL(`/sign-in${path === '/' ? '' : `?next=${path}`}`, req.url)
    //     );
    // }
    return NextResponse.next();
}

export default AppMiddleware;
