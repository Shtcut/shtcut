import React, { useState } from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { Edit, Trash, ArchiveIcon } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import axios from 'axios';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { Drawer } from 'vaul';
import { MenuDropdown } from '../MenuDropdown';

export const PopoverDesktop = ({ id, title, url, archived }) => {
    const [isArchived, setIsArchived] = useState(archived);
    const [openPopover, setOpenPopover] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);

    const handleToggleArchiving = async () => {
        setOpenPopover(false);
        setOpenDrawer(false);
        setIsArchived(!isArchived);
    };

    const handleDeleteLink = async () => {
        setOpenPopover(false);
        setOpenDrawer(false);
    };

    const closePopOver = () => {
        setOpenPopover(false);
    };

    const closeDrawer = () => {
        setOpenDrawer(false);
    };

    const deleteAlertProps = {
        action: handleDeleteLink,
        title: 'Delete Link?',
        desc: 'Are you sure you want to delete this link? This action cannot be undone.',
        confirmMsg: 'Yes, delete link',
        close: (!openPopover && closeDrawer) || (!openDrawer && closePopOver)
    };

    const archiveProps = {
        action: handleToggleArchiving,
        title: !isArchived ? 'Archive Link?' : 'Unarchive Link?',
        desc: !isArchived
            ? "Archived links will still work - they just won't show up on your main page."
            : 'By unarchiving this link, it will show up on your main page again.',
        confirmMsg: !isArchived ? 'Yes, archive' : 'Yes, unarchive',
        close: (!openPopover && closeDrawer) || (!openDrawer && closePopOver)
    };

    const mobilePopOverProps = {
        archiveProps,
        deleteAlertProps,
        title,
        id,
        url,
        archived,
        isArchived,
        closeDrawer
    };

    return (
        <PopoverPrimitive.Root open={openPopover} onOpenChange={setOpenPopover}>
            <PopoverPrimitive.Trigger className="">
                <MenuDropdown />
            </PopoverPrimitive.Trigger>
            <PopoverPrimitive.Portal>
                <PopoverPrimitive.Content
                    className="w-[120px] items-center rounded-md border border-gray-200 mr-2 bg-white drop-shadow-lg md:block lg:w-[150px]"
                    sideOffset={4}
                >
                    <Dialog.Root>
                        <Dialog.Trigger asChild>
                            <button className="group flex w-full items-center justify-between rounded-md p-3 text-sm font-medium text-gray-500 transition-all duration-75 hover:bg-gray-100">
                                <h4>Edit</h4>
                                <Edit size={17} color="gray" />
                            </button>
                        </Dialog.Trigger>
                        {/* <EditLinkModal
              close={closePopOver}
              id={id}
              title={title}
              url={url}
            /> */}
                    </Dialog.Root>
                    <AlertDialog.Root>
                        <AlertDialog.Trigger asChild>
                            <button className="group flex w-full items-center justify-between rounded-md p-3 text-sm font-medium text-gray-500 transition-all duration-75 hover:bg-gray-100">
                                <h4>{!isArchived ? 'Archive' : 'Unarchive'}</h4>
                                <ArchiveIcon size={17} color="gray" />
                            </button>
                        </AlertDialog.Trigger>
                        {/* <CustomAlert {...archiveProps} /> */}
                    </AlertDialog.Root>
                    <AlertDialog.Root>
                        <AlertDialog.Trigger asChild>
                            <button className="group flex w-full items-center justify-between rounded-md p-3 text-sm font-medium text-red-400 transition-all duration-75 hover:bg-red-500 hover:text-white">
                                <h4>Delete</h4>
                                <Trash size={17} className="text-b-400 hover:text-white" />
                            </button>
                        </AlertDialog.Trigger>
                        {/* <CustomAlert {...deleteAlertProps} /> */}
                    </AlertDialog.Root>
                </PopoverPrimitive.Content>
            </PopoverPrimitive.Portal>
        </PopoverPrimitive.Root>
    );
};
