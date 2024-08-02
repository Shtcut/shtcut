import { QrCodeFrameType } from '@shtcut/types/types';
import React from 'react';
import { QRCode } from 'react-qrcode-logo';

const Frame_9 = ({
    bgColor,
    btnColor,
    qrCodeName,
    selectedColor,
    qrCodeLogo,
    qrCodeShape,
    eyeRadius
}: QrCodeFrameType) => {
    return (
        <div className="h-full flex flex-col justify-center">
            <div
                className=" h-11 flex rounded-t-[6px] justify-center items-center w-full"
                style={{ backgroundColor: bgColor }}
            >
                <p style={{ color: bgColor === '#000000' ? 'white' : btnColor }} className={`text-sm  uppercase`}>
                    {qrCodeName ? qrCodeName : 'My qrcode'}
                </p>
            </div>
            <div className={` border-[3.2px]   w-fit rounded-b-[6px]`} style={{ borderColor: bgColor }}>
                <QRCode
                    id="shtcut-qrcode"
                    value={''}
                    removeQrCodeBehindLogo={true}
                    ecLevel="L"
                    fgColor={selectedColor}
                    size={90}
                    logoWidth={30}
                    logoHeight={30}
                    eyeColor={''}
                    logoImage={qrCodeLogo}
                    qrStyle={qrCodeShape}
                    eyeRadius={eyeRadius}
                />
            </div>
        </div>
    );
};

export default Frame_9;
