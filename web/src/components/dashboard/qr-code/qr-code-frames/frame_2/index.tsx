import { QrCodeFrameType } from '@shtcut/types/types';
import React from 'react';
import { QRCode } from 'react-qrcode-logo';

const Frame_2 = ({
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
            <div className={` border-[3.2px]   w-fit rounded-[6px]`} style={{ borderColor: bgColor }}>
                <QRCode
                    id="shtcut-qrcode"
                    value={'https://meet.google.com/landing'}
                    removeQrCodeBehindLogo={true}
                    ecLevel="L"
                    fgColor={selectedColor}
                    size={90}
                    logoWidth={30}
                    logoHeight={30}
                    logoImage={qrCodeLogo}
                    qrStyle={qrCodeShape}
                    eyeRadius={eyeRadius}
                />
            </div>
            <div className=" h-10 flex rounded-b-[6px] justify-center items-center w-full">
                <p style={{ color: btnColor ? btnColor : 'black' }} className={`text-sm  uppercase`}>
                    {qrCodeName ? qrCodeName : 'SCAN ME'}
                </p>
            </div>
        </div>
    );
};

export default Frame_2;
