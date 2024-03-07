import { Config } from 'tailwindcss';
import twshtcut from '@shtcut-ui/react/tailwind-plugin';

const SAFELIST_COLORS = 'colors';

const config: Config = {
    darkMode: 'class',
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './safelist.txt',
        twshtcut.getContentPath()
    ],
    theme: {
        fontFamily: {
            sans: [
                'Inter',
                'ui-sans-serif',
                'system-ui',
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                '"Noto Sans"',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
                '"Noto Color Emoji"'
            ],
            serif: ['ui-serif', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
            mono: [
                'ui-monospace',
                'SFMono-Regular',
                'Menlo',
                'Monaco',
                'Consolas',
                '"Liberation Mono"',
                '"Courier New"',
                'monospace'
            ]
        },
        screens: {
            xs: '576',
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            '2xl': '1536px'
        },
        extend: {
            colors: {
                primary: {
                    100: '#b2d8d8',
                    200: '#66b2b2',
                    // 300: '#66b2b2', you can skip some colors like this or not even commnet them
                    // 400: '',
                    500: '#008080',
                    700: '#66b2b2',
                    900: '#004c4c'
                },
                secondary: {
                    100: '##ff9c3c',
                    200: '#ff9022',
                    300: '#ff8308',
                    400: '#ee7600',
                    500: '#d56900',
                    600: '#bb5d00',
                    700: '#a25000',
                    800: '#5f2f00',
                    900: '#472300'
                }
            },
            typography: (theme) => ({
                DEFAULT: {
                    css: {
                        color: theme('colors.gray.500'),
                        maxWidth: '65ch'
                    }
                },
                invert: {
                    css: {
                        color: theme('colors.gray.400')
                    }
                }
            })
        }
    },
    plugins: [
        require('@shtcut-ui/tw-init')({
            path: 'safelist.txt',
            patterns: [
                `text-{${SAFELIST_COLORS}}`,
                `bg-{${SAFELIST_COLORS}}`,
                `dark:bg-{${SAFELIST_COLORS}}`,
                `dark:hover:bg-{${SAFELIST_COLORS}}`,
                `dark:active:bg-{${SAFELIST_COLORS}}`,
                `hover:text-{${SAFELIST_COLORS}}`,
                `hover:bg-{${SAFELIST_COLORS}}`,
                `active:bg-{${SAFELIST_COLORS}}`,
                `ring-{${SAFELIST_COLORS}}`,
                `hover:ring-{${SAFELIST_COLORS}}`,
                `focus:ring-{${SAFELIST_COLORS}}`,
                `focus-within:ring-{${SAFELIST_COLORS}}`,
                `border-{${SAFELIST_COLORS}}`,
                `focus:border-{${SAFELIST_COLORS}}`,
                `focus-within:border-{${SAFELIST_COLORS}}`,
                `dark:text-{${SAFELIST_COLORS}}`,
                `dark:hover:text-{${SAFELIST_COLORS}}`,
                `h-{height}`,
                `w-{width}`
            ]
        }),
        require('@tailwindcss/typography'),
        twshtcut()
    ]
};

export default config;
