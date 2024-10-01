import { Button, Input, Textarea } from '@shtcut-ui/react';
import { X } from 'lucide-react';
import React from 'react';

const NewHashTag = ({
    handleOpen,
    handleClose
}: {
    handleOpen: (open: boolean, modalType: string) => void;
    handleClose: () => void;
}) => {
    return (
        <div>
            <section className="flex border-b pb-2 items-center justify-between">
                <p className="text-sm font-semibold">Add New Hashtags </p>
                <X size={18} onClick={() => handleOpen(false, '')} />
            </section>
            <section className="flex flex-col gap-4 mt-6">
                <Input placeholder="Enter hashtag name" />
                <Textarea placeholder="Add tags associated  e.g  #branding" className="resize-none" />
            </section>
            <section className="flex gap-x-4 mt-6 items-center">
                <Button className="w-full text-xs h-9" variant={'outline'} onClick={handleClose}>
                    Return
                </Button>
                <Button className="w-full bg-primary-0 text-xs h-9">Create</Button>
            </section>
        </div>
    );
};

export default NewHashTag;
