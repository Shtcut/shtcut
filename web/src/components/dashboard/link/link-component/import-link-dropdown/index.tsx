import React from 'react';

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
    Separator
} from '@shtcut-ui/react';
import { Archive, Download } from 'lucide-react';
import Image from 'next/image';
import { IoEllipsisVerticalSharp } from 'react-icons/io5';

const ImportLinkDropDown = ({ handleNavigateToArchive }: { handleNavigateToArchive: () => void }) => {
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="flex border   hover:bg-primary-0 rounded-md justify-center hover:text-white shadow-none font-normal w-11 h-9 text-[#5A5555] cursor-pointer items-center bg-white gap-x-2 ">
                        <div>
                            <IoEllipsisVerticalSharp size={18} />
                        </div>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-fit h-fit  right-6 relative cursor-pointer">
                    <DropdownMenuCheckboxItem
                        className=" hover:text-primary-0 flex  text-xs items-center gap-x-2 p-2 cursor-pointer h-fit "
                        onClick={handleNavigateToArchive}
                    >
                        <Archive size={16} /> View all Archive
                    </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default ImportLinkDropDown;
