import { Button } from '@shtcut-ui/react';
import { LoadingButton } from '@shtcut/components/_shared/loading-button';
import Image from 'next/image';
import React from 'react';

const DeleteComponent = ({
    isLoadingState,
    handleDelete,
    handleClose,
    description,
    title
}: {
    isLoadingState: boolean;
    handleDelete: () => void;
    handleClose: () => void;
    description: string;
    title: string;
}) => {
    return (
        <div>
            <section className="flex flex-col px-4 items-center gap-4">
                <Image src={'/images/delete-icon.png'} width={48} height={48} alt="delete" />
                <div>
                    <h1 className="font-semibold text-center">Delete {title}</h1>
                    <p className="text-[13px] w-5/6 mx-auto text-center text-[#475467]">{description}</p>
                </div>
                <div className="flex pb-4 w-full gap-2">
                    <Button onClick={handleClose} className="w-full" variant={'outline'}>
                        Cancel
                    </Button>
                    <LoadingButton onClick={handleDelete} loading={isLoadingState}>
                        Delete
                    </LoadingButton>
                </div>
            </section>
        </div>
    );
};

export default DeleteComponent;
