import {
    IconBrandGoogleAnalytics,
    IconBriefcase,
    IconLayoutDashboard,
    IconQrcode,
    IconSettings
} from '@tabler/icons-react';

export interface NavLink {
    title: string;
    label?: string;
    href: string;
    icon?: JSX.Element;
}

export interface SideLink extends NavLink {
    sub?: NavLink[];
}

export const sideLinks = (module: string, workspace: string): SideLink[] => {
    const urlNavs: NavLink[] = [
        {
            title: 'Overviews',
            href: `/url/${workspace}/overview`,
            icon: <IconBrandGoogleAnalytics width={10} height={10}/>
        },
        {
            title: 'Links',
            href: `/url/${workspace}/links`,
            icon: <IconBriefcase />
        },
        {
            title: 'QR Codes',
            href: `/url/${workspace}/qr-codes`,
            icon: <IconQrcode />
        },
        {
            title: 'Domains',
            href: `/url/${workspace}/domains`,
            icon: <IconLayoutDashboard />
        },
        {
            title: 'Link bios',
            href: `/url/${workspace}/link-bios`,
            icon: <IconQrcode />
        },
        {
            title: 'Settings',
            href: `/url/${workspace}/settings`,
            icon: <IconSettings />
        }
    ];

    const socialNavs = [
        {
            title: 'Overview',
            href: `/social/${workspace}/overview`
        },
        {
            title: 'Posts',
            href: `/social/${workspace}/posts`
        },
        {
            title: 'Calendars',
            href: `/social/${workspace}/calendars`
        }
    ];

    const navs = {
        url: urlNavs,
        social: socialNavs,
        survey: [],
        marketing: []
    };
    return navs[module] as SideLink[];
};
