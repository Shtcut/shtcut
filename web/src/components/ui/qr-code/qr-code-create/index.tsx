import { Button, Modal } from '@shtcut-ui/react';
import BreadCrumb from '@shtcut/components/bread-crumb';
import React, { useRef } from 'react';
import QrCodeSelectTabs from '../qr-code-select-tabs';
import { QrCodeInterface } from '@shtcut/types/types';
import { Frame_5, Frame_1, Frame_8, Frame_2, Frame_6, Frame_9, Frame_7, Frame_3, Frame_4 } from '../qr-code-frames';
import Image from 'next/image';
import DownloadBtn from './download-btn';

const QRCodeCreateComponent = ({
    setStep,
    step,
    onNextStep,
    onPrevStep,
    bgColor,
    btnColor,
    handleColorClick,
    selectedColor,
    setBtnColor,
    setBgColor,
    qrCodeName,
    handleInputChange,
    selectedFrame,
    setSelectedFrame,
    handleSelectQrCodeLogo,
    qrCodeLogo,
    handleChangeQrCodeShape,
    qrCodeShape,
    eyeRadius,
    handleEyeRadiusChange,
    saveModal,
    setSaveModal
}: QrCodeInterface) => {
    const qrCodeRef = useRef(null);
    const renderFrame = () => {
        switch (selectedFrame) {
            case 1:
                return (
                    <Frame_1
                        selectedColor={selectedColor}
                        bgColor={bgColor}
                        qrCodeName={qrCodeName}
                        btnColor={btnColor}
                        qrCodeLogo={qrCodeLogo}
                        qrCodeShape={qrCodeShape}
                        eyeRadius={eyeRadius}
                    />
                );
            case 2:
                return (
                    <Frame_2
                        selectedColor={selectedColor}
                        bgColor={bgColor}
                        qrCodeName={qrCodeName}
                        btnColor={btnColor}
                        qrCodeLogo={qrCodeLogo}
                        qrCodeShape={qrCodeShape}
                        eyeRadius={eyeRadius}
                    />
                );
            case 3:
                return (
                    <Frame_3
                        selectedColor={selectedColor}
                        bgColor={bgColor}
                        qrCodeName={qrCodeName}
                        btnColor={btnColor}
                        qrCodeLogo={qrCodeLogo}
                        qrCodeShape={qrCodeShape}
                        eyeRadius={eyeRadius}
                    />
                );
            case 4:
                return (
                    <Frame_4
                        selectedColor={selectedColor}
                        bgColor={bgColor}
                        qrCodeName={qrCodeName}
                        btnColor={btnColor}
                        qrCodeLogo={qrCodeLogo}
                        qrCodeShape={qrCodeShape}
                        eyeRadius={eyeRadius}
                    />
                );
            case 5:
                return (
                    <Frame_5
                        selectedColor={selectedColor}
                        bgColor={bgColor}
                        qrCodeName={qrCodeName}
                        btnColor={btnColor}
                        qrCodeLogo={qrCodeLogo}
                        qrCodeShape={qrCodeShape}
                        eyeRadius={eyeRadius}
                    />
                );
            case 6:
                return (
                    <Frame_6
                        selectedColor={selectedColor}
                        bgColor={bgColor}
                        qrCodeName={qrCodeName}
                        btnColor={btnColor}
                        qrCodeLogo={qrCodeLogo}
                        qrCodeShape={qrCodeShape}
                        eyeRadius={eyeRadius}
                    />
                );
            case 7:
                return (
                    <Frame_7
                        selectedColor={selectedColor}
                        bgColor={bgColor}
                        qrCodeName={qrCodeName}
                        btnColor={btnColor}
                        qrCodeLogo={qrCodeLogo}
                        qrCodeShape={qrCodeShape}
                        eyeRadius={eyeRadius}
                    />
                );
            case 8:
                return (
                    <Frame_8
                        selectedColor={selectedColor}
                        bgColor={bgColor}
                        qrCodeName={qrCodeName}
                        btnColor={btnColor}
                        qrCodeLogo={qrCodeLogo}
                        qrCodeShape={qrCodeShape}
                        eyeRadius={eyeRadius}
                    />
                );
            case 9:
                return (
                    <Frame_9
                        selectedColor={selectedColor}
                        bgColor={bgColor}
                        qrCodeName={qrCodeName}
                        btnColor={btnColor}
                        qrCodeLogo={qrCodeLogo}
                        qrCodeShape={qrCodeShape}
                        eyeRadius={eyeRadius}
                    />
                );
            default:
                return (
                    <Frame_5
                        selectedColor={selectedColor}
                        bgColor={bgColor}
                        qrCodeName={qrCodeName}
                        btnColor={btnColor}
                        qrCodeLogo={qrCodeLogo}
                        qrCodeShape={qrCodeShape}
                        eyeRadius={eyeRadius}
                    />
                );
        }
    };

    return (
        <div className=" ">
            <BreadCrumb currentRoute="Create QR Code" />
            <div className="flex justify-between  items-center">
                <h1 className="font-semibold text-[#2B2829] text-2xl">Create QR Codes</h1>
                <div className="flex items-center gap-x-3">
                    {step && step > 1 && (
                        <Button
                            onClick={onPrevStep}
                            className="bg-primary-0 flex justify-center w-28 items-center gap-x-2"
                        >
                            Back
                        </Button>
                    )}
                    <Button
                        onClick={() => {
                            if (step && step > 2) {
                                setSaveModal(true);
                            } else if (onNextStep) {
                                onNextStep();
                            }
                        }}
                        className="bg-primary-0 flex justify-center w-28 items-center gap-x-2"
                    >
                        {step && step > 2 ? 'Save' : ' Next'}
                    </Button>
                </div>
            </div>
            <div className="flex mt-[22px] gap-7">
                <div className="w-full">
                    <div className="">
                        <QrCodeSelectTabs
                            setStep={setStep}
                            step={step}
                            handleColorClick={handleColorClick}
                            setBgColor={setBgColor}
                            bgColor={bgColor}
                            setBtnColor={setBtnColor}
                            btnColor={btnColor}
                            handleInputChange={handleInputChange}
                            qrCodeName={qrCodeName}
                            setSelectedFrame={setSelectedFrame}
                            handleSelectQrCodeLogo={handleSelectQrCodeLogo}
                            selectedFrame={selectedFrame}
                            handleChangeQrCodeShape={handleChangeQrCodeShape}
                            handleEyeRadiusChange={handleEyeRadiusChange}
                        />
                    </div>
                </div>
                <div className="bg-white w-1/2 rounded-[10px] h-full p-[23px]">
                    <h2 className="text-lg font-medium ">Preview</h2>
                    <div className="border w-56 h-[454px] border-[#A6A6A4] p-[1px] mt-10 mx-auto rounded-[37px]">
                        <div
                            className={`flex border-4 border-black flex-col   w-full h-full justify-center items-center rounded-[37px] `}
                        >
                            <div className="bg-black w-12 h-4 flex justify-end items-center px-2 mt-2 rounded-full">
                                <div className="w-1 h-1 bg-slate-500 rounded-full" />
                            </div>

                            <div className="flex-1 h-full">{renderFrame()}</div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                setShowModal={setSaveModal}
                showModel={saveModal}
                onClose={() => setSaveModal(false)}
                className=" bg-gray-50  p-4"
            >
                <div className="flex flex-col gap-4 items-center">
                    <div className="flex flex-col items-center gap-2">
                        {qrCodeLogo ? (
                            <Image src={qrCodeLogo as string} width={50} height={50} alt="qr-code" />
                        ) : (
                            <div></div>
                        )}
                        <p className="font-semibold text-lg">Download QR Code</p>
                    </div>
                    <div className="w-fit h-40" ref={qrCodeRef}>
                        {renderFrame()}
                    </div>
                    <div className="flex mt-10 items-center w-full gap-4">
                        <Button variant={'outline'} className="w-full" onClick={() => setSaveModal(false)}>
                            Cancel
                        </Button>
                        <DownloadBtn qrCodeRef={qrCodeRef} />
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default QRCodeCreateComponent;
