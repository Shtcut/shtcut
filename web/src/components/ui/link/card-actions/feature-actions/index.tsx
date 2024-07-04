'use client';

import * as React from 'react';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@shtcut-ui/react';
import { IoEllipsisVerticalSharp } from 'react-icons/io5';
import { Trash2 } from 'lucide-react';
import { PiFolders } from 'react-icons/pi';
import { Archive } from 'lucide-react';
import { FiShare2 } from 'react-icons/fi';
import { PencilLine } from 'lucide-react';
import { PiQrCodeBold } from 'react-icons/pi';

const FeatureActions = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="border-none cursor-pointer focus:border-none outline-none">
                    <IoEllipsisVerticalSharp />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-36 ">
                <DropdownMenuCheckboxItem className="p-2 hover:text-primary-0 flex text-sm items-center gap-x-2">
                    <PencilLine size={16} /> Edit Link
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem className="p-2 hover:text-primary-0 flex text-sm items-center gap-x-2">
                    <PiQrCodeBold size={16} /> QR Code
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem className="p-2 flex text-sm items-center gap-x-2">
                    <PiFolders size={16} /> Duplicate
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem className="p-2 flex text-sm items-center gap-x-2">
                    <Archive size={16} /> Archive
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem className="p-2 flex text-sm items-center gap-x-2">
                    <FiShare2 size={16} /> Share
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem className="p-2 flex text-sm items-center gap-x-2">
                    <Trash2 size={16} /> Delete
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
export default FeatureActions;
