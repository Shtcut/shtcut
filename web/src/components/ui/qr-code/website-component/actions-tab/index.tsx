import { Tabs, TabsList, TabsTrigger, TabsContent } from '@shtcut-ui/react';
import React from 'react';
import ColorsQrCode from './colors-component';
import { PropsColor } from '@shtcut/types/types';

const ActionQrCodeTab = ({ handleColorClick }:PropsColor) => {
    return (
        <div className="mt-8">
            <Tabs defaultValue="frame" className="">
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
                    <TabsContent value="frame">frame</TabsContent>
                    <TabsContent value="shape">Shape</TabsContent>
                    <TabsContent value="logo">Logo</TabsContent>
                    <TabsContent value="colors">
                        <ColorsQrCode handleColorClick={handleColorClick} />
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
};

export default ActionQrCodeTab;
