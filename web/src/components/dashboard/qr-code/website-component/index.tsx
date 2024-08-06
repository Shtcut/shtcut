import { Input } from '@shtcut-ui/react';
import React from 'react';
import ActionQrCodeTab from './actions-tab';
import { PropsColor } from '@shtcut/types/types';
import Stepper from '@shtcut/components/stepper/horizontal-stepper';
import QrCodeName from './qr-code-name';

const WebsiteComponent = ({
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
        <div className=" flex flex-col shadow-sm border border-gray-100  rounded-[10px] gap-2">
            <section className="w-full h-24  bg-white rounded-[10px]">
                <Stepper step={step} />
            </section>
            {step === 1 && (
                <div className="bg-white p-[23px] rounded-[10px]">
                    <p className="font-medium text-sm mb-2">Website URL</p>
                    <Input placeholder="https//shtcut/help/example/what-is-shtcut" />
                </div>
            )}

            {step === 2 && (
                <section className="p-[23px] rounded-[10px] bg-white">
                    <div className="  flex flex-col gap-1 ">
                        <p className="font-medium">Appearance</p>
                        <p className="text-xs text-[#433E3F]">Customize style and template</p>
                    </div>
                    <div>
                        <ActionQrCodeTab
                            handleColorClick={handleColorClick}
                            setBgColor={setBgColor}
                            bgColor={bgColor}
                            setBtnColor={setBtnColor}
                            btnColor={btnColor}
                            setSelectedFrame={setSelectedFrame}
                            handleSelectQrCodeLogo={handleSelectQrCodeLogo}
                            selectedFrame={selectedFrame}
                            handleChangeQrCodeShape={handleChangeQrCodeShape}
                            handleEyeRadiusChange={handleEyeRadiusChange}
                        />
                    </div>
                </section>
            )}
            {step === 3 && (
                <QrCodeName
                    handleInputChange={handleInputChange}
                    qrCodeName={qrCodeName}
                    handleColorClick={handleColorClick}
                />
            )}
        </div>
    );
};

export default WebsiteComponent;
