import plugin from 'tailwindcss/plugin';
import { dirname, join } from 'path';

const SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' id='download' width='100' height='100' viewBox='0 0 100 100'%3E%3Cpath id='Path_3' data-name='Path 3' d='M96,95h4v1H96v4H95V96H86v4H85V96H76v4H75V96H66v4H65V96H56v4H55V96H46v4H45V96H36v4H35V96H26v4H25V96H16v4H15V96H0V95H15V86H0V85H15V76H0V75H15V66H0V65H15V56H0V55H15V46H0V45H15V36H0V35H15V26H0V25H15V16H0V15H15V0h1V15h9V0h1V15h9V0h1V15h9V0h1V15h9V0h1V15h9V0h1V15h9V0h1V15h9V0h1V15h9V0h1V15h4v1H96v9h4v1H96v9h4v1H96v9h4v1H96v9h4v1H96v9h4v1H96v9h4v1H96v9h4v1H96Zm-1,0V86H86v9ZM85,95V86H76v9ZM75,95V86H66v9ZM65,95V86H56v9ZM55,95V86H46v9ZM45,95V86H36v9ZM35,95V86H26v9ZM25,95V86H16v9ZM16,85h9V76H16Zm10,0h9V76H26Zm10,0h9V76H36Zm10,0h9V76H46Zm10,0h9V76H56Zm10,0h9V76H66Zm10,0h9V76H76Zm10,0h9V76H86Zm9-10V66H86v9ZM85,75V66H76v9ZM75,75V66H66v9ZM65,75V66H56v9ZM55,75V66H46v9ZM45,75V66H36v9ZM35,75V66H26v9ZM25,75V66H16v9ZM16,65h9V56H16Zm10,0h9V56H26Zm10,0h9V56H36Zm10,0h9V56H46Zm10,0h9V56H56Zm10,0h9V56H66Zm10,0h9V56H76Zm10,0h9V56H86Zm9-10V46H86v9ZM85,55V46H76v9ZM75,55V46H66v9ZM65,55V46H56v9ZM55,55V46H46v9ZM45,55V46H36v9ZM35,55V46H26v9ZM25,55V46H16v9ZM16,45h9V36H16Zm10,0h9V36H26Zm10,0h9V36H36Zm10,0h9V36H46Zm10,0h9V36H56Zm10,0h9V36H66Zm10,0h9V36H76Zm10,0h9V36H86Zm9-10V26H86v9ZM85,35V26H76v9ZM75,35V26H66v9ZM65,35V26H56v9ZM55,35V26H46v9ZM45,35V26H36v9ZM35,35V26H26v9ZM25,35V26H16v9ZM16,25h9V16H16Zm10,0h9V16H26Zm10,0h9V16H36Zm10,0h9V16H46Zm10,0h9V16H56Zm10,0h9V16H66Zm10,0h9V16H76Zm10,0h9V16H86Z' fill='rgba(255,255,255,0.1)' fill-rule='evenodd' opacity='0.5' /%3E%3Cpath id='Path_4' data-name='Path 4' d='M6,5V0H5V5H0V6H5v94H6V6h94V5Z' fill='rgba(255,255,255,0.1)' fill-rule='evenodd' /%3E%3C/svg%3E`;

function twshtcut() {
  return plugin(
    ({ addBase }) => {
      addBase({
        ':root': {
          '--background': '0 0% 100%',
          '--foreground': '222.2 47.4% 11.2%',

          '--muted': '201 40% 96.1%',
          '--muted-foreground': '215.4 16.3% 46.9%',

          '--card': '0 0% 100%',
          '--card-foreground': '240 10% 3.9%',

          '--border': '214.3 31.8% 91.4%',

          '--input': '214.3 31.8% 91.4%',

          '--primary': '222.2 47.4% 11.2%',
          '--primary-foreground': '210 40% 98%',

          '--secondary': '210 40% 96.1%',
          '--secondary-foreground': '222.2 47.4% 11.2%',

          '--accent': '210 40% 96.1%',
          '--accent-foreground': '222.2 47.4% 11.2%',

          '--destructive': '0 100% 50%',
          '--destructive-foreground': '210 40% 98%',

          '--ring': '215 20.2% 65.1%',

          '--radius': '0.5rem',
        },
        '.dark': {
          '--background': '222.2 84% 4.9%',
          '--foreground': '210 40% 98%',

          '--card': '222.2 84% 4.9%',
          '--card-foreground': '210 40% 98%',

          '--popover': '222.2 84% 4.9%',
          '--popover-foreground': '210 40% 98%',

          '--primary': '210 40% 98%',
          '--primary-foreground': '222.2 47.4% 11.2%',

          '--secondary': '217.2 32.6% 17.5%',
          '--secondary-foreground': '210 40% 98%',

          '--muted': '217.2 32.6% 17.5%',
          '--muted-foreground': '215 20.2% 65.1%',

          '--accent': '217.2 32.6% 17.5%',
          '--accent-foreground': '210 40% 98%',

          '--destructive': '0 62.8% 30.6%',
          '--destructive-foreground': '210 40% 98%',

          '--border': '217.2 32.6% 17.5%',
          '--input': '217.2 32.6% 17.5%',
          '--ring': '212.7 26.8% 83.9%',
        },
      });
    },
    {
      theme: {
        container: {
          center: true,
          padding: '2em',
          screens: {
            '2xl': '1400px',
          },
        },
        extend: {
          backgroundImage: {
            'grid-pattern': `url("${SVG}")`,
            'radial-gradient-pattern': `radial-gradient(at 27% 37%, hsla(215, 98%, 61%, 1) 0px, transparent 0%),radial-gradient(at 97% 21%, hsla(125, 98%, 72%, 1) 0px, transparent 50%),radial-gradient(at 52% 99%, hsla(354, 98%, 61%, 1) 0px, transparent 50%),radial-gradient(at 10% 29%, hsla(256, 96%, 67%, 1) 0px, transparent 50%),radial-gradient(at 97% 96%, hsla(38, 60%, 74%, 1) 0px, transparent 50%),radial-gradient(at 33% 50%, hsla(222, 67%, 73%, 1) 0px, transparent 50%),radial-gradient(at 79% 53%, hsla(343, 68%, 79%, 1) 0px, transparent 50%)`,
          },
          colors: {
            light: '#EEEEEE',
            dark: '#000000',
            border: 'hsl(var(--border))',
            input: 'hsl(var(--input))',
            ring: 'hsl(var(--ring))',
            background: 'hsl(var(--background))',
            foreground: 'hsl(var(--foreground))',
            primary: {
              DEFAULT: 'hsl(var(--primary))',
              foreground: 'hsl(var(--primary-foreground))',
            },
            secondary: {
              DEFAULT: 'hsl(var(--secondary))',
              foreground: 'hsl(var(--secondary-foreground))',
            },
            destructive: {
              DEFAULT: 'hsl(var(--destructive))',
              foreground: 'hsl(var(--destructive-foreground))',
            },
            muted: {
              DEFAULT: 'hsl(var(--muted))',
              foreground: 'hsl(var(--muted-foreground))',
            },
            accent: {
              DEFAULT: 'hsl(var(--accent))',
              foreground: 'hsl(var(--accent-foreground))',
            },
            popover: {
              DEFAULT: 'hsl(var(--popover))',
              foreground: 'hsl(var(--popover-foreground))',
            },
            card: {
              DEFAULT: 'hsl(var(--card))',
              foreground: 'hsl(var(--card-foreground))',
            },
          },
          borderRadius: {
            lg: `var(--radius)`,
            md: `calc(var(--radius) - 2px)`,
            sm: 'calc(var(--radius) - 4px)',
          },
          keyframes: {
            'accordion-down': {
              from: { height: '0' },
              to: { height: 'var(--radix-accordion-content-height)' },
            },
            'accordion-up': {
              from: { height: 'var(--radix-accordion-content-height)' },
              to: { height: '0' },
            },
          },
          animation: {
            'accordion-down': 'accordion-down 0.2s ease-out',
            'accordion-up': 'accordion-up 0.2s ease-out',
          },
        },
      },
      plugins: [require('tailwindcss-animate')],
      content: ['../../safelist.txt'],
      darkMode: ['class'],
    },
  );
}

twshtcut.getContentPath = () => join(dirname(require.resolve('@shtcut-ui/react')), '**/*.{js,jsx,ts,tsx}');

export default twshtcut;
