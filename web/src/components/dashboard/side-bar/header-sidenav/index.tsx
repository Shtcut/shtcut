'use client';

import * as React from 'react';
import {
    Button,
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
    Separator,
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '@shtcut-ui/react';
import { Plus, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { Progress } from '@shtcut/components/_shared/Progress-bar';
import { getInitials } from '@shtcut/_shared/constant';
import { FullPageLoader } from '@shtcut/components/windows-loading';
import { useWorkspaceData } from '@shtcut/hooks/workspace/workspacedata';
import InitialsAvatar from '@shtcut/components/initial-avatar';
import { truncate, truncateText } from '@shtcut/_shared';

const HeaderSideNav = ({
    isOpen,
    setIsOpen,
    openCreateWorkSpace
}: {
    isOpen: boolean;
    setIsOpen: (val: boolean) => void;
    openCreateWorkSpace: () => void;
}) => {
    const {
        findAllWorkspacesResponse,
        switchWorkspaceLoading,
        triggerSwitchWorkspace,
        triggerWorkspaces,
        activeWorkspaceName
    } = useWorkspaceData();

    const [open, setOpen] = React.useState(false);

    const handleToggle = () => {
        setOpen(!open);
    };

    const handleSwitchWorkspace = (workspaceSlug: string, workspaceId: string) => {
        if (workspaceSlug && workspaceId) {
            triggerSwitchWorkspace(workspaceId);
            triggerWorkspaces();
        }
    };

    return (
        <>
            {switchWorkspaceLoading ? (
                <FullPageLoader />
            ) : (
                <div
                    className={`border-t flex w-full ${isOpen ? 'flex-row h-14 ' : 'flex-col items-center justify-center'} `}
                >
                    <div className={`w-full flex ${isOpen ? 'justify-start' : 'justify-center'}  items-center`}>
                        <DropdownMenu onOpenChange={handleToggle}>
                            <DropdownMenuTrigger asChild>
                                <div
                                    className={` cursor-pointer flex  items-center ${isOpen ? 'pl-5 justify-between' : ' justify-center'} `}
                                >
                                    <div
                                        className={`flex items-center justify-center ${isOpen ? 'space-x-[16px]' : ''}`}
                                    >
                                        <div className="py-4 ">
                                            <InitialsAvatar name={activeWorkspaceName ?? 'NN'} />
                                        </div>
                                        {isOpen && (
                                            <div>
                                                <TooltipProvider>
                                                    <Tooltip delayDuration={0}>
                                                        <TooltipTrigger asChild>
                                                            <p className="font-bold">
                                                                {truncateText(activeWorkspaceName ?? '', 10)}
                                                            </p>
                                                        </TooltipTrigger>
                                                        <TooltipContent side="top">
                                                            <span className="text-xs"> {activeWorkspaceName}</span>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                                <p className="text-[#83899F] text-xs ">Workspace</p>
                                            </div>
                                        )}
                                    </div>{' '}
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-60  rounded-[10px] relative left-12 p-0">
                                <section className="bg-primary-0 p-4 rounded-[10px]">
                                    <div className="flex items-center justify-between">
                                        <div className="flex text-white items-center space-x-2">
                                            <InitialsAvatar name={activeWorkspaceName ?? 'NN'} />
                                            <TooltipProvider>
                                                <Tooltip delayDuration={0}>
                                                    <TooltipTrigger asChild>
                                                        <p className="font-bold">
                                                            {truncateText(activeWorkspaceName ?? '', 10)}
                                                        </p>
                                                    </TooltipTrigger>
                                                    <TooltipContent side="bottom">
                                                        <span className="text-xs"> {activeWorkspaceName}</span>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </div>
                                        <p className="text-xs font-medium text-white">Manage</p>
                                    </div>
                                    <div className="bg-white rounded-[10px] pb-3 mt-4 px-2">
                                        <div className="flex justify-between cursor-pointer items-center py-3">
                                            <Button className="w-[52px] h-[24px] rounded-[10px] text-xs">Team</Button>
                                            <p className="text-[#2B2829] text-xs font-semibold">2 of 10 seats used</p>
                                        </div>
                                        <Progress className="bg-[#D6F9D8] h-[6px]" value={33} />
                                    </div>
                                </section>
                                <div className="flex flex-col gap-4 p-4">
                                    {findAllWorkspacesResponse &&
                                        findAllWorkspacesResponse?.map((data) => (
                                            <section
                                                key={data?._id}
                                                className="flex items-center gap-x-2 cursor-pointer"
                                                onClick={() => {
                                                    if (data?.name) {
                                                        handleSwitchWorkspace(data.slug, data?._id);
                                                    }
                                                }}
                                            >
                                                <InitialsAvatar name={data?.name} />
                                                <div>
                                                    <p className="text-xs">{data?.name}</p>
                                                    <p className="text-[#726C6C] text-xs">
                                                        {data?.type} * {data?.members?.length} members
                                                    </p>
                                                </div>
                                            </section>
                                        ))}
                                    <DropdownMenuCheckboxItem
                                        onClick={openCreateWorkSpace}
                                        className=" flex  items-center gap-x-2 text-xs mt-2 font-semibold text-[#433E3F] p-2 cursor-pointer"
                                    >
                                        <Plus size={16} /> Add New Workspace
                                    </DropdownMenuCheckboxItem>
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <Separator orientation={isOpen ? 'vertical' : 'horizontal'} />
                    <div
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-20 py-3 cursor-pointer flex justify-center items-center"
                    >
                        <ArrowLeft size={16} />
                    </div>
                </div>
            )}
        </>
    );
};
export default HeaderSideNav;
