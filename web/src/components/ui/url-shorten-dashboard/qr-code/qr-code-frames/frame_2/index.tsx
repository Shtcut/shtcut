import { qrCodeSelectors } from '@shtcut/redux/slices/qr-code';
import { QrCodeFrameType } from '@shtcut/types/types';
import React from 'react';
import { QRCode } from 'react-qrcode-logo';
import { useSelector } from 'react-redux';

const Frame_2 = ({ btnColor, qrCodeName, eyeRadius }: QrCodeFrameType) => {
    const selectedColor = useSelector(qrCodeSelectors.selectSelectedColor);
    const qrCodeLogo = useSelector(qrCodeSelectors.selectQrCodeLogo);
    const qrCodeShape = useSelector(qrCodeSelectors.selectQrCodeShape);
    const bgColor = useSelector(qrCodeSelectors.selectBgColor);
    return (
        <div className="h-full flex flex-col justify-center">
            <div className={` border-[3.2px]   w-fit rounded-[6px]`} style={{ borderColor: String(bgColor) }}>
                <QRCode
                    id="shtcut-qrcode"
                    value={'https://meet.google.com/landing'}
                    removeQrCodeBehindLogo={true}
                    ecLevel="L"
                    fgColor={String(selectedColor)}
                    size={90}
                    logoWidth={30}
                    logoHeight={30}
                    logoImage={String(qrCodeLogo)}
                    qrStyle={qrCodeShape as 'squares' | 'dots' | 'fluid'}
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
