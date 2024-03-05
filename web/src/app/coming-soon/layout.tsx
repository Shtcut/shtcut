import { Inter } from 'next/font/google';

import Head from 'next/head';

const inter = Inter({
    weight: ['100', '200', '300', '600', '400', '700', '900'],
    subsets: ['latin']
});

export const metadata = {
    title: 'Shtcut - Coming soon',
    description:
        'The open-source software functions as a marketing tool, consolidating a diverse array of marketing tools into a singular, comprehensive platform. Commonly known as an "all-in-one" or "integrated" marketing platform, this concept is designed to offer users a centralized solution encompassing multiple facets of marketing'
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <Head>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <body className={`${inter.className} bg-gray-200 dark:bg-[#0d1117] `}>
                <main>{children}</main>
            </body>
        </html>
    );
}
