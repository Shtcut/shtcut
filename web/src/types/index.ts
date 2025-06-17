import { Dict } from '@shtcut-ui/react';
import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from 'next/server';

type MaybePromise<T> = T | Promise<T>;

export type UrlParams = Dict<string | string[] | undefined>;

export interface PaginationType {
    showSizeChanger?: boolean | undefined;
    onChange: (page: number, pageSize: number) => void;
    current: number;
    pageSize?: number | undefined;
    total: number;
}

export interface QrCodeType {
    enableQrCode: boolean;
    removeLogo: boolean;
    enableBrandLogo: boolean;
}
export interface LinkType {
    isUTMBuilder?: boolean;
    isExpirationDate?: boolean;
    isPasswordProtection?: boolean;
    qrCode?: QrCodeType;
    isIOSTargeting?: boolean;
    isAndroidTargeting?: boolean;
    isGeoTargeting?: boolean;
}

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
