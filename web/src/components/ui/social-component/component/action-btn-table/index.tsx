import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@shtcut-ui/react';
import { PencilLine, Trash2 } from 'lucide-react';
import React from 'react';
import { IoEllipsisVerticalSharp } from 'react-icons/io5';

const ActionPostBtn = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="border-none cursor-pointer focus:border-none outline-none">
                    <IoEllipsisVerticalSharp />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-36 right-6 relative cursor-pointer">
                <DropdownMenuCheckboxItem className="p-2 hover:text-primary-0 flex text-xs items-center gap-x-2 cursor-pointer">
                    <PencilLine size={16} /> Edit Post
                </DropdownMenuCheckboxItem>

                <DropdownMenuCheckboxItem className="p-2 flex text-xs items-center gap-x-2 cursor-pointer">
                    <Trash2 size={16} /> Delete Post
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ActionPostBtn;
