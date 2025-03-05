import useGeneralState from '@shtcut/hooks/general-state';
import useQrCodeState from '@shtcut/hooks/qrcode/index.';
import { EyeRadiusType } from '@shtcut/types/types';
import React from 'react';
import { QRCode } from 'react-qrcode-logo';
const Frame_7 = () => {
    const { presetColorString, tabParams, borderColor, urlScan } = useGeneralState();
    const { state } = useQrCodeState();
    return (
        <div className="w-full flex items-center justify-center h-full flex-1 flex-col">
            <div className={` border-[3.2px]  w-fit rounded-[6px]`} style={{ borderColor: borderColor }}>
                <QRCode
                    id="shtcut-qrcode"
                    value={urlScan as string}
                    removeQrCodeBehindLogo={true}
                    ecLevel="H"
                    bgColor="white"
                    fgColor={tabParams !== 'website' ? state?.presetColor : presetColorString}
                    size={90}
                    logoWidth={20}
                    logoHeight={20}
                    logoImage={String(state?.logo)}
                    qrStyle={state?.qrStyle as 'squares' | 'dots' | 'fluid'}
                    eyeRadius={state?.eyeRadius as EyeRadiusType}
                />
            </div>
            <div
                className=""
                style={{
                    width: 0,
                    height: 0,
                    borderLeft: '13px solid transparent',
                    borderRight: '13px solid transparent',
                    borderBottom: `12px solid ${borderColor}`
                }}
            ></div>

            <div
                className=" flex  justify-center items-center  w-full h-10 rounded-[6px]  "
                style={{ backgroundColor: borderColor }}
            >
                <p className={`text-sm  uppercase`}>{state?.title ? String(state?.title) : 'SCAN ME'}</p>
            </div>
        </div>
    );
};

export default Frame_7;
