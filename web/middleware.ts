import { NextFetchEvent, NextRequest } from 'next/server';

const parse = (req: NextRequest) => {
    let domain = req.headers.get('host') as string;
    return {
        domain,
    }
};
export default async function middleware(req: NextRequest, ev: NextFetchEvent) {
    const { domain } = parse(req);
    const url = req.nextUrl.clone();
    const requestedHost =  req.headers.get('X-Forwarded-Host');
    const port = req.headers.get('X-Forwarded-Port');
    const proto = req.headers.get('X-Forwarded-Proto');
}
