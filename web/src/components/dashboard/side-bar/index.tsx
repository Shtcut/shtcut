import { useMediaQuery } from 'react-responsive';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { sideLinks } from '@shtcut/_shared/data/side-links';
import { useParams } from 'next/navigation';
import HeaderSideNav from './header-sidenav';
import { Label, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@shtcut-ui/react';
import { FaLongArrowAltRight } from 'react-icons/fa';

type Props = {
    setIsOpen: (val: boolean) => void;
    isOpen: boolean;
    isTab: boolean;
};

export default function SideBar({ isOpen, isTab, setIsOpen }: Props) {
    const params = useParams();
    const { module, workspace } = params;
    const navigationOptions = sideLinks(module as string, workspace as string);
    const isMd = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
    const [activeTab, setActiveTab] = useState('1');

    const Sidebar_animation = isTab
        ? {
              //mobile view
              open: {
                  x: 0,
                  width: '17rem',
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
              //system view sidebar
              open: {
                  width: '17rem',
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
    //System view

    useEffect(() => {
        if (isTab || isMd) {
            setIsOpen(false);
        } else {
            setIsOpen(true);
        }
    }, [isTab, isMd]);

    const handleTabClick = (tabId: string) => {
        setActiveTab(tabId);
    };
    return (
        <div className="  z-30 relative  border-gray-400">
            <motion.div
                initial={{ x: isTab ? -250 : 0 }}
                variants={Sidebar_animation}
                animate={isOpen ? 'open' : 'closed'}
                className={`text-gray   w-[17rem] max-w-[18rem] bg-white   top-0  bottom-0 fixed    bg-card text-card-foreground `}
            >
                <div className="flex w-full pt-14 pb-4 h-screen overflow-y-auto justify-between flex-col">
                    <div className="flex-1">
                        <HeaderSideNav isOpen={isOpen} />
                        <ul className="whitespace-pre pt-6  text-[0.9rem]  flex flex-col gap-1  scrollbar-thin scrollbar-track-red scrollbar-thumb-blue-100 h-[70%] md:max-h-[68%]">
                            <li className={` ${isOpen ? 'mx-2' : ''}`}>
                                {navigationOptions.map((data) => (
                                    <Link
                                        href={data.href}
                                        key={data.title}
                                        className=""
                                        onClick={() => handleTabClick(data.id)}
                                    >
                                        <div className={`${data.id === '7' ? 'border-t mt-6' : ''}`}>
                                            {isOpen && (
                                                <>
                                                    {data.id === '7' && (
                                                        <p className="px-6 pt-4 text-sm text-[#83899F] font-normal">
                                                            Preferences
                                                        </p>
                                                    )}
                                                </>
                                            )}
                                            <div
                                                className={`flex hover:bg-primary-0 hover:text-white items-center my-1 mx-2 py-3  rounded-[12px]  hover:text-primary  ${
                                                    isOpen ? ' justify-start gap-x-3 px-3' : 'justify-center'
                                                }  ${activeTab === data.id ? 'bg-primary-0 text-white' : 'text-[#433E3F]'}  `}
                                            >
                                                {isOpen ? (
                                                    <>
                                                        <div className="">{data.icon}</div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <TooltipProvider delayDuration={0}>
                                                            <Tooltip>
                                                                <TooltipTrigger>{data.icon}</TooltipTrigger>
                                                                <TooltipContent className="">
                                                                    <Label className="font-light">{data.title}</Label>
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        </TooltipProvider>
                                                    </>
                                                )}

                                                <div>
                                                    {!isMd && (
                                                        <p
                                                            className={`text-sm font-normal  ${isOpen ? 'flex' : 'hidden'}`}
                                                        >
                                                            {data.title}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </li>
                        </ul>
                    </div>
                    <div className="hidden lg:flex justify-end items-end px-6">
                        <div
                            onClick={() => setIsOpen(!isOpen)}
                            className={`${
                                isOpen ? '' : 'transform rotate-180'
                            }    justify-center items-center   cursor-pointer    rounded-full md:flex hidden `}
                        >
                            <FaLongArrowAltRight size={20} />
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
