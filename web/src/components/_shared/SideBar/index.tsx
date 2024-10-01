'use client';

import { Button, cn } from '@shtcut-ui/react';
import { CommonOptions } from 'child_process';
import { useEffect, useState } from 'react';
import { Layout, LayoutHeader } from '../index';
import { IconChevronLeft, IconMenu2, IconX } from '@tabler/icons-react';
import { Nav } from '../Nav';
import { sideLinks } from '@shtcut/_shared/data/side-links';

interface SidebarProps extends CommonOptions, React.HtmlHTMLAttributes<HTMLElement> {
    workspace: string;
    module: string;
    isCollapsed?: boolean;
    setIsCollapsed?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar(props: SidebarProps) {
    const { workspace, module,  className, isCollapsed = true } = props;

    const [navOpened, setNavOpened] = useState(false);

    const navs = sideLinks(module, workspace);

    useEffect(() => {
        if (navOpened) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }, [navOpened]);

    return (
        <aside
            className={cn(
                `fixed left-0 right-0 top-0 z-50 w-full border-r-2 border-r-muted transition-[width] md:bottom-0 md:right-auto md:h-svh ${
                    isCollapsed ? 'md:w-14' : 'md:w-664'
                }`,
                className
            )}
        >
            <div
                onClick={() => setNavOpened(false)}
                className={`absolute inset-0 transition-[opacity] delay-100 duration-700 ${
                    navOpened ? 'h-svh opacity-50' : 'h-0 opacity-0'
                } w-full bg-black md:hidden`}
            />
            <Layout>
                <LayoutHeader className="sticky top-0 justify-between px-4 py-3 shadow md:px-4">
                    <div className={`flex items-center ${!isCollapsed ? 'gap-2' : ''}`}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 256 256"
                            className={`transition-all ${isCollapsed ? 'h-6 w-6' : 'h-8 w-8'}`}
                        >
                            <rect width="256" height="256" fill="none"></rect>
                            <line
                                x1="208"
                                y1="128"
                                x2="128"
                                y2="208"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="16"
                            ></line>
                            <line
                                x1="192"
                                y1="40"
                                x2="40"
                                y2="192"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="16"
                            ></line>
                            <span className="sr-only">Website Name</span>
                        </svg>
                        <div
                            className={`flex flex-col justify-end truncate ${
                                isCollapsed ? 'invisible w-0' : 'visible w-auto'
                            }`}
                        >
                            <span className="font-medium">Shadcn Admin</span>
                            <span className="text-xs">Vite + ShadcnUI</span>
                        </div>
                    </div>

                    {/* Toggle Button in mobile */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        aria-label="Toggle Navigation"
                        aria-controls="sidebar-menu"
                        aria-expanded={navOpened}
                        onClick={() => setNavOpened((prev) => !prev)}
                    >
                        {navOpened ? <IconX /> : <IconMenu2 />}
                    </Button>
                </LayoutHeader>
                <Nav
                    id="sidebar-menu"
                    className={`h-full flex-1 overflow-auto ${
                        navOpened ? 'max-h-screen' : 'max-h-0 py-0 md:max-h-screen  md:py-2'
                    }`}
                    closeNav={() => setNavOpened(false)}
                    isCollapsed={isCollapsed}
                    links={navs}
                />
                <Button
                    size="icon"
                    variant="outline"
                    className="absolute -right-5 top-1/2 hidden rounded-full md:inline-flex"
                >
                    <IconChevronLeft stroke={1.5} className={`h-5 w-5 ${isCollapsed ? 'rotate-180' : ''}`} />
                </Button>
            </Layout>
        </aside>
    );
}
