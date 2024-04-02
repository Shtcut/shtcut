import { MetadataRoute } from 'next';
import { headers } from 'next/headers';

export default function robots(): MetadataRoute.Sitemap {
    const headerList = headers();
    let domain = headerList.get('host') as string;

    if (domain === 'localhost:3000' || domain.endsWith('.vercel.app')) {
        domain = 'shtcut.link';
    }
    return [
        {
            url: 'https://www.shtcut.link',
            lastModified: new Date()
        },
        {
            url: `https://${domain}`,
            lastModified: new Date()
        }
    ];
}
