import { parse } from '@shtcut/_lib';
import { NextRequest, NextResponse } from 'next/server';

export async function AppMiddleware(req: NextRequest) {
    const { fullPath } = parse(req);
    return NextResponse.rewrite(new URL(`/app.shtcut.link${fullPath === '/' ? '' : fullPath}`, req.url));
}

export default AppMiddleware;
