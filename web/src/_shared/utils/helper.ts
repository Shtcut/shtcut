import { NextRequest } from 'next/server';

export const parse = (req: NextRequest) => {
    const path = req.nextUrl.pathname;
    const searchParams = req.nextUrl.searchParams.toString();
    const key = decodeURIComponent(path.split('/')[1]);
    const fullKey = decodeURIComponent(path.slice(1));
    const fullPath = `${path}${searchParams.length > 0 ? `?${searchParams}` : ''}`;
    return {
        path,
        key,
        fullPath,
        fullKey
    };
};

export const highlightText = (text: string, query: string) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(
        regex,
        (match) =>
            `<span style="background-color: #2F64E9; color: #ffffff; padding: 0.05em 0.2em 0.05em 0.2em; border-radius:2px; ">${match}</span>`
    );
};
