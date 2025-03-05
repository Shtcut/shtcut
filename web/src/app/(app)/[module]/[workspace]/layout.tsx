'use client';

import { Label, Skeleton, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@shtcut-ui/react';
import { MdEmail } from 'react-icons/md';
import { UserNav } from '@shtcut/components/_shared/UserNav';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { sideLinks } from '@shtcut/_shared/data/side-links';
import { SideBar } from '@shtcut/components/dashboard';
import { useMediaQuery } from 'react-responsive';
import { useSidebar } from '@shtcut/components/dashboard/side-bar-context';
import Image from 'next/image';
import { IoIosLink } from 'react-icons/io';
import { RiSurveyFill } from 'react-icons/ri';
import { ChevronRight } from 'lucide-react';
import NavTabs from '@shtcut/components/ui/nav-bar';
import { useWorkspace } from '@shtcut/hooks';

type SideNavItem = {
    id: string;
    icon?: JSX.Element;
    img?: string;
    workspace: string;
    url: string;
    title: string;
};

const WorkspaceLayout = ({ children }: any) => {
    const params = useParams();
    const pathName = usePathname();
    const { isSideBarOpen } = useSidebar();
    const { module, workspace } = params;
    const isTab = useMediaQuery({ query: '(max-width:768px)' });
    const [isOpen, setIsOpen] = useState(!isTab);
    const navigationOptions = sideLinks(module as string, workspace as string);
    const [, setActiveId] = useState<string | null>('1');
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<string | null>(null);
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);
    const { findAllWorkspacesResponse } = useWorkspace({ callWorkspaces: true });
    const workSpaceNav = findAllWorkspacesResponse?.find((ws) => ws.slug === workspace);
    const workspaceString = Array.isArray(workspace) ? workspace.join('') : workspace;

    const sideNav: SideNavItem[] = [];
    if (workSpaceNav?.modules.includes('shtcut-shortener')) {
        sideNav.push({
            id: '1',
            icon: <IoIosLink size={20} />,
            workspace: workspaceString,
            url: `/url/${workspace}/links`,
            title: 'Url Shortener'
        });
    }
    if (workSpaceNav?.modules.includes('shtcut-marketing')) {
        sideNav.push({
            id: '3',
            icon: <MdEmail size={20} />,
            workspace: workspaceString,
            url: `/email/${workspace}/overview`,
            title: 'Email Marketing'
        });
    }
    if (workSpaceNav?.modules.includes('shtcut-survey')) {
        sideNav.push({
            id: '2',
            icon: <RiSurveyFill size={20} />,
            workspace: workspaceString,
            url: `/survey/${workspace}/overview`,
            title: 'Survey Creation'
        });
    }
    if (workSpaceNav?.modules.includes('shtcut-social-manager')) {
        sideNav.push({
            id: '4',
            img: params?.workspace === 'social-media' ? '/images/social-icon.png' : '/images/social.png',
            workspace: workspaceString,
            url: `/social/${workspace}/dashboard`,
            title: 'Social Media'
        });
    }

    const currentNav = sideNav.find((nav) => nav.workspace === workspace);

    const title = currentNav ? currentNav.title : '';
    const handleNavigation = (url: string, id: string) => {
        setActiveId(id);
        router.push(url);
    };

    useEffect(() => {
        const activeLink = navigationOptions?.find((link) => link.href === pathName);
        setActiveTab(activeLink?.id || null);
    }, [pathName, navigationOptions]);

    const handleTabChange = (index: number) => {
        setSelectedTabIndex(index);
    };

    return (
        <div className=" w-full h-screen flex">
            <div className="bg-white w-12  z-50 h-full fixed">
                <div className="h-[63px] bg-white flex items-center justify-center">
                    <Image src={'/images/shtcut-logo-icon.png'} width={24} height={24} alt="shtcut logo" />
                </div>
                <div className="flex flex-col items-center gap-y-2 mt-2">
                    {sideNav.map((navs) => (
                        <TooltipProvider key={navs.id} delayDuration={0}>
                            <Tooltip>
                                <TooltipTrigger>
                                    <div
                                        className={`p-2 rounded-md cursor-pointer ${
                                            workspace === workspaceString
                                                ? 'bg-[#E5EDFD] text-primary-0'
                                                : 'bg-transparent'
                                        }`}
                                        onClick={() => handleNavigation(navs.url, navs.id)}
                                    >
                                        {navs.id === '4' ? (
                                            <Image src={navs.img as string} width={20} height={20} alt="workspace" />
                                        ) : (
                                            navs.icon
                                        )}
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <Label className="font-light text-xs">{navs.title}</Label>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    ))}
                </div>
            </div>
            <div className="relative ml-12 w-full">
                <div className="bg-white px-6 flex items-center flex-1 w-full justify-between border-b h-[63px] z-50 fixed">
                    <div className="w-1/3  flex items-center justify-between bg-red">
                        <div>
                            <h1 className="font-semibold text-sm">{title}</h1>
                        </div>
                        <div className="flex items-center gap-x-2">
                            <p className="text-[#898384] text-xs font-semibold">Link Shortener</p>
                            <ChevronRight size={14} />
                            <p className="text-primary-0 text-xs font-semibold">Links</p>
                        </div>
                    </div>
                    {!isSideBarOpen && (
                        <div className="w-1/2 ">
                            <div className="w-4/5 mx-auto">
                                <NavTabs
                                    selectedTabIndex={selectedTabIndex}
                                    onTabClick={handleTabChange}
                                    navigationOptions={navigationOptions}
                                />
                            </div>
                        </div>
                    )}{' '}
                    <div className="w-1/3 relative flex  justify-end pr-12">
                        <Suspense fallback={<Skeleton className="h-8 w-8 rounded-full" />}>
                            <UserNav />
                        </Suspense>
                    </div>
                </div>
                <section className="flex   w-full">
                    {isSideBarOpen && (
                        <SideBar workSpaceTitle={title} setIsOpen={setIsOpen} isOpen={isOpen} isTab={isTab} />
                    )}
                    <div
                        className={`w-full  relative ${isSideBarOpen ? `${isOpen ? 'ml-[15rem]' : 'ml-[4rem]'}` : ''} p-6 `}
                    >
                        <section className="max-w-screen-lg pt-[63px] mx-auto">{children}</section>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default WorkspaceLayout;
