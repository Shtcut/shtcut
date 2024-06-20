import '../styles/globals.css';
import { cn } from '@shtcut-ui/react';
import { fontHandwriting, fontHeading, fontSans } from '@shtcut/_shared/utils/fonts';
import ScrollToTopButton from '@shtcut/components/scroll-to-top';

import type { Metadata } from 'next';

export const metadata: Metadata = {
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
    category: 'Technology, Marketing'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body
                className={cn(
                    fontSans.variable,
                    fontHeading.variable,
                    fontHandwriting.variable,
                    'min-h-screen scroll-smooth font-sans antialiased selection:bg-foreground selection:text-background'
                )}
            >
                {children}
                <ScrollToTopButton />
            </body>
        </html>
    );
}
