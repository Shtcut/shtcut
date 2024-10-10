import { Input } from '@shtcut-ui/react';
import { PropsColor } from '@shtcut/types/types';
import React from 'react';

const QrCodeName = ({ qrCodeName, handleInputChange }: PropsColor) => {
    return (
        <div className="bg-white p-[23px] rounded-[10px]">
            <p className="font-medium text-sm">Name QR Code</p>
            <p className="text-xs text-[#433E3]">Enter a name for this code</p>
            <div className="mt-[18px]">
                <Input className='' placeholder="QR Code" value={qrCodeName} onChange={handleInputChange} maxLength={12} />
            </div>
        </div>
    );
};

export default QrCodeName;
