import { Button } from '@shtcut-ui/react';
import BreadCrumb from '@shtcut/components/bread-crumb';
import React, { useState } from 'react';
import QrCodeSelectTabs from '../qr-code-select-tabs';

const QRCodeCreateComponent = () => {
    const [selectedColor, setSelectedColor] = useState<string>('#000000');

    const handleColorClick = (colorValue: string) => {
        setSelectedColor(colorValue);
    };
    return (
        <div className="my-[38px] ">
            <BreadCrumb currentRoute="Create QR Code" />
            <div className="flex justify-between  items-center">
                <h1 className="font-semibold text-[#2B2829] text-2xl">Create QR Codes</h1>
                <Button className="bg-primary-0 flex justify-center items-center gap-x-2">
                    Next <div className="border border-white w-2 h-2 font-semibold rounded-full" />
                </Button>
            </div>
            <div className="flex mt-[22px] gap-7">
                <div className="w-full">
                    <div className="">
                        <QrCodeSelectTabs handleColorClick={handleColorClick} />
                    </div>
                </div>
                <div className="bg-white w-1/2 p-[23px]">
                    <h2 className="text-lg font-medium ">Preview</h2>

                    <div
                        style={{ backgroundColor: selectedColor }}
                        className={`bg-[${selectedColor}] flex justify-center items-center rounded-md w-20 h-20`}
                    >
                        <h1>hey</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QRCodeCreateComponent;
