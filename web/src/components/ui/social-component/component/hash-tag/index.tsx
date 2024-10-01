import { Button, Checkbox } from '@shtcut-ui/react';
import React from 'react';

const HashTag = ({
    handleOpen,
    handleClose
}: {
    handleOpen: (open: boolean, modalType: string) => void;
    handleClose: () => void;
}) => {
    return (
        <div>
            <section className="flex border-b pb-2 items-center justify-between">
                <p className="text-sm font-semibold">Hashtag Manager</p>
                <p
                    onClick={() => handleOpen(true, 'new-hash')}
                    className="border-b border-b-primary-0 text-xs cursor-pointer text-primary-0"
                >
                    Add Hashtag
                </p>
            </section>
            <section className="mt-4 border rounded-sm p-2">
                {[1, 2, 3].map((data, index) => (
                    <section className={`${index === 2 ? '' : 'border-b'}  py-2`} key={data}>
                        <Checkbox className="float-left w-3.5 h-3.5 mt-0.5" />
                        <div className="pl-6">
                            <p className="text-xs font-semibold p-0">Food</p>
                            <span className="text-[#4D4D4D] text-[11px] p-0">#Pizza #Kitchen #Catering</span>
                        </div>
                    </section>
                ))}
            </section>
            <section className="flex gap-x-4 mt-6 items-center">
                <Button className="w-full text-xs h-9" variant={'outline'} onClick={handleClose}>
                    Cancel
                </Button>
                <Button className="w-full bg-primary-0 text-xs h-9">Done</Button>
            </section>
        </div>
    );
};

export default HashTag;
