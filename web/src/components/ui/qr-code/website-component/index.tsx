import { Input } from '@shtcut-ui/react';
import React from 'react';
import ActionQrCodeTab from './actions-tab';
import { PropsColor } from '@shtcut/types/types';

const WebsiteComponent = ({ handleColorClick }:PropsColor) => {
    return (
        <div className=" flex flex-col gap-2">
            <div className="bg-white p-[23px] rounded-[10px]">
                <p className="font-medium mb-4">Website URL</p>
                <Input placeholder="https//shtcut/help/example/what-is-shtcut" />
            </div>
            <section className="p-[23px] rounded-[10px] bg-white">
                <div className="mt-8  flex flex-col gap-1 ">
                    <p className="font-medium">Appearance</p>
                    <p className="text-xs text-[#433E3F]">Customize style and template</p>
                </div>
                <div>
                    <ActionQrCodeTab handleColorClick={handleColorClick} />
                </div>
            </section>
        </div>
    );
};

export default WebsiteComponent;
