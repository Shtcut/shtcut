'use client';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@shtcut-ui/react';
import React, { useState } from 'react';
import ColorsQrCode from './colors-component';
import { PropsColor } from '@shtcut/types/types';
import LogosQrCode from './logos-qrcode';
import FramesSelector from '../../qr-code-frames/frame-selector';
import QrCodeShapes from './qrcode-shape';
import PresetTab from '../preset-tab';

const ActionQrCodeTab = ({
    setBgColor,
    bgColor,
    btnColor,
    setBtnColor,
    handleColorClick,
    setSelectedFrame,
    handleSelectQrCodeLogo,
    selectedFrame,
    handleChangeQrCodeShape,
    handleEyeRadiusChange
}: PropsColor) => {
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);
    const tabs = [
        { id: 'frame', label: 'Frame' },
        { id: 'shape', label: ' Shape' },
        { id: 'logo', label: '      Logo' },
        { id: 'colors', label: 'Colors' }
    ];
    const handleTabClick = (index: number) => {
        setSelectedTabIndex(index);
    };
    return (
        <div className="mt-5">
            <div className='w-80'>
                <PresetTab
                    tabs={tabs}
                    selectedTabIndex={selectedTabIndex}
                    onTabClick={handleTabClick}
                    activeTextClassName="text-white"
                />
            </div>
            <div className="pt-10">
                {selectedTabIndex === 0 && (
                    <FramesSelector setSelectedFrame={setSelectedFrame} selectedFrame={selectedFrame} />
                )}
                {selectedTabIndex === 1 && (
                    <QrCodeShapes
                        handleChangeQrCodeShape={handleChangeQrCodeShape}
                        handleEyeRadiusChange={handleEyeRadiusChange}
                    />
                )}
                {selectedTabIndex === 2 && <LogosQrCode handleSelectQrCodeLogo={handleSelectQrCodeLogo} />}
                {selectedTabIndex === 3 && (
                    <ColorsQrCode
                        handleColorClick={handleColorClick}
                        setBgColor={setBgColor}
                        bgColor={bgColor}
                        setBtnColor={setBtnColor}
                        btnColor={btnColor}
                    />
                )}
            </div>
        </div>
    );
};

export default ActionQrCodeTab;
