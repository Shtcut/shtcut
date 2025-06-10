import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@shtcut-ui/react';
import { PencilLine, Trash2 } from 'lucide-react';
import React from 'react';
import { IoCopyOutline, IoEllipsisVerticalSharp } from 'react-icons/io5';
import { PiQrCodeBold } from 'react-icons/pi';

const LinkBioCardActions = ({
    onDeleteShowModal,
    handleCopy,
    handleEdit,
    handleShowQr
}: {
    onDeleteShowModal: () => void;
    handleCopy: () => void;
    handleEdit: () => void;
    handleShowQr: () => void;
}) => {
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="border-none cursor-pointer focus:border-none outline-none">
                        <IoEllipsisVerticalSharp />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-36 right-6 relative cursor-pointer">
                    <DropdownMenuCheckboxItem
                        className="p-2 hover:text-primary-0 flex text-xs items-center gap-x-2 cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleEdit();
                        }}
                    >
                        <PencilLine size={16} /> Edit Link
                    </DropdownMenuCheckboxItem>

                    <DropdownMenuCheckboxItem
                        onClick={(e) => {
                            e.stopPropagation();
                            handleCopy();
                        }}
                        className="p-2 flex text-xs items-center gap-x-2 cursor-pointer"
                    >
                        <IoCopyOutline size={16} /> Copy
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                        onClick={(e) => {
                            e.stopPropagation();
                            handleShowQr();
                        }}
                        className="p-2 flex text-xs items-center gap-x-2 cursor-pointer"
                    >
                        <PiQrCodeBold size={16} /> Qr Code
                    </DropdownMenuCheckboxItem>

                    <DropdownMenuCheckboxItem
                        onClick={(e) => {
                            e.stopPropagation();
                            onDeleteShowModal();
                        }}
                        className="p-2 flex text-xs items-center gap-x-2 cursor-pointer"
                    >
                        <Trash2 size={16} /> Delete
                    </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default LinkBioCardActions;
