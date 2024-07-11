import { QrCodeFrameType } from '@shtcut/types/types';
import React from 'react';
import { QRCode } from 'react-qrcode-logo';

const Frame_5 = ({ bgColor, btnColor, qrCodeName, selectedColor, qrCodeLogo }: QrCodeFrameType) => {
    return (
        <div className="h-full flex flex-col justify-center">
            <div className={` border-[3.2px]   w-fit rounded-t-[6px]`} style={{ borderColor: bgColor }}>
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
            <div
                className=" h-10 flex rounded-b-[3px] justify-center items-center w-full"
                style={{ backgroundColor: bgColor }}
            >
                <p style={{ color: bgColor === '#000000' ? 'white' : btnColor }} className={`text-sm uppercase`}>
                    {qrCodeName ? qrCodeName : 'My qrcode'}
                </p>
            </div>
        </div>
    );
};

export default Frame_5;
