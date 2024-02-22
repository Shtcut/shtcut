import { Config } from 'tailwindcss';
import twshtcut from '@shtcut-ui/react/tailwind-plugin';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
    darkMode: 'class',
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        twshtcut.getContentPath()
    ],
    theme: {
        extend: {
            maxWidth: {
                '2xl': '42rem',
              },
            fontFamily: {
                display: ['Poppins', 'cursive'],
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
                poppins: ['Poppins', ...defaultTheme.fontFamily.sans]
            },
            backgroundImage: {
                'default-bg': "url('/background.svg')"
            }
        }
    },
    plugins: [twshtcut()]
};

export default config;
