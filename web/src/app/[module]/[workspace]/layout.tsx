'use client';

import {
    Button,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CommonProps,
    Input,
    Label,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Separator,
    Skeleton,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    Textarea
} from '@shtcut-ui/react';
import { LayoutHeader, Logo, NavLink, TopNav, WorkspaceSwitcher } from '@shtcut/components';
import { Feedback } from '@shtcut/components/_shared/Feedback';
import { Notifications } from '@shtcut/components/_shared/Notifications';
import Sidebar from '@shtcut/components/_shared/SideBar';
import { UserNav } from '@shtcut/components/_shared/UserNav';
import { IconMail } from '@tabler/icons-react';
import { ArrowRightIcon, BarChart, Package2Icon, SearchIcon, Table, XIcon } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ReactNode, Suspense, useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
// import { ResponsiveScatterPlot } from "@nivo/scatterplot"
// import { ResponsiveLine } from "@nivo/line"
// import { ResponsivePie } from "@nivo/pie"

interface WorkspaceLayoutProps extends CommonProps {
    header?: ReactNode | ReactNode[];
}

const WorkspaceLayout = ({ children, header }: WorkspaceLayoutProps) => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const params = useParams();

    return (
        <div className="relative w-full h-full overflow-hidden bg-white">
            {/* <Sidebar module={params.module as string} workspace={params.workspace as string} /> */}
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
