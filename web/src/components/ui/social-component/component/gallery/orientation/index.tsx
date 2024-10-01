import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@shtcut-ui/react';
import React from 'react';
import { ChevronDown } from 'lucide-react';

const OrientationAction = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="border-none cursor-pointer focus:border-none flex items-center justify-center gap-x-1 outline-none">
                    <p className="text-xs font-medium">All orientations</p> <ChevronDown size={16} />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-36 right-6 relative cursor-pointer">
                {/* <DropdownMenuCheckboxItem className="p-2 hover:text-primary-0 flex text-xs items-center gap-x-2 cursor-pointer">
                  <PencilLine size={16} /> Edit Link
              </DropdownMenuCheckboxItem> */}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default OrientationAction;
