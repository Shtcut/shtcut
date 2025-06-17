'use client';

import Image from 'next/image';
import React from 'react';
import { Button } from '@shtcut-ui/react';
import { LoadingButton } from '@shtcut/components/_shared/loading-button';

const DeleteRole = ({
    onClose,
    deleteRole,
    findIsLoadingState
}: {
    onClose: () => void;
    deleteRole: () => void;
    findIsLoadingState: boolean;
}) => {
    return (
        <div className="flex flex-col items-center p-4">
            <Image src="/images/delete-icon.png" width={48} height={48} alt="delete" />
            <p className="text-sm text-center my-3">
                Are you sure you want to delete this role? This action cannot be undone.
            </p>
            <div className="flex items-center gap-3 mt-4 w-full">
                <Button variant="outline" className="w-full h-9 text-xs" onClick={onClose}>
                    Cancel
                </Button>
                <LoadingButton
                    loading={findIsLoadingState}
                    className="bg-red-600 text-white w-full h-9 text-xs"
                    onClick={deleteRole}
                >
                    Delete
                </LoadingButton>
            </div>
        </div>
    );
};

export default DeleteRole;
