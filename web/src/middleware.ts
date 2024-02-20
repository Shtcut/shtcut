import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { AppMiddleware, parse } from '@shtcut/lib';

export default async function middleware(req: NextRequest, ev: NextFetchEvent) {
    const { domain, path, fullPath, key, fullKey } = parse(req);
    return AppMiddleware(req);
}
