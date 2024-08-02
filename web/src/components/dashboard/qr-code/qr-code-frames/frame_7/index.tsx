import { QrCodeFrameType } from '@shtcut/types/types';
import React from 'react';
import { QRCode } from 'react-qrcode-logo';
const Frame_7 = ({
    bgColor,
    btnColor,
    qrCodeName,
    selectedColor,
    qrCodeLogo,
    qrCodeShape,
    eyeRadius
}: QrCodeFrameType) => {
    return (
        <div className="w-full flex items-center justify-center h-full flex-1 flex-col">
            <div className={` border-[3.2px]  w-fit rounded-[6px]`} style={{ borderColor: bgColor }}>
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
                className=""
                style={{
                    width: 0,
                    height: 0,
                    borderLeft: '13px solid transparent',
                    borderRight: '13px solid transparent',
                    borderBottom: `12px solid ${bgColor}`
                }}
            ></div>

            <div
                className=" flex  justify-center items-center  w-full h-10 rounded-[6px]  "
                style={{ backgroundColor: bgColor }}
            >
                <p style={{ color: bgColor === '#000000' ? 'white' : btnColor }} className={`text-sm  uppercase`}>
                    {qrCodeName ? qrCodeName : 'SCAN ME'}
                </p>
            </div>
        </div>
    );
};

export default Frame_7;
