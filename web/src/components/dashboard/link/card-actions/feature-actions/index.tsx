'use client';

import * as React from 'react';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@shtcut-ui/react';
import { IoEllipsisVerticalSharp } from 'react-icons/io5';
import { PiFolders, PiQrCodeBold } from 'react-icons/pi';
import { Archive, PencilLine, Trash2 } from 'lucide-react';
import { FiShare2 } from 'react-icons/fi';

import { RiLineChartLine } from 'react-icons/ri';

const FeatureActions = ({ onClickNavigation }: { onClickNavigation: () => void }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="border-none cursor-pointer focus:border-none outline-none">
                    <IoEllipsisVerticalSharp />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-36 right-6 relative cursor-pointer">
                <DropdownMenuCheckboxItem className="p-2 hover:text-primary-0 flex text-xs items-center gap-x-2 cursor-pointer">
                    <PencilLine size={16} /> Edit Link
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem className="p-2 hover:text-primary-0 flex text-xs items-center gap-x-2 cursor-pointer">
                    <PiQrCodeBold size={16} /> QR Code
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    className="p-2 flex text-xs items-center gap-x-2 cursor-pointer"
                    onClick={onClickNavigation}
                >
                    <RiLineChartLine size={16} /> Analytics
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem className="p-2 flex text-xs items-center gap-x-2 cursor-pointer">
                    <PiFolders size={16} /> Duplicate
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem className="p-2 flex text-xs items-center gap-x-2 cursor-pointer">
                    <Archive size={16} /> Archive
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem className="p-2 flex text-xs items-center gap-x-2 cursor-pointer">
                    <FiShare2 size={16} /> Share
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem className="p-2 flex text-xs items-center gap-x-2 cursor-pointer">
                    <Trash2 size={16} /> Delete
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
export default FeatureActions;
