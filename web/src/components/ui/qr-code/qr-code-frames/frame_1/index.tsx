import { QrCodeFrameType } from '@shtcut/types/types';
import React from 'react';
import { QRCode } from 'react-qrcode-logo';
const Frame_1 = ({ bgColor, selectedColor, qrCodeLogo,  }: QrCodeFrameType) => {
    return (
        <div className="h-full flex flex-col justify-center">
            <div className={` border-[3.2px]  w-fit rounded-[6px]`} style={{ borderColor: bgColor }}>
                <QRCode
                    id="shtcut-qrcode"
                    value={''}
                    removeQrCodeBehindLogo={true}
                    ecLevel="L"
                    fgColor={selectedColor}
                    size={90}
                    logoWidth={30}
                    logoHeight={30}
                    logoImage={qrCodeLogo}
                />
            </div>
        </div>
    );
};

export default Frame_1;
