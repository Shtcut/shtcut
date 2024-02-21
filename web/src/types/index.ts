import { Dict } from '@shtcut-ui/react';
import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from 'next/server';

type MaybePromise<T> = T | Promise<T>;

export type UrlParams = Dict<string | string[] | undefined>;

export interface NextRequestWithParams<T> extends NextRequest {
    params: UrlParams;
    context?: T;
}

export type UntilAllMiddleware = (req: NextRequest, res: NextResponse) => MaybePromise<NextResponse>;

export type NextMiddlewareWithParams<T> = (
    req: NextRequestWithParams<T>,
    res: NextResponse,
    evt: NextFetchEvent
) => ReturnType<NextMiddleware>;

// export type PathMatcher = Path;
