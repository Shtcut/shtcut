import { Button } from '@shtcut-ui/react';
import { QrCodeFrameType } from '@shtcut/types/types';
import Image from 'next/image';
import React from 'react';
import { QRCode } from 'react-qrcode-logo';
import { Download } from 'lucide-react';

const DownloadQrCode = ({
    eyeRadius,
    selectedColor,
    qrCodeShape,
    qrCodeLogo,
    qrCodeName,
    cancelModal
}: QrCodeFrameType) => {
    return (
        <div className="flex flex-col gap-4 items-center">
            <div className="flex flex-col items-center gap-2">
                {qrCodeLogo ? <Image src={qrCodeLogo as string} width={50} height={50} alt="qr-code" /> : <div></div>}
                <p className="font-semibold text-lg">Download QR Code</p>
            </div>
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
                qrStyle={qrCodeShape}
                eyeRadius={eyeRadius}
            />
            <div>{qrCodeName}</div>
            <div className="flex items-center w-full gap-4">
                <Button variant={'outline'} className="w-full" onClick={cancelModal}>
                    Cancel
                </Button>
                <Button className="w-full flex items-center gap-x-2 bg-primary-0">
                    <Download size={16} />
                    Download
                </Button>
            </div>
        </div>
    );
};

export default DownloadQrCode;
