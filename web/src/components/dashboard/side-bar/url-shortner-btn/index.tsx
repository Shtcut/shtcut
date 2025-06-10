'use client';

import * as React from 'react';
import {
    Button,
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger
} from '@shtcut-ui/react';
import { Link } from 'lucide-react';
import { PiProjectorScreenChartBold, PiQrCodeBold } from 'react-icons/pi';
import { MdOutlineContactMail } from 'react-icons/md';
import { useParams, useRouter } from 'next/navigation';
import { useAppDispatch } from '@shtcut/redux/store';
import { toggleDropdown } from '@shtcut/redux/slices/ui';

const UrlShortenerActionsFeatures = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const params = useParams();
    const { workspace } = params;
    const showLinkModal = () => {
        dispatch(toggleDropdown());
        router.push(`/url/${workspace}/links`);
    };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="bg-primary-0 text-xs rounded h-8 w-full">Create New</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-52 relative ">
                <DropdownMenuCheckboxItem
                    className="p-2 hover:text-primary-0 flex text-xs items-center gap-x-2"
                    onClick={showLinkModal}
                >
                    <Link size={16} /> Links
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    className="p-2 hover:text-primary-0 flex text-xs items-center gap-x-2"
                    onClick={() => router.push(`/url/${workspace}/qr-codes/create`)}
                >
                    <PiQrCodeBold size={16} /> QR Code
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    className="p-2 flex text-xs items-center gap-x-2"
                    onClick={() => router.push(`/url/${workspace}/link-bios/create-link-bio`)}
                >
                    <MdOutlineContactMail size={16} /> Link-in-bio
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem className="p-2 flex text-xs items-center gap-x-2">
                    <PiProjectorScreenChartBold size={16} /> Domains
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
export default UrlShortenerActionsFeatures;
