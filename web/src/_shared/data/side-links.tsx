import { LogOut, MailOpen, Link, Image, Headset, AudioLines } from 'lucide-react';
import { PiChatCenteredTextLight, PiCheckSquareOffset, PiQrCodeBold, PiUserCircleGear } from 'react-icons/pi';
import { AiFillAppstore } from 'react-icons/ai';
import { PiProjectorScreenChartBold } from 'react-icons/pi';
import { PiFolderSimplePlusLight } from 'react-icons/pi';
import { IoCalendarOutline } from 'react-icons/io5';
import { PiNoteDuotone } from 'react-icons/pi';
import { GoGraph } from 'react-icons/go';
import { MdOutlineContactMail } from 'react-icons/md';

export interface NavLink {
    id: string;
    title: string;
    label?: string;
    href: string;
    icon?: JSX.Element;
    key?: string;
}

export interface SideLink extends NavLink {
    sub?: NavLink[];
}

export const sideLinks = (module: string, workspace: string): SideLink[] => {
    const urlNavs: NavLink[] = [
        // {
        //     id: '1',
        //     title: 'Dashboard',
        //     href: `/url/${workspace}/overview`,
        //     icon: <AiFillAppstore size={16} />
        // },
        {
            id: '2',
            title: 'Links',
            href: `/url/${workspace}/links`,

            icon: <Link size={16} />
        },
        {
            id: '3',
            title: 'Link-bios',
            href: `/url/${workspace}/link-bios`,
            icon: <MdOutlineContactMail size={16} />
        },
        {
            id: '4',
            title: 'QR Codes',
            href: `/url/${workspace}/qr-codes`,
            icon: <PiQrCodeBold size={16} />
        },
        {
            id: '5',
            title: 'Domains',
            href: `/url/${workspace}/domains`,
            icon: <PiProjectorScreenChartBold size={16} />
        },
        {
            id: '6',
            title: 'Analytics',
            href: `/url/${workspace}/analytics`,

            icon: <MailOpen size={16} />
        },
        {
            id: '7',
            title: 'Sign out',
            key: 'sign-out',
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
            title: 'Live Streams',
            href: `/social/${workspace}/live-stream`,
            icon: <Image size={16} />
        },
        {
            id: '6',
            title: 'Report',
            href: `/social/${workspace}/reports`,
            icon: <Image size={16} />
        },
        {
            id: '7',
            title: 'Ad Management',
            href: `/social/${workspace}/ad-management`,
            icon: <Image size={16} />
        },

        {
            id: '8',
            title: 'Analytics',
            href: `/social/${workspace}/analytics`,
            icon: <GoGraph size={16} />
        },
        {
            id: '9',
            title: 'Tasks',
            href: `/social/${workspace}/tasks`,
            icon: <PiCheckSquareOffset size={16} />
        },
        {
            id: '10',
            title: 'Chats',
            href: `/social/${workspace}/messages`,
            icon: <PiChatCenteredTextLight size={16} />
        },
        {
            id: '11',
            title: 'Social media accounts',
            href: `/social/${workspace}/social-media-accounts`,
            icon: <AudioLines size={16} />
        },
        {
            id: '12',
            title: 'Integration',
            href: `/social/${workspace}/integration`,
            icon: <Headset size={16} />
        },

        {
            id: '13',
            title: 'Support',
            href: `/social/${workspace}/support`,
            icon: <PiUserCircleGear size={16} />
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
