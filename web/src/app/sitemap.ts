import { MetadataRoute } from 'next';
import { headers } from 'next/headers';

const pages = ['landing', 'auth/sign-in', 'auth/sign-up', 'auth/forgot-password'];

export default function robots(): MetadataRoute.Sitemap {
    const headerList = headers();
    let domain = headerList.get('host') as string;

    if (domain === 'localhost:3000' || domain.endsWith('.vercel.app')) {
        domain = 'shtcut.link';
    }
    return [
        {
            url: `https://${domain}`,
            lastModified: new Date()
        },
        ...pages.map((p) => ({
            url: `https://www.shtcut.link/${p}`,
            lastModified: new Date()
        }))
    ];
}
