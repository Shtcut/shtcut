import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
    Separator
} from '@shtcut-ui/react';
import { ChevronDown, ChevronUp, VideoIcon } from 'lucide-react';
import React, { useState } from 'react';
import { Image as ImageIcon, Folder, Smile, Video, Hash, X } from 'lucide-react';
import { FaUnsplash } from 'react-icons/fa';
const ManageMedia = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <div className="h-9 font-medium cursor-pointer hover:border-none hover:bg-none flex items-center py-2 text-white text-xs gap-2 bg-primary-0 rounded px-2">
                    Manage Media
                    <Separator orientation="vertical" />
                    {isOpen ? <ChevronUp color="white" size={16} /> : <ChevronDown color="white" size={16} />}
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-36 right-6 relative cursor-pointer">
                <DropdownMenuCheckboxItem className="p-2 hover:text-primary-0 flex text-xs items-center gap-x-2 cursor-pointer">
                    <ImageIcon size={14} /> Upload image
                </DropdownMenuCheckboxItem>

                <DropdownMenuCheckboxItem className="p-2 flex text-xs items-center gap-x-2 cursor-pointer">
                    <VideoIcon size={14} /> Upload Video
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem className="p-2 flex text-xs items-center gap-x-2 cursor-pointer">
                    <Folder size={14} /> Upload Files
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem className="p-2 flex text-xs items-center gap-x-2 cursor-pointer">
                    <FaUnsplash size={14} /> Unsplash
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ManageMedia;
