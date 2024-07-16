import { Tabs, TabsList, TabsTrigger, TabsContent } from '@shtcut-ui/react';
import React from 'react';
import ColorsQrCode from './colors-component';
import { PropsColor } from '@shtcut/types/types';
import LogosQrCode from './logos-qrcode';
import FramesSelector from '../../qr-code-frames/frame-selector';
import QrCodeShapes from './qrcode-shape';

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
    return (
        <div className="mt-5">
            <Tabs defaultValue="shape" className="">
                <TabsList className="block bg-transparent border w-fit h-[40px] gap-0   ">
                    <TabsTrigger
                        value="frame"
                        className="data-[state=active]:bg-primary-0 data-[state=active]:text-white"
                    >
                        Frame
                    </TabsTrigger>
                    <TabsTrigger
                        value="shape"
                        className="data-[state=active]:bg-primary-0 data-[state=active]:text-white"
                    >
                        Shape
                    </TabsTrigger>
                    <TabsTrigger
                        value="logo"
                        className="data-[state=active]:bg-primary-0 data-[state=active]:text-white"
                    >
                        Logo
                    </TabsTrigger>
                    <TabsTrigger
                        value="colors"
                        className="data-[state=active]:bg-primary-0 data-[state=active]:text-white"
                    >
                        Colors
                    </TabsTrigger>
                </TabsList>
                <div className="mt-2">
                    <p className="text-sm py-3 font-medium">Presets</p>
                    <TabsContent value="frame">
                        <FramesSelector setSelectedFrame={setSelectedFrame} selectedFrame={selectedFrame} />
                    </TabsContent>
                    <TabsContent value="shape">
                        <QrCodeShapes
                            handleChangeQrCodeShape={handleChangeQrCodeShape}
                            handleEyeRadiusChange={handleEyeRadiusChange}
                        />
                    </TabsContent>
                    <TabsContent value="logo">
                        <LogosQrCode handleSelectQrCodeLogo={handleSelectQrCodeLogo} />
                    </TabsContent>
                    <TabsContent value="colors">
                        <ColorsQrCode
                            handleColorClick={handleColorClick}
                            setBgColor={setBgColor}
                            bgColor={bgColor}
                            setBtnColor={setBtnColor}
                            btnColor={btnColor}
                        />
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
};

export default ActionQrCodeTab;
