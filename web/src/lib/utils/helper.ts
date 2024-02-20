import { NextRequest } from "next/server";

export const parse = (req: NextRequest) => {
    let domain = req.headers.get('host') as string;
    const path = req.nextUrl.pathname;
    const searchParams = req.nextUrl.searchParams.toString();
    const key = decodeURIComponent(path.split('/')[1]);
    const fullKey = decodeURIComponent(path.slice(1));
    const fullPath = `${path}${searchParams.length > 0 ? `?${searchParams}` : ''}`;
    return {
        domain,
        path,
        key,
        fullPath,
        fullKey
    };
};