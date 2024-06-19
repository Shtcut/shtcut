import { Inter, JetBrains_Mono } from 'next/font/google';
import localFont from 'next/font/local';

export const fontSans = Inter({
    variable: '--font-sans',
    subsets: ['latin']
});

export const fontMono = JetBrains_Mono({
    variable: '--font-mono',
    subsets: ['latin']
});

export const fontHeading = localFont({
    src: '../../../public/fonts/CalSans-SemiBold.woff',
    variable: '--font-heading'
});

export const fontHandwriting = localFont({
    src: '../../../public/fonts/Virgil.woff2',
    variable: '--font-handwriting'
});
