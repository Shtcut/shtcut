import { LogOut, MailOpen, Link, Image,  } from 'lucide-react';
import { PiChats, PiQrCodeBold, PiUserCircleGear } from 'react-icons/pi';
import { AiFillAppstore } from 'react-icons/ai';
import { PiProjectorScreenChartBold } from 'react-icons/pi';
import { PiFolderSimplePlusLight } from 'react-icons/pi';
import { IoCalendarOutline } from 'react-icons/io5';
import { PiNoteDuotone } from 'react-icons/pi';
import { GoGraph } from 'react-icons/go';
import { IoMdCheckboxOutline } from 'react-icons/io';

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
            href: `/social/${workspace}/dashboard`,
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
            title: 'Media Library',
            href: `/social/${workspace}/media-library`,
            icon: <Image size={16} />
        },
        {
            id: '5',
            title: 'Analytics',
            href: `/social/${workspace}/analytic`,
            icon: <GoGraph size={16} />
        },
        {
            id: '6',
            title: 'Tasks',
            href: `/social/${workspace}/tasks`,
            icon: <IoMdCheckboxOutline size={16} />
        },
        {
            id: '7',
            title: 'Messages',
            href: `/social/${workspace}/messages`,
            icon: <PiChats size={16} />
        },
        {
            id: '8',
            title: 'All Account',
            href: `/social/${workspace}/all-account`,
            icon: <PiUserCircleGear size={16} />
        },
        {
            id: '7',
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
