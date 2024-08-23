import { Button, Input, Label } from '@shtcut-ui/react';
import Image from 'next/image';
import React from 'react';

const ManageWorkSpaceModal = () => {
    return (
        <div className="py-3">
            <h1 className="font-semibold text-lg">Manage Workspace</h1>
            <p className="text-[#475467] text-sm">To update users role and give them more access select an option.</p>
            <div className="flex border-b pb-4 flex-col gap-2 mt-4">
                <Label className="text-[#344054]">Workspace Name</Label>
                <Input value={'Timelab'} readOnly />
            </div>
            <div className="border-b pb-4">
                <h1 className="text-sm mt-6  text-[#344054] font-medium">Workspace Color/Image</h1>
                <div className="flex mt-4 justify-between items-center">
                    <Image src={'/images/icon.png'} width={40} height={40} alt="logo" />
                    <Button className="bg-primary-0 h-8 text-xs rounded">Change</Button>
                </div>
            </div>
            <div className="border-b pb-4">
                <h1 className="text-sm mt-6  text-[#344054] font-medium">Integrations</h1>
                <div className="flex mt-3 items-center gap-x-3">
                    <Image src={'/images/instagram-icon.png'} width={38} height={38} alt="logo" />
                    <Image src={'/images/pajamas_twitter.png'} width={38} height={38} alt="logo" />
                </div>
            </div>
            <div className="border-b pb-4 mt-6 flex justify-between items-center">
                <div>
                    <h1 className="text-sm   font-medium text-[#C03744]">DEACTIVATION</h1>
                    <p className="text-sm text-[#433E3F]">Do you want to deactivate this work space?</p>
                </div>
                <Button className="bg-[#C03744] h-8 text-xs rounded">Change</Button>
            </div>
            <div className="flex items-center gap-x-4 mt-6 w-full">
                <Button variant={'outline'} className="w-full h-8 text-xs rounded ">
                    Cancel
                </Button>
                <Button className="bg-primary-0 w-full h-8 text-xs rounded">Save</Button>
            </div>
        </div>
    );
};

export default ManageWorkSpaceModal;
