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

interface WorkspaceLayoutProps extends CommonProps {
    header?: ReactNode | ReactNode[];
}

const WorkspaceLayout = ({ children, header }: WorkspaceLayoutProps) => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const params = useParams();
    const pathname = usePathname();

    const { module, workspace } = params;

    const navigationOptions = sideLinks(module as string, workspace as string);

    return (
        <div className="relative w-full h-full overflow-hidden bg-white">
            <main
                id="content"
                className={`overflow-x-hidden pt-16 transition-[margin] mx-auto  md:overflow-y-hidden w-full md:pt-0 h-full`}
            >
                {header ? (
                    header
                ) : (
                    <div className="container z-40 bg-background flex items-center justify-between mt-4 border-b px-6 w-full">
                        <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-2">
                                <Logo />
                            </span>
                            <span>/</span>
                            <WorkspaceSwitcher />
                            <Button className="bg-gradient-to-tr from-rose-500 to-fuchsia-600 rounded-full via-pink-600 hover:to-rose-500 hover:from-fuchsia-600 hover:via-pink-600 transition-all">
                                Upgrade
                            </Button>
                        </div>

                        <div className="">
                            <div className="items-stretch flex gap-10 overflow-x-scroll mt-4 md:mt-0">
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
                )}
                {children}
            </main>
        </div>
    );
};

export default WorkspaceLayout;
