import { Button } from '@shtcut-ui/react';
import Image from 'next/image';
import React from 'react';

const AddedModal = ({ onClose }: { onClose: () => void }) => {
    return (
        <div className="py-5 flex flex-col items-center gap-y-2">
            <div className="">
                <Image src={'/images/Avatar-group.png'} width={120} height={56} alt="avatar" />
            </div>
            <h1 className="font-semibold text-lg">You’ve added member!</h1>
            <p className="text-[#475467] text-center text-sm">
                You have successfully added a new member to the timelab workspace.
            </p>
            <div className="flex  items-center gap-x-4 mt-6 w-full">
                <Button onClick={onClose} className=" w-full bg-primary-0">
                    Done
                </Button>
            </div>
        </div>
    );
};

export default AddedModal;
