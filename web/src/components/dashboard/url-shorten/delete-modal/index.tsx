import { Button } from '@shtcut-ui/react';
import React from 'react';
import { Trash2 } from 'lucide-react';

const DeleteModal = ({ onClose }: { onClose: () => void }) => {
    return (
        <div className="py-5 flex flex-col items-center gap-y-2">
            <div className="bg-[#FEE4E2] w-12 h-12 rounded-full flex justify-center items-center">
                <Trash2 color="#D92D20" />
            </div>
            <h1 className="font-semibold text-lg">Remove Member</h1>
            <p className="text-[#475467] text-center text-sm">
                Are you sure you want to remove this member? This action cannot be undone.
            </p>
            <div className="flex items-center gap-x-4 mt-6 w-full">
                <Button variant={'outline'} className="w-full " onClick={onClose}>
                    Cancel
                </Button>
                <Button className="bg-primary-0 w-full">Confirm</Button>
            </div>
        </div>
    );
};

export default DeleteModal;
