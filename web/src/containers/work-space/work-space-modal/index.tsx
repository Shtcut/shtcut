import { Button, Input, Label } from '@shtcut-ui/react';
import React from 'react';
import { Image as ImageIcon } from 'lucide-react';

const CreateWorkSpace = () => {
    return (
        <div className="px-6 py-2">
            <div>
                <h1 className="font-medium">Create Workspace</h1>
                <p className="text-sm mt-2 text-[#475467]">
                    Add users and roles, give them more access select an option.
                </p>

                <section className="mt-6 flex flex-col gap-4 w-full">
                    <section className="flex flex-col gap-2 w-full border-b pb-4">
                        <p className="text-sm">Workspace Name</p>
                        <Input />
                    </section>
                    <section className="flex flex-col gap-2 w-full border-b pb-4">
                        <p className="text-sm">Workspace Color/Image</p>
                        <section className="flex justify-between items-center">
                            <section className="w-10 h-10 flex items-center justify-center border border-[#B5B3B3] bg-[#fafafa] rounded-sm">
                                <ImageIcon size={14} color="#B5B3B3" />
                            </section>
                            <Button className="h-9 text-xs rounded bg-primary-0">Add Image</Button>
                        </section>
                    </section>
                    <div className=" pb-20">
                        <p className="text-sm ">Integrations</p>
                    </div>
                    <section className="flex w-full border-t py-10 items-center gap-4">
                        <Button variant={'outline'} className="h-9 text-xs rounded w-full">
                            Cancel
                        </Button>
                        <Button className="h-9 text-xs bg-primary-0 rounded w-full">Save</Button>
                    </section>
                </section>
            </div>
        </div>
    );
};

export default CreateWorkSpace;
