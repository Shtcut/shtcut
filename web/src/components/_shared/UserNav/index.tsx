import {
    Avatar,
    AvatarImage,
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@shtcut-ui/react';
import { ChevronDown, ChevronUp } from 'lucide-react';

import { useSidebar } from '@shtcut/components/dashboard/side-bar-context';
import { useAuth } from '@shtcut/hooks';
import { useUser } from '@shtcut/hooks/user';
import { LogOut } from 'lucide-react';
import Link from 'next/link';
import { PanelRightOpen } from 'lucide-react';
import { useState } from 'react';

export const UserNav = () => {
    const { loggedInUserData } = useUser({ callLoggedInUser: true });
    const { handleLogout } = useAuth();
    const { data } = loggedInUserData;
    const { data: user } = data || {};
    const { toggleSidebar } = useSidebar();
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => setIsOpen(!isOpen);
    return (
        <DropdownMenu onOpenChange={handleToggle}>
            <DropdownMenuTrigger asChild>
                <div className="flex items-center w-[135px] p-0 bg-[#F7F7F7] space-x-1 h-[31px] cursor-pointer   rounded-full pr-2">
                    <div className="relative">
                        <div className="relative h-8 w-8 select-none rounded-full bg-primary/10">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={user?.avatar} alt="" />
                            </Avatar>
                        </div>
                        <div className="absolute top-6 right-0">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#15B097] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#15B097]"></span>
                            </span>
                        </div>
                    </div>
                    <p className="text-xs font-medium text-[#433E3F]">Uziel Renta</p>
                    {isOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-2">
                        <p className="text-sm font-medium leading-none">{user?.firstName + ' ' + user?.lastName}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild className="cursor-pointer">
                        <Link href="/settings">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="cursor-pointer">
                        <Link href="/settings/billing">Billing</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="cursor-pointer">
                        <Link href="/settings/keys">API Keys</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={toggleSidebar}>
                        <PanelRightOpen size={20} />
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" asChild onClick={handleLogout}>
                    <div className="flex items-center gap-2">
                        <LogOut className="w-4 h-4" />
                        <span>Sign out</span>
                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
