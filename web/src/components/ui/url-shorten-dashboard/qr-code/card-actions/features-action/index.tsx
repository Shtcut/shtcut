'use client';

import * as React from 'react';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@shtcut-ui/react';
import { IoEllipsisVerticalSharp } from 'react-icons/io5';
import { Trash2 } from 'lucide-react';
import { BarChart2 } from 'lucide-react';
import { PencilLine } from 'lucide-react';

const FeatureActions = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="border-none cursor-pointer focus:border-none outline-none">
                    <IoEllipsisVerticalSharp />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-36 relative right-8">
                <DropdownMenuCheckboxItem className="p-2 hover:text-primary-0 flex text-xs items-center gap-x-2">
                    <PencilLine size={16} /> Edit QR Code
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem className="p-2 hover:text-primary-0 flex text-xs items-center gap-x-2">
                    <BarChart2 size={16} /> Analytics
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem className="p-2 flex text-xs items-center gap-x-2">
                    <Trash2 size={16} /> Delete
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
export default FeatureActions;
