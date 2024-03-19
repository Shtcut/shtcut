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

export const sideLinks = (module: string, workspace: string): SideLink[] => {
    const prefix = `${workspace}`;

    const urlNavs = [
        {
            title: 'Dashboard',
            label: '',
            href: `${workspace}`,
            icon: <IconLayoutDashboard size={18} />
        },
        {
            title: 'QR Codes',
            label: '',
            href: `${workspace}/qr-code`,
            icon: <IconQrcode size={18} />
        },
        {
            title: 'Domain',
            label: '',
            href: `/domain`,
            icon: <IconBriefcase size={18} />
        },
        {
            title: 'Analytics',
            label: '',
            href: `/analytics`,
            icon: <IconBrandGoogleAnalytics size={18} />
        },
        {
            title: 'Settings',
            label: '',
            href: `/settings`,
            icon: <IconSettings size={18} />
        },
        {
            title: 'Sign out',
            label: '',
            href: '/auth/sign-in',
            icon: <IconLogout size={18} />
        }
    ];

    const navs = {
        url: urlNavs,
        social: [],
        survey: [],
        marketing: []
    };
    return navs[module] as SideLink[];
};
