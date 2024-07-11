import { QrCodeFrameType } from '@shtcut/types/types';
import React from 'react';
import { QRCode } from 'react-qrcode-logo';

const Frame_3 = ({ bgColor, btnColor, qrCodeName, selectedColor, qrCodeLogo }: QrCodeFrameType) => {
    return (
        <div className="flex flex-col justify-center items-center flex-1 h-full  w-full">
            <div className="flex justify-center items-center   relative ">
                {/* Top Left */}
                <div className="absolute top-0 left-0 w-16 h-16" style={{ backgroundColor: 'transparent' }}>
                    <div
                        className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 "
                        style={{ borderColor: bgColor }}
                    ></div>
                </div>
                {/* Top Right */}
                <div style={{ backgroundColor: 'transparent' }} className="absolute top-0 right-0 w-16 h-16">
                    <div
                        className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 "
                        style={{ borderColor: bgColor }}
                    ></div>
                </div>
                {/* Bottom Left */}
                <div style={{ backgroundColor: 'transparent' }} className="absolute bottom-0 left-0 w-16 h-16">
                    <div
                        className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 "
                        style={{ borderColor: bgColor }}
                    ></div>
                </div>
                {/* Bottom Right */}
                <div style={{ backgroundColor: 'transparent' }} className="absolute bottom-0 right-0 w-16 h-16">
                    <div
                        className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 "
                        style={{ borderColor: bgColor }}
                    ></div>
                </div>
                {/* Center Text */}
                <div className="absolute ">
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
                        // qrStyle="dots"
                        eyeRadius={[
                            { outer: 10, inner: 4 }, // Top-left eye
                            { outer: 10, inner: 4 }, // Top-right eye
                            { outer: 10, inner: 4 } // Bottom-left eye
                        ]}
                    />
                </div>
            </div>
            <div className="relative top-20">
                <p style={{ color: btnColor ? btnColor : 'white' }} className={`text-sm uppercase`}>
                    {qrCodeName ? qrCodeName : 'SCAN ME'}
                </p>
            </div>
        </div>
    );
};

export default Frame_3;
