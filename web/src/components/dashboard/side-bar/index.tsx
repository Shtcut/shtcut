'use client';
import { useMediaQuery } from 'react-responsive';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { sideLinks } from '@shtcut/_shared/data/side-links';
import { useParams, usePathname } from 'next/navigation';
import HeaderSideNav from './header-sidenav';
import { Button, Label, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@shtcut-ui/react';
import { Plus } from 'lucide-react';

type Props = {
    setIsOpen: (val: boolean) => void;
    isOpen: boolean;
    isTab: boolean;
    workSpaceTitle?: string;
};

export default function SideBar({ isOpen, isTab, setIsOpen, workSpaceTitle }: Props) {
    const params = useParams();
    const pathName = usePathname();
    const { module, workspace } = params;
    const navigationOptions = sideLinks(module as string, workspace as string);
    const isMd = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
    const [activeTab, setActiveTab] = useState<string | null>(null);

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
        const activeLink = navigationOptions.find((link) => link.href === pathName);
        setActiveTab(activeLink?.id || null);
    }, [pathName, navigationOptions]);

    const handleTabClick = (tabId: string) => {
        setActiveTab(tabId);
    };

    return (
        <motion.div
            initial={{ x: isTab ? -250 : 0 }}
            variants={Sidebar_animation}
            animate={isOpen ? 'open' : 'closed'}
            className="bg-white flex flex-col justify-between border-l border-r h-full z-40 w-60 fixed"
        >
            <div className={`${isOpen ? 'p-4' : 'py-4 px-2 items-center'} flex flex-col  `}>
                {workSpaceTitle === 'Url Shortener' && (
                    <>
                        {isOpen ? (
                            <Button className="bg-primary-0 text-xs rounded h-8">Create New</Button>
                        ) : (
                            <div className="bg-primary-0 cursor-pointer w-6 h-6 rounded-full flex justify-center items-center text-white">
                                <TooltipProvider delayDuration={0}>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Plus size={16} />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <Label className="font-light text-xs">Create New</Label>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        )}
                    </>
                )}

                <ul className={`flex flex-col  ${isOpen ? '' : ''} mt-[14px] gap-1 w-full `}>
                    {navigationOptions.map((data) => (
                        <li key={data.id} className="w-full">
                            <Link href={data.href}>
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
            <div className="pb-[63px] ">
                <HeaderSideNav isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
        </motion.div>
    );
}
