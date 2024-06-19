import { Config } from 'tailwindcss';
import twshtcut from '@shtcut-ui/react/tailwind-plugin';
import { fontFamily } from 'tailwindcss/defaultTheme';
import tailwindcssAnimate from 'tailwindcss-animate';

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
        screens: {
            xs: '576',
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            '2xl': '1536px'
        },
        extend: {
            fontFamily: {
                // sans: ['var(--font-sans)', ...fontFamily.sans],
                mono: ['var(--font-mono)', ...fontFamily.mono],
                heading: ['var(--font-heading)', ...fontFamily.sans],
                handwriting: ['var(--font-handwriting)', ...fontFamily.sans]
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' }
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' }
                },
                slide: {
                    from: { transform: 'translateX(0)' },
                    to: { transform: 'translateX(-100%)' }
                }
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out'
            },
            colors: {
                primary: {
                    0: '#2F64E9',
                    100: '#b2d8d8',
                    200: '#66b2b2',
                    300: '#174FDC',
                    400: '#092059',
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
                },
                tertiary: {
                    100: '#737791',
                    200: '#A6A6A6',
                    300: '#171717',
                    400: '#666666',
                    500: '#726C6C',
                    600: '#92939E'
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
        twshtcut(),
        tailwindcssAnimate
    ]
};

export default config;
