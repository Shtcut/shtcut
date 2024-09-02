'use client';

import * as React from 'react';
import {
    Button,
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@shtcut-ui/react';
import { IoEllipsisVerticalSharp } from 'react-icons/io5';
import { Trash2, ArrowLeftRight } from 'lucide-react';

export function ActionsTable({ onOpenRole, onOpenDelete }: { onOpenRole: () => void; onOpenDelete: () => void }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={'unstyled'} className="border-none focus:border-none outline-none">
                    <IoEllipsisVerticalSharp />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-44">
                <DropdownMenuCheckboxItem className="p-2 flex text-xs items-center gap-x-2" onClick={onOpenRole}>
                    <ArrowLeftRight size={16} /> Switch Role
                </DropdownMenuCheckboxItem>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem className="p-2 flex text-xs items-center gap-x-2" onClick={onOpenDelete}>
                    <Trash2 size={16} /> Remove Member
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
