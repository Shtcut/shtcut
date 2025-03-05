'use client';

import { useMediaQuery } from 'react-responsive';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { sideLinks } from '@shtcut/_shared/data/side-links';
import { useParams, usePathname, useRouter } from 'next/navigation';
import HeaderSideNav from './header-sidenav';
import { Button, Label, Modal, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@shtcut-ui/react';
import { Plus } from 'lucide-react';
import CreateWorkSpace from '@shtcut/containers/work-space/work-space-modal';
import UrlShortenerActionsFeatures from './url-shortner-btn';
import { useAuth } from '@shtcut/hooks';

type Props = {
    setIsOpen: (val: boolean) => void;
    isOpen: boolean;
    isTab: boolean;
    workSpaceTitle?: string;
};

export default function SideBar({ isOpen, isTab, setIsOpen, workSpaceTitle }: Props) {
    const router = useRouter();
    const params = useParams();
    const pathName = usePathname();
    const { module, workspace } = params;
    const navigationOptions = sideLinks(module as string, workspace as string);
    const { handleLogout } = useAuth();
    const isMd = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
    const [activeTab, setActiveTab] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const Sidebar_animation = isTab
        ? {
              open: {
                  x: 0,
                  width: '15rem',
                  transition: {
                      damping: 40
                  }
              },
              closed: {
                  x: -250,
                  width: 0,
                  transition: {
                      damping: 40,
                      delay: 0.15
                  }
              }
          }
        : {
              open: {
                  width: '15rem',
                  transition: {
                      damping: 40
                  }
              },
              closed: {
                  width: '4rem',
                  transition: {
                      damping: 40
                  }
              }
          };

    useEffect(() => {
        if (isTab || isMd) {
            setIsOpen(false);
        } else {
            setIsOpen(true);
        }
    }, [isTab, isMd]);

    useEffect(() => {
        const activeLink = navigationOptions?.find((link) => link.href === pathName);
        setActiveTab(activeLink?.id || null);
    }, [pathName, navigationOptions]);

    const handleTabClick = (tabId: string) => {
        setActiveTab(tabId);
    };

    const handleCreateRoute = () => {
        if (workSpaceTitle === 'Social Media') {
            router.push('/social/social-media/create-post');
        } else return;
    };

    return (
        <motion.div
            initial={{ x: isTab ? -250 : 0 }}
            variants={Sidebar_animation}
            animate={isOpen ? 'open' : 'closed'}
            className="bg-white flex  flex-col justify-between border-l border-r h-full z-40 w-60 top-[63px] fixed"
        >
            <div
                className={`${isOpen ? 'p-4' : 'py-4 px-2 items-center'} flex flex-col  h-full overflow-y-auto flex-1`}
            >
                {(workSpaceTitle === 'Url Shortener' || workSpaceTitle === 'Social Media') && (
                    <>
                        {isOpen ? (
                            <div className="w-full">
                                {workSpaceTitle === 'Social Media' ? (
                                    <Link href={'/social/social-media/create-post'}>
                                        <p className="bg-primary-0 text-xs rounded h-8 flex items-center justify-center text-white font-medium">
                                            Create Posts
                                        </p>
                                    </Link>
                                ) : (
                                    <UrlShortenerActionsFeatures />
                                )}
                            </div>
                        ) : (
                            <div className="bg-primary-0 cursor-pointer w-6 h-6 rounded-full flex justify-center items-center text-white">
                                <TooltipProvider delayDuration={0}>
                                    <Tooltip>
                                        <TooltipTrigger onClick={handleCreateRoute}>
                                            <Plus size={16} />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <Label className="font-light text-xs">
                                                {workSpaceTitle === 'Social Media' ? 'Create Posts' : 'Create New'}
                                            </Label>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        )}
                    </>
                )}

                <ul className={`flex flex-col  ${isOpen ? '' : ''} mt-[14px] gap-1 w-full `}>
                    {navigationOptions?.map((data) => (
                        <li
                            key={data.id}
                            className={`w-full ${data.id === '5' && module === 'url' ? 'border-b pb-[14px]' : data.id === '6' && module === 'url' ? 'mt-2' : ''}  ${(data.id === '8' && module === 'social') || (data.id === '11' && module === 'social') ? 'border-b pb-[14px]' : data.id === '8' && module === 'social' ? 'mt-2' : ''} `}
                            onClick={() => {
                                if (data.key === 'sign-out') {
                                    handleLogout();
                                }
                            }}
                        >
                            <Link href={data.href} shallow>
                                <div
                                    className={`flex hover:bg-[#E8EFFF] hover:text-primary-0 items-center  h-[34px] rounded hover:text-primary ${
                                        isOpen ? 'justify-start gap-x-3 px-3' : 'justify-center'
                                    } ${activeTab === data.id ? 'bg-[#E8EFFF] text-primary-0' : 'text-[#433E3F]'} `}
                                    onClick={() => handleTabClick(data.id)}
                                >
                                    {isOpen ? (
                                        <>
                                            <div>{data.icon}</div>
                                            <p className={`text-xs font-normal ${isOpen ? 'flex' : 'hidden'}`}>
                                                {data.title}
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <TooltipProvider delayDuration={0}>
                                                <Tooltip>
                                                    <TooltipTrigger>{data.icon}</TooltipTrigger>
                                                    <TooltipContent>
                                                        <Label className="font-light text-xs">{data.title}</Label>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </>
                                    )}
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <Modal
                showModel={showModal}
                setShowModal={setShowModal}
                onClose={() => setShowModal(false)}
                className={`relative max-w-lg`}
                showCloseIcon
            >
                <CreateWorkSpace />
            </Modal>
            <div className="pb-[63px] ">
                <HeaderSideNav isOpen={isOpen} openCreateWorkSpace={() => setShowModal(true)} setIsOpen={setIsOpen} />
            </div>
        </motion.div>
    );
}
