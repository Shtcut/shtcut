import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
    Separator
} from '@shtcut-ui/react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react';

const ManagePostAction = ({ openSchedule }: { openSchedule: () => void }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <DropdownMenu onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <div className="h-9 font-medium cursor-pointer hover:border-none hover:bg-none flex items-center py-2 text-white text-xs gap-2 bg-primary-0 rounded px-2">
                    Manage Post
                    <Separator orientation="vertical" />
                    {isOpen ? <ChevronUp color="white" size={16} /> : <ChevronDown color="white" size={16} />}
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-36 right-6 relative cursor-pointer">
                <DropdownMenuCheckboxItem className="p-2 hover:text-primary-0 flex text-xs items-center gap-x-2 cursor-pointer">
                    Post Now
                </DropdownMenuCheckboxItem>

                <DropdownMenuCheckboxItem
                    className="p-2 flex text-xs items-center gap-x-2 cursor-pointer"
                    onClick={openSchedule}
                >
                    Schedule Post
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ManagePostAction;
