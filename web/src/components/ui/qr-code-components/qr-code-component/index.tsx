import { Card, Input } from '@shtcut-ui/react';
import React, { useRef, useState } from 'react';
import { Calendar } from 'lucide-react';
import CardsActions from '../card-actions';
import { QRCode } from 'react-qrcode-logo';
import { EyeRadiusType } from '@shtcut/types/types';
import { formatDate } from '@shtcut/_shared';
import { QRCodeDataResponse } from '@shtcut/types/qr-code';
import { NEXT_PUBLIC_URL } from '@shtcut/_shared/constant';
import Modal from '@shtcut/components/modal';
import FrameComponents from '../frames-component';
import { useDispatch } from 'react-redux';
import {
    selectQrCodeStyle,
    setEyeRadius,
    setQrCodeLogo,
    setQrCodePresetColor,
    setQrTitle,
    setSelectedFrame
} from '@shtcut/redux/slices/qr-code';
import {
    setBgColor,
    setBorderColor,
    setBtnColor,
    setPresetColor,
    setSelectedTemplate,
    setTitle,
    setUrl
} from '@shtcut/redux/slices/selects';
import useQrCodeState from '@shtcut/hooks/qrcode/index.';
import useCopyToClipboard from '@shtcut/hooks/useCopyToClipboard';
import useGeneralState from '@shtcut/hooks/general-state';
import { PiCopySimple } from 'react-icons/pi';
import Image from 'next/image';

interface QrCodeCardProps {
    id: string;
    onChange?: () => void;
    data: QRCodeDataResponse;
    selectedIds: string[];
    handleDeleteQrCodeLink: () => void;
    handleNavigate: () => void;
}

const QrCodeCard = ({ id, data, selectedIds, onChange, handleDeleteQrCodeLink, handleNavigate }: QrCodeCardProps) => {
    const dispatch = useDispatch();
    const urlScans = data && data?.type === 'website' ? data?.url : `${NEXT_PUBLIC_URL}/qr-code/${data?.slug}`;
    const qrCodeRef = useRef(null);
    const [showModal, setShowModal] = useState(false);
    const { action, state } = useQrCodeState();
    const { handleCopy } = useCopyToClipboard();
    const { urlScan } = useGeneralState();

    const handleShowScan = (qrCodeData: QRCodeDataResponse) => {
        if (qrCodeData) {
            const urlScanQrCode =
                qrCodeData?.type === 'website' ? data?.url : `${NEXT_PUBLIC_URL}/qr-code/${qrCodeData?.slug}`;
            dispatch(setSelectedFrame(qrCodeData?.qrCode?.frame ?? 0));
            dispatch(
                setPresetColor((qrCodeData?.qrCode?.colors?.presetColor || qrCodeData?.template?.presetColor) ?? '')
            );
            dispatch(setSelectedTemplate(qrCodeData?.template?.template ?? ''));
            dispatch(
                setQrCodePresetColor(
                    (qrCodeData?.qrCode?.colors?.presetColor || qrCodeData?.template?.presetColor) ?? ''
                )
            );
            dispatch(setBgColor(qrCodeData?.bgColor));
            dispatch(setEyeRadius(qrCodeData?.qrCode?.eyeRadius));
            dispatch(setQrCodeLogo(qrCodeData?.qrCode?.logo ?? ''));
            dispatch(setTitle(qrCodeData?.title));
            dispatch(setQrTitle(qrCodeData?.qrCode?.name || qrCodeData?.title));
            dispatch(setBorderColor(qrCodeData?.borderColor || qrCodeData?.qrCode?.colors?.borderColor));
            dispatch(setUrl(urlScanQrCode ?? ''));
            dispatch(selectQrCodeStyle(qrCodeData?.qrCode?.qrStyle));
            dispatch(setBtnColor(qrCodeData?.template?.btnColor ?? ''));
            setShowModal(true);
        }
    };

    const handleCloseModal = () => {
        action.generalReset();
        setShowModal(false);
    };

    console.log('state?.selectedFrame', state?.selectedFrame);
    console.log('state?.logo', state?.logo);

    return (
        <section>
            <Card
                className=" cursor-pointer border border-gray-200 shadow-sm  rounded-[10px] p-4  "
                onClick={handleNavigate}
            >
                <div className="flex justify-between items-center">
                    <div className="flex gap-x-3">
                        <div className="relative top-1.5 checkbox-container" onClick={(e) => e.stopPropagation()}>
                            <input
                                type="checkbox"
                                id={`qr-checkbox-${id}`}
                                checked={selectedIds.includes(data._id)}
                                onChange={onChange}
                                className="cbox cursor-pointer"
                            />
                        </div>
                        <div ref={qrCodeRef}>
                            <QRCode
                                id="shtcut-qrcode"
                                value={urlScans}
                                removeQrCodeBehindLogo={true}
                                ecLevel="H"
                                fgColor={data?.qrCode?.colors?.presetColor}
                                size={66}
                                logoWidth={20}
                                logoHeight={20}
                                logoImage={data?.qrCode?.logo ?? ''}
                                qrStyle={data?.qrCode?.qrStyle}
                                eyeRadius={data?.qrCode?.eyeRadius as EyeRadiusType}
                            />
                        </div>
                        <div className="">
                            <div>
                                <h1 className="font-semibold text-sm text-[#151314]">
                                    {data?.title || data?.name} QR Code
                                </h1>
                                <p className="text-xs text-primary-0 font-normal">{data?.type}</p>
                            </div>
                            <div className="flex items-center gap-x-2 mt-[6px]">
                                <Calendar color="#2B2829" size={16} />
                                <span className="text-[#726C6C] text-xs font-medium">
                                    {formatDate(data?.createdAt)}
                                </span>
                            </div>
                        </div>
                    </div>
                    <CardsActions
                        qrCodeRef={qrCodeRef}
                        handleDeleteQrCodeLink={handleDeleteQrCodeLink}
                        handleShowScan={() => handleShowScan(data)}
                        handleNavigate={handleNavigate}
                    />
                </div>
            </Card>
            <Modal
                closeIcon={false}
                isOpen={showModal}
                onClose={handleCloseModal}
                className={`  p-6  w-96 h-fit ${state?.selectedFrame === 3 && state?.logo ? 'pb-16' : state?.selectedFrame === 3 && !state.logo ? 'pb-0' : ''} `}
            >
                <div className="flex justify-center flex-col items-center h-full ">
                    {state.logo && (
                        <div className={`${state?.selectedFrame === 3 ? 'mb-20' : 'pb-6'}`}>
                            <Image src={state?.logo as string} width={50} height={50} alt="qr-code" />
                        </div>
                    )}
                    <section className={` ${state?.selectedFrame === 3 && !state?.logo ? 'mt-20' : ''} `}>
                        <FrameComponents />
                    </section>
                    <section className={`my-5 relative w-full ${state?.selectedFrame === 3 ? 'mt-24' : ''}`}>
                        <Input
                            value={urlScan.length > 35 ? `${urlScan.slice(0, 35)}...` : urlScan}
                            defaultValue={urlScan.length > 35 ? `${urlScan.slice(0, 35)}...` : urlScan}
                            className="border border-gray-300 w-full"
                            disabled
                            maxLength={6}
                        />
                        <div className="absolute  cursor-pointer top-2.5 right-4">
                            <PiCopySimple color="#726C6C" size={16} onClick={() => handleCopy(urlScan as string)} />
                        </div>
                    </section>
                </div>
            </Modal>
        </section>
    );
};

export default QrCodeCard;
