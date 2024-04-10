'use client';

import { Button, CommonProps, Separator, Skeleton, cn } from '@shtcut-ui/react';
import { Logo, NavLink, WorkspaceSwitcher } from '@shtcut/components';
import { Feedback } from '@shtcut/components/_shared/Feedback';
import { Notifications } from '@shtcut/components/_shared/Notifications';
import { UserNav } from '@shtcut/components/_shared/UserNav';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { ReactNode, Suspense, useState } from 'react';
import { sideLinks } from '@shtcut/_shared/data/side-links';
import Head from 'next/head';

interface WorkspaceLayoutProps extends CommonProps {
    header?: ReactNode | ReactNode[];
}

const WorkspaceLayout = ({ children }: WorkspaceLayoutProps) => {
    const params = useParams();
    const pathname = usePathname();

    const { module, workspace } = params;

    const navigationOptions = sideLinks(module as string, workspace as string);

    return (
        <body className="bg-white">
            <section className="container fixed left-0 z-50 right-0 top-0 bg-background">
                <div className=" flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-2">
                            <Logo />
                        </span>
                        <span>/</span>
                        <WorkspaceSwitcher />
                    </div>
                    <div className="flex items-center gap-4">
                        <Feedback />

                        <Separator orientation="vertical" className="h-5" />

                        <nav className="flex items-center space-x-6">
                            <NavLink className="text-xs font-normal" href="/examples/dashboard">
                                Changelog
                            </NavLink>
                            <NavLink className="text-xs font-normal" href="/examples/dashboard">
                                Help
                            </NavLink>
                            <NavLink className="text-xs font-normal" href="/examples/dashboard">
                                Docs
                            </NavLink>
                        </nav>
                        <Separator orientation="vertical" className="h-5" />

                        <Notifications />

                        <Suspense fallback={<Skeleton className="h-8 w-8 rounded-full" />}>
                            <UserNav />
                        </Suspense>
                    </div>
                </div>
                <div className=" bg-white ">
                    <div className="border-b mt-5  mb-0">
                        <div className="items-stretch flex gap-10 overflow-x-scroll mt-4 md:mt:0">
                            {navigationOptions.map(({ href, title }, index) => (
                                <Link
                                    href={href}
                                    className={cn(
                                        'h-8 hover:text-foreground/80 transition-colors text-sm',
                                        href === `${pathname}`
                                            ? 'border-b-2 border-foreground text-foreground hover:text-foreground'
                                            : 'text-foreground/50'
                                    )}
                                    key={index}
                                >
                                    {title}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <div className="my-32">{children}</div>
        </body>
    );
};

export default WorkspaceLayout;
