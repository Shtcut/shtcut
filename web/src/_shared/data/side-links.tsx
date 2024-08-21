import { LogOut, MailOpen, Link, Settings } from 'lucide-react';
import { PiQrCodeBold } from 'react-icons/pi';
import { AiFillAppstore } from 'react-icons/ai';
import { PiProjectorScreenChartBold } from 'react-icons/pi';
import { BsFillQuestionCircleFill } from 'react-icons/bs';

export interface NavLink {
    id: string;
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
            id: '1',
            title: 'Dashboard',
            href: `/url/${workspace}/overview`,

            icon: <AiFillAppstore size={16} />
        },
        {
            id: '2',
            title: 'Links',
            href: `/url/${workspace}/links`,

            icon: <Link size={16} />
        },
        {
            id: '3',
            title: 'QR Codes',
            href: `/url/${workspace}/qr-codes`,
            icon: <PiQrCodeBold size={16} />
        },
        {
            id: '4',
            title: 'Domains',
            href: `/url/${workspace}/domains`,
            icon: <PiProjectorScreenChartBold size={16} />
        },
        {
            id: '5',
            title: 'Analytics',
            href: `/url/${workspace}/analytics`,

            icon: <MailOpen size={16} />
        },
        {
            id: '6',
            title: 'Sign out',
            // href: `/url/${workspace}/settings`,
            href: '#',
            icon: <LogOut size={16} />
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
