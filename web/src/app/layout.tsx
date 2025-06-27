import '../styles/globals.css';
import { cn } from '@shtcut-ui/react';
import { fontHandwriting, fontHeading, fontSans } from '@shtcut/_shared/utils/fonts';
import ScrollToTopButton from '@shtcut/components/scroll-to-top';

import type { Metadata } from 'next';

export const metadata: Metadata = {
    metadataBase: new URL('https://shtcut.co'),
    title: 'Shtcut - Empowering Marketing Innovation, Together... ',
    description:
        'Shtcut is the open-source software to Transform Your Marketing Efforts: One Platform for Efficiency, Strategy, and Smart Decision-making.',
    keywords: [
        'shtcut',
        'shorten',
        'url',
        'marketing',
        'email marketing',
        'survey',
        'social media',
        'shortened',
        'shortening',
        'shorten link',
        'link shorteners'
    ],
    applicationName: 'Shtcut',
    robots: 'index, follow',
    category: 'Technology, Marketing',
    authors: [{ name: 'Shtcut', url: 'https://shtcut.co' }],
    openGraph: {
        title: 'Shtcut - Empowering Marketing Innovation, Together...',
        description:
            'Shtcut is the open-source software to Transform Your Marketing Efforts: One Platform for Efficiency, Strategy, and Smart Decision-making.',
        url: 'https://shtcut.co',
        siteName: 'Shtcut',

        images: [
            {
                url: 'https://shtcut.co/images/shtcut-logo.png',
                width: 1200,
                height: 630,
                alt: 'Shtcut'
            }
        ],
        type: 'website'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Shtcut - Empowering Marketing Innovation, Together...',
        description:
            'Shtcut is the open-source software to Transform Your Marketing Efforts: One Platform for Efficiency, Strategy, and Smart Decision-making.',
        images: ['https://shtcut.co/images/shtcut-logo.png']
    },
    other: {
        'google-site-verification': '',
        'schema:Organization': JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Shtcut',
            url: 'https://shtcut.co',
            logo: 'https://shtcut.co/images/shtcut-logo.png',
            description:
                'Shtcut is the open-source software to Transform Your Marketing Efforts: One Platform for Efficiency, Strategy, and Smart Decision-making.'
        })
    },
    alternates: {
        canonical: 'https://shtcut.co'
    }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body
                className={cn(
                    fontSans.variable,
                    fontHeading.variable,
                    fontHandwriting.variable,
                    'min-h-screen scroll-smooth antialiased selection:bg-foreground selection:text-background'
                )}
            >
                {children}
                <ScrollToTopButton />
            </body>
        </html>
    );
}
