import { QrCodeFrameType } from '@shtcut/types/types';

import React from 'react';
import { QRCode } from 'react-qrcode-logo';

const Frame_6 = ({
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
            <div className={'border-[3.2px]  w-fit rounded-[6px]'} style={{ borderColor: bgColor }}>
                <QRCode
                    id="shtcut-qrcode"
                    value={''}
                    removeQrCodeBehindLogo={true}
                    ecLevel="L"
                    bgColor="white"
                    fgColor={selectedColor}
                    size={90}
                    logoWidth={30}
                    logoHeight={30}
                    logoImage={qrCodeLogo}
                    qrStyle={qrCodeShape}
                    eyeRadius={eyeRadius}
                />
            </div>
            <div
                className=" border mt-2 rounded-[6px] h-10 flex  justify-center items-center w-full"
                style={{ backgroundColor: bgColor }}
            >
                <p style={{ color: bgColor === '#000000' ? 'white' : btnColor }} className={'text-sm  uppercase'}>
                    {qrCodeName ? qrCodeName : 'SCAN ME'}
                </p>
            </div>
        </div>
    );
};

export default Frame_6;
