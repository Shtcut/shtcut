import { API_BASE_URL, SHTNER } from '@shtcut/_shared/constant';
import { RedirectUrlType } from '@shtcut/types/types';
import { userAgent } from 'next/server';

export async function fetchTargetUrl(alias: string): Promise<RedirectUrlType | null> {
    try {
        const response = await fetch(
            `${API_BASE_URL}/shtner/links/visit/shtcut.link/${alias}?apiKey=${SHTNER.metaKey}`
        );

        if (!response.ok) {
            return null;
        }
        const data = await response.json();
        return data?.data || null;
    } catch (error) {
        return null;
    }
}

export function isIgnoredPath(alias: string): boolean {
    const ignoredPaths = ['_next/', '.js', '.css', '.svg', '.woff2', '.woff', '.ico'];
    return ignoredPaths.some((path) => alias.endsWith(path) || alias.startsWith(path));
}

export function getViewport(request: Request): 'mobile' | 'desktop' {
    const { device } = userAgent(request);
    return device.type === 'mobile' ? 'mobile' : 'desktop';
}
