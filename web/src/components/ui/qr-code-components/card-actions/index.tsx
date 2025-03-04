import { ScanLine } from 'lucide-react';
import React from 'react';
import FeatureActions from './features-action';
import DownloadBtn from '../qr-code-create/download-btn';

const CardsActions = ({
    handleDeleteQrCodeLink,
    qrCodeRef,
    handleShowScan,
    handleNavigate
}: {
    handleDeleteQrCodeLink: () => void;
    qrCodeRef: any;
    handleShowScan: () => void;
    handleNavigate: () => void;
}) => {
    return (
        <div onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-x-3">
                <div
                    className="flex  border border-[#15B097] w-[110px] font-medium text-[#15B097] cursor-pointer justify-center text-xs h-8 rounded  p-[6px] items-center  gap-x-2"
                    onClick={handleShowScan}
                >
                    <ScanLine size={16} /> Scans 30
                </div>

                <div className="w-[110px] ">
                    <DownloadBtn qrCodeRef={qrCodeRef} className="rounded" />
                </div>

                <FeatureActions handleDeleteQrCodeLink={handleDeleteQrCodeLink} handleNavigate={handleNavigate} />
            </div>
        </div>
    );
};

export default CardsActions;
