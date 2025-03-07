import { Button, Input } from '@shtcut-ui/react';

import React, { MutableRefObject } from 'react';
import { PiCopySimple } from 'react-icons/pi';
import FrameComponents from '../../../frames-component';
import Image from 'next/image';
import useCopyToClipboard from '@shtcut/hooks/useCopyToClipboard';
import Modal from '@shtcut/components/modal';
import DownloadBtn from '../../download-btn';

type QrCodeSuccessModalType = {
    handleClose: () => void;
    saveModal: boolean;
    urlScan: string;
    state: any;
    qrCodeRef: MutableRefObject<HTMLDivElement | null>;
};

const QrCodeSuccessModal = ({ handleClose, saveModal, state, qrCodeRef, urlScan }: QrCodeSuccessModalType) => {
    const { handleCopy } = useCopyToClipboard();
    return (
        <Modal closeIcon={false} isOpen={saveModal} onClose={handleClose} className="p-4 w-full">
            <div className="flex flex-col gap-4 items-center">
                <div className="flex flex-col items-center gap-2">
                    {state?.logo ? <Image src={state?.logo as string} width={50} height={50} alt="qr-code" /> : null}
                    <p className="font-semibold ">Download QR Code</p>
                </div>
                <div className="w-fit h-40" ref={qrCodeRef}>
                    <FrameComponents />
                </div>
                <section className="mt-5 relative w-full">
                    <Input
                        value={urlScan.length > 40 ? `${urlScan.slice(0, 40)}...` : urlScan}
                        defaultValue={urlScan as string}
                        className="border border-gray-300 w-full"
                        disabled
                    />
                    <div className="absolute cursor-pointer top-2.5 right-4">
                        <PiCopySimple color="#726C6C" size={16} onClick={() => handleCopy(urlScan as string)} />
                    </div>
                </section>
                <div className="flex mt-8 items-center w-full gap-4">
                    <Button variant={'outline'} className="w-full h-8 text-xs" onClick={handleClose}>
                        Cancel
                    </Button>
                    <DownloadBtn qrCodeRef={qrCodeRef} />
                </div>
            </div>
        </Modal>
    );
};

export default QrCodeSuccessModal;
