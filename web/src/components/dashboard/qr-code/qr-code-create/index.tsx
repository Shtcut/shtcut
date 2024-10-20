import { Button, Modal, Tabs, TabsContent, TabsList, TabsTrigger } from '@shtcut-ui/react';
import React, { useRef, useState } from 'react';
import { QrCodeInterface } from '@shtcut/types/types';
import { Frame_5, Frame_1, Frame_8, Frame_2, Frame_6, Frame_9, Frame_7, Frame_3, Frame_4 } from '../qr-code-frames';
import Image from 'next/image';
import DownloadBtn from './download-btn';
import { Link, List } from 'lucide-react';
import { PiFilePdfDuotone, PiIdentificationCard } from 'react-icons/pi';
import WebsiteComponent from '../website-component';

const QRCodeCreateComponent = ({
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
    const [switchTab, setSwitchTab] = useState<string>('website');
    const handleTabChange = (tabs: string) => {
        setSwitchTab(tabs);
    };
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
            <div className="flex justify-between  items-center">
                <h1 className="font-semibold text-[#2B2829] text-xl">Create QR Codes</h1>
                <div className="flex items-center gap-x-3">
                    {step && step > 1 && (
                        <Button
                            onClick={onPrevStep}
                            className="bg-primary-0 flex justify-center w-28 items-center h-8 text-xs rounded gap-x-2"
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
                        className="bg-primary-0 flex justify-center w-28 h-8 text-xs rounded items-center gap-x-2"
                    >
                        {step && step > 2 ? 'Save' : ' Next'}
                    </Button>
                </div>
            </div>
            <div className="flex mt-[22px] gap-7">
                <div className="w-full">
                    <div className="">
                        <div>
                            <Tabs defaultValue="website" className="w-full">
                                <TabsList className="block border-none bg-transparent gap-0 m-0 p-0 ">
                                    <section className="bg-white shadow-sm border border-gray-100  rounded-[10px] p-[23px]">
                                        <h2 className="font-medium mb-[22px] text-[#151314]">Select QR Code Type</h2>
                                        <section className=" w-full gap-x-[10px] flex flex-1">
                                            <TabsTrigger
                                                className="border shadow-none text-black/60 h-9 w-32 data-[state=active]:text-primary-0 data-[state=active]:border-primary-0 text-xs flex items-center justify-center gap-x-2 data-[state=active]:shadow-none"
                                                value="website"
                                                onClick={() => handleTabChange('website')}
                                            >
                                                <div>
                                                    <Link size={16} />
                                                </div>{' '}
                                                Website URL
                                            </TabsTrigger>
                                            <TabsTrigger
                                                className="border shadow-none text-black/60 h-9 w-32 data-[state=active]:text-primary-0 data-[state=active]:border-primary-0 text-xs flex items-center justify-center gap-x-2 data-[state=active]:shadow-none"
                                                value="multi"
                                                onClick={() => handleTabChange('multi')}
                                            >
                                                <List size={18} /> Multi links
                                            </TabsTrigger>
                                            <TabsTrigger
                                                value="pdf"
                                                className="border shadow-none text-black/60 h-9 w-32 data-[state=active]:text-primary-0 data-[state=active]:border-primary-0 text-xs flex items-center justify-center gap-x-2 data-[state=active]:shadow-none"
                                            >
                                                <PiFilePdfDuotone size={18} /> PDF
                                            </TabsTrigger>
                                            <TabsTrigger
                                                value="vCard"
                                                className="border shadow-none text-black/60 h-9 w-32 data-[state=active]:text-primary-0 data-[state=active]:border-primary-0 text-xs flex items-center justify-center gap-x-2 data-[state=active]:shadow-none"
                                                onClick={() => handleTabChange('vCard')}
                                            >
                                                <PiIdentificationCard size={18} /> vCard Plus
                                            </TabsTrigger>
                                        </section>
                                    </section>
                                </TabsList>
                                <div className="mt-32  ">
                                    <TabsContent value="website">
                                        <WebsiteComponent
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
                                    </TabsContent>
                                    <TabsContent value="multi">multi</TabsContent>
                                    <TabsContent value="pdf">pdf</TabsContent>
                                    <TabsContent value="vCard">vCard</TabsContent>
                                </div>
                            </Tabs>
                        </div>
                    </div>
                </div>
                <div className="bg-white w-1/2 shadow-sm border border-gray-100 rounded-[10px] h-full p-[23px]">
                    <h2 className=" font-medium ">Preview</h2>
                    <div className="border w-56 h-[454px] border-[#A6A6A4] p-[1px] mt-10 mx-auto rounded-[37px]">
                        <div className="flex border-4 border-black flex-col   w-full h-full justify-center items-center rounded-[37px]">
                            <div className="bg-black w-12 h-4 flex justify-end items-center px-2 mt-2 rounded-full">
                                <div className="w-1 h-1 bg-slate-500 rounded-full" />
                            </div>

                            <div className="flex-1 h-full">
                                {switchTab === 'website' ? renderFrame() : switchTab === 'multi' ? renderFrame() : null}{' '}
                            </div>
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
                        {qrCodeLogo ? <Image src={qrCodeLogo as string} width={50} height={50} alt="qr-code" /> : null}
                        <p className="font-semibold ">Download QR Code</p>
                    </div>
                    <div className="w-fit h-40" ref={qrCodeRef}>
                        {renderFrame()}
                    </div>
                    <div className="flex mt-10 items-center w-full gap-4">
                        <Button variant={'outline'} className="w-full h-8 text-xs" onClick={() => setSaveModal(false)}>
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
