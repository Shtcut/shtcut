'use client';

import React, { useState } from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { Edit, Trash, ArchiveIcon, QrCode } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import axios from 'axios';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { Drawer } from 'vaul';
import { MenuDropdown } from '../MenuDropdown';
import { useRouter, useParams } from 'next/navigation';
import { CustomAlert, Dict, Modal, toast } from '@shtcut-ui/react';
import { LinkQrCodeForm } from '@shtcut/components/form';
import { useLink } from '@shtcut/hooks/link';
import { findAllLinks } from '@shtcut/services/link';
import { IconBrandGoogleAnalytics } from '@tabler/icons-react';

interface PopoverMenuProps {
    id: string;
    title?: string;
    target: string;
    archived?: boolean;
    qrCode?: string | Dict;
}

export const PopoverMenu = ({ id, title, target, archived, qrCode }: PopoverMenuProps) => {
    const router = useRouter();
    const params = useParams();
    const { module, workspace } = params;

    const { updateLink, updateLinkResponse, deleteLinkResponse, deleteLink } = useLink({ callLinks: true });
    const { isLoading: isUpdating, isSuccess: isUpdateSuccessful } = updateLinkResponse;
    const { isLoading: isDeleting, isSuccess: isDeleteSuccessful } = deleteLinkResponse;

    const [isArchived, setIsArchived] = useState(archived);
    const [openPopover, setOpenPopover] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [isQrCode, setIsQrCode] = useState<boolean>(false);

    const handleToggleArchiving = async () => {
        setOpenPopover(false);
        setOpenDrawer(false);
        setIsArchived(!isArchived);
        updateLink({
            payload: {
                id,
                archived: !isArchived
            },
            options: {
                successMessage: `Link successfully ${isArchived ? 'archived' : 'un-archived'}`
            }
        });
    };

    const handleDeleteLink = () => {
        setOpenPopover(false);
        setOpenDrawer(false);
        deleteLink({
            payload: {
                id
            },
            options: {
                successMessage: 'Link deleted successfully'
            }
        });
    };

    const closePopOver = () => {
        setOpenPopover(false);
    };

    const closeDrawer = () => {
        setOpenDrawer(false);
    };

    const handleOnCloseQR = () => {
        setOpenPopover(false);
        setOpenDrawer(false);
        setIsQrCode(true);
    };

    const deleteAlertProps = {
        action: handleDeleteLink,
        title: 'Delete Link?',
        description: 'Are you sure you want to delete this link? This action cannot be undone.',
        confirmMessage: 'Yes, delete link',
        close: (!openPopover && closeDrawer) || (!openDrawer && closePopOver)
    };

    const archiveProps = {
        action: handleToggleArchiving,
        title: !isArchived ? 'Archive Link?' : 'Unarchive Link?',
        description: !isArchived
            ? "Archived links will still work - they just won't show up on your main page."
            : 'By unarchiving this link, it will show up on your main page again.',
        confirmMessage: !isArchived ? 'Yes, archive' : 'Yes, unarchive',
        close: (!openPopover && closeDrawer) || (!openDrawer && closePopOver)
    };

    const mobilePopOverProps = {
        archiveProps,
        deleteAlertProps,
        title,
        id,
        target,
        archived,
        isArchived,
        closeDrawer
    };

    const handleOnEdit = () => {
        router.push(`/${module}/${workspace}/links/${id}`);
    };

    const handleOnClickQRCode = () => {
        setOpenPopover(false);
        setOpenDrawer(false);
        setIsQrCode(true);
    };

    return (
        <>
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
                                <button
                                    className="group flex w-full items-center justify-between rounded-md p-3 text-sm font-medium text-gray-500 transition-all duration-75 hover:bg-gray-100"
                                    onClick={handleOnEdit}
                                >
                                    <h4>Edit</h4>
                                    <Edit size={17} color="gray" />
                                </button>
                            </Dialog.Trigger>
                        </Dialog.Root>
                        <Dialog.Root>
                            <Dialog.Trigger asChild>
                                <button
                                    className="group flex w-full items-center justify-between rounded-md p-3 text-sm font-medium text-gray-500 transition-all duration-75 hover:bg-gray-100"
                                    onClick={handleOnEdit}
                                >
                                    <h4>Analytics</h4>
                                    <IconBrandGoogleAnalytics size={17} color="gray" />
                                </button>
                            </Dialog.Trigger>
                        </Dialog.Root>
                        <AlertDialog.Root>
                            <AlertDialog.Trigger asChild>
                                <button
                                    className="group flex w-full items-center justify-between rounded-md p-3 text-sm font-medium text-gray-500 transition-all duration-75 hover:bg-gray-100"
                                    onClick={handleOnClickQRCode}
                                >
                                    <h4>QR Code</h4>
                                    <QrCode size={17} color="gray" />
                                </button>
                            </AlertDialog.Trigger>
                        </AlertDialog.Root>
                        <AlertDialog.Root>
                            <AlertDialog.Trigger asChild>
                                <button className="group flex w-full items-center justify-between rounded-md p-3 text-sm font-medium text-gray-500 transition-all duration-75 hover:bg-gray-100">
                                    <h4>{!isArchived ? 'Archive' : 'Unarchive'}</h4>
                                    <ArchiveIcon size={17} color="gray" />
                                </button>
                            </AlertDialog.Trigger>
                            <CustomAlert {...archiveProps} />
                        </AlertDialog.Root>
                        <AlertDialog.Root>
                            <AlertDialog.Trigger asChild>
                                <button className="group flex w-full items-center justify-between rounded-md p-3 text-sm font-medium text-red-400 transition-all duration-75 hover:bg-red-500 hover:text-white">
                                    <h4>Delete</h4>
                                    <Trash size={17} className="text-b-400 hover:text-white" />
                                </button>
                            </AlertDialog.Trigger>
                            <CustomAlert {...deleteAlertProps} />
                        </AlertDialog.Root>
                    </PopoverPrimitive.Content>
                </PopoverPrimitive.Portal>
            </PopoverPrimitive.Root>
            <Modal
                showModel={isQrCode}
                setShowModal={setIsQrCode}
                showCloseIcon={true}
                onClose={handleOnCloseQR}
                className="bg-white"
            >
                <LinkQrCodeForm qrPayload={qrCode as Dict} url={target} onClose={handleOnCloseQR} />
            </Modal>
        </>
    );
};
