import {
    IconBrandGoogleAnalytics,
    IconBriefcase,
    IconLayoutDashboard,
    IconLogout,
    IconQrcode,
    IconSettings
} from '@tabler/icons-react';

export interface NavLink {
    title: string;
    label?: string;
    href: string;
    icon: JSX.Element;
}

export interface SideLink extends NavLink {
    sub?: NavLink[];
}

export const sideLinks: SideLink[] = [
    {
        title: 'Dashboard',
        label: '',
        href: '/dashboard',
        icon: <IconLayoutDashboard size={18} />
    },
    {
        title: 'QR Codes',
        label: '',
        href: '/qr-code',
        icon: <IconQrcode size={18} />
    },
    {
        title: 'Domain',
        label: '',
        href: '/domain',
        icon: <IconBriefcase size={18} />
    },
    {
        title: 'Analytics',
        label: '',
        href: '/dashboard',
        icon: <IconBrandGoogleAnalytics size={18} />
    },
    {
        title: 'Settings',
        label: '',
        href: '/settings',
        icon: <IconSettings size={18} />
    },
    {
        title: 'Sign out',
        label: '',
        href: '/',
        icon: <IconLogout size={18} />
    }
];
