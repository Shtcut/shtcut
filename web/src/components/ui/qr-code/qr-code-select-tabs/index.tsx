import { Tabs, TabsList, TabsTrigger, TabsContent } from '@shtcut-ui/react';
import { Link, List } from 'lucide-react';
import { PiFilePdfDuotone } from 'react-icons/pi';
import { PiIdentificationCard } from 'react-icons/pi';
import React from 'react';
import WebsiteComponent from '../website-component';
import { PropsColor } from '@shtcut/types/types';

const QrCodeSelectTabs = ({
    setBgColor,
    bgColor,
    btnColor,
    setBtnColor,
    handleColorClick,
    step,
    handleInputChange,
    qrCodeName,
    setSelectedFrame,
    handleSelectQrCodeLogo,
    selectedFrame,
    handleChangeQrCodeShape,
    handleEyeRadiusChange
}: PropsColor) => {
    return (
        <div>
            <Tabs defaultValue="website" className="w-full">
                <TabsList className="block bg-transparent gap-0 m-0 p-0 ">
                    <section className="bg-white rounded-[10px] p-[23px]">
                        <h2 className="text-lg font-medium mb-[22px] text-[#151314]">Select QR Code Type</h2>
                        <section className="justify-between w-full gap-x-[10px] flex flex-1">
                            <TabsTrigger
                                className="border border-tertiary-700 shadow-none text-black h-[48px] w-full data-[state=active]:text-primary-0 data-[state=active]:border-primary-0 flex items-center justify-center gap-x-2 data-[state=active]:shadow-none"
                                value="website"
                            >
                                <Link size={20} /> Website URL
                            </TabsTrigger>
                            <TabsTrigger
                                className="border border-tertiary-700 shadow-none text-black h-[48px] w-full data-[state=active]:text-primary-0 data-[state=active]:border-primary-0 data-[state=active]:shadow-none  flex items-center justify-center gap-x-2"
                                value="multi"
                            >
                                <List size={20} /> Multi links
                            </TabsTrigger>
                            <TabsTrigger
                                value="pdf"
                                className="border border-tertiary-700 shadow-none text-black h-[48px] w-full data-[state=active]:text-primary-0 data-[state=active]:border-primary-0 data-[state=active]:shadow-none flex items-center justify-center gap-x-2"
                            >
                                <PiFilePdfDuotone size={20} /> PDF
                            </TabsTrigger>
                            <TabsTrigger
                                value="vCard"
                                className="border border-tertiary-700 shadow-none text-black h-[48px] w-full data-[state=active]:text-primary-0 data-[state=active]:border-primary-0 data-[state=active]:shadow-none flex items-center justify-center gap-x-2"
                            >
                                <PiIdentificationCard size={20} /> vCard Plus
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
    );
};

export default QrCodeSelectTabs;
