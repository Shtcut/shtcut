import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@shtcut-ui/react';
import { PencilLine, Trash2 } from 'lucide-react';
import React from 'react';
import { IoEllipsisVerticalSharp } from 'react-icons/io5';

const ActionsTable = () => {
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="border-none cursor-pointer focus:border-none outline-none">
                        <IoEllipsisVerticalSharp />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-24 right-6 relative">
                    <DropdownMenuCheckboxItem className="p-2 hover:text-primary-0 flex text-xs items-center gap-x-2">
                        <PencilLine size={16} /> Edit API Key
                    </DropdownMenuCheckboxItem>

                    <DropdownMenuCheckboxItem className="p-2 flex text-xs items-center gap-x-2">
                        <Trash2 size={16} /> Delete
                    </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default ActionsTable;
