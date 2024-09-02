'use client';

import * as React from 'react';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@shtcut-ui/react';
import { IoEllipsisVerticalSharp } from 'react-icons/io5';
import { Trash2, Settings, Archive, PencilLine } from 'lucide-react';

const FeatureActions = ({ handleModalCn }: { handleModalCn: (open: boolean) => void }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="border-none cursor-pointer focus:border-none outline-none">
                    <IoEllipsisVerticalSharp />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-36 right-6 relative">
                <DropdownMenuCheckboxItem
                    className="p-2 hover:text-primary-0 hover:bg-primary-0 flex text-xs items-center gap-x-2"
                    onClick={() => handleModalCn(true)}
                >
                    <Settings size={16} /> Configuration
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem className="p-2 hover:text-primary-0 flex text-xs items-center gap-x-2">
                    <PencilLine size={16} /> Edit Link
                </DropdownMenuCheckboxItem>

                <DropdownMenuCheckboxItem className="p-2 flex text-xs items-center gap-x-2">
                    <Archive size={16} /> Archive
                </DropdownMenuCheckboxItem>

                <DropdownMenuCheckboxItem className="p-2 flex text-xs items-center gap-x-2">
                    <Trash2 size={16} /> Delete
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default FeatureActions;
