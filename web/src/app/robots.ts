import { MetadataRoute } from 'next';
import { headers } from 'next/headers';

export default function robots(): MetadataRoute.Robots {
    const headerList = headers();
    let domain = headerList.get('host') as string;

    if (domain === 'localhost:3000' || domain.endsWith('.vercel.app')) {
        domain = 'shtcut.link';
    }
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/'
            },
            {
                userAgent: 'LinkedInBot',
                allow: '/'
            }
        ],
        sitemap: `https://${domain}/sitemap.xml`
    };
}
