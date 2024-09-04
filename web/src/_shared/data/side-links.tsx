import { LogOut, MailOpen, Link } from 'lucide-react';
import { PiQrCodeBold } from 'react-icons/pi';
import { AiFillAppstore } from 'react-icons/ai';
import { PiProjectorScreenChartBold } from 'react-icons/pi';
import { PiFolderSimplePlusLight } from 'react-icons/pi';
import { IoCalendarOutline } from 'react-icons/io5';
import { PiNoteDuotone } from 'react-icons/pi';
import { GoGraph } from 'react-icons/go';

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
            id: '1',
            title: 'Dashboard',
            href: `/social/${workspace}/overview`,
            icon: <AiFillAppstore size={16} />
        },
        {
            id: '2',
            title: 'Posts',
            href: `/social/${workspace}/posts`,
            icon: <PiFolderSimplePlusLight size={16} />
        },
        {
            id: '3',
            title: 'Calendars',
            href: `/social/${workspace}/calendars`,
            icon: <IoCalendarOutline size={16} />
        },
        {
            id: '4',
            title: 'Post Management',
            href: `/social/${workspace}/calendars`,
            icon: <PiNoteDuotone size={16} />
        },
        {
            id: '5',
            title: 'Analytics',
            href: `/social/${workspace}/calendars`,
            icon: <GoGraph size={16} />
        },
        {
            id: '6',
            title: 'Sign out',
            href: `/social/${workspace}/calendars`,
            icon: <LogOut size={16} />
        }
    ];

    const surveyNavs = [
        {
            title: 'Overview',
            href: `/survey/${workspace}/overview`
        },
        {
            title: 'Survey',
            href: `/survey/${workspace}/survey`
        },
        {
            title: 'Calendars',
            href: `/survey/${workspace}/calendars`
        }
    ];

    const navs = {
        url: urlNavs,
        social: socialNavs,
        survey: surveyNavs,
        marketing: []
    };
    return navs[module] as SideLink[];
};
