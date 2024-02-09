import { Config } from 'tailwindcss';
import twshtcut from '@shtcut-ui/react/tailwind-plugin';

const config: Config = {
    darkMode: 'class',
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        twshtcut.getContentPath()
    ],
    plugins: [twshtcut()]
};

export default config;
