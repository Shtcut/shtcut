import { Button } from '@shtcut-ui/react';
import { LoadingButton } from '@shtcut/components/_shared/loading-button';
import BackButton from '@shtcut/components/back-btn';
import { useParams } from 'next/navigation';
import React from 'react';

interface QRCodeCreateHeaderProps {
    step: number;
    isLoading: boolean;
    handlePrevStep: () => void;
    handleSave: () => void;
    handleClose: () => void;
}

const BtnActions = ({ step, handlePrevStep, handleSave, isLoading, handleClose }: QRCodeCreateHeaderProps) => {
    const params = useParams();
    const { workspace } = params;
    return (
        <>
            <BackButton navigation={handleClose} className="p-0 m-0" />
            <div className="flex pt-6 justify-between  items-center">
                <h1 className="font-semibold text-[#2B2829] text-xl">Create QR </h1>
                <div className="flex items-center gap-x-3">
                    {Number(step) > 1 && (
                        <Button
                            onClick={handlePrevStep}
                            className="flex justify-center w-28 items-center h-8 text-xs rounded gap-x-2"
                            variant={'outline'}
                        >
                            Back
                        </Button>
                    )}

                    <LoadingButton
                        loading={isLoading}
                        onClick={handleSave}
                        type={'submit'}
                        className="bg-primary-0 flex justify-center w-28 h-8 text-xs rounded items-center gap-x-2"
                    >
                        {step && Number(step) > 2 ? 'Save' : ' Next'}
                    </LoadingButton>
                </div>
            </div>
        </>
    );
};

export default BtnActions;
