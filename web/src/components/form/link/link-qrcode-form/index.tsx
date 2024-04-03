'use client';

import { Button, Dict } from '@shtcut-ui/react';
import { LinkCheckBox } from '@shtcut/components/_shared/LinkCheckBox';
import { QrCodeIcon } from 'lucide-react';
import { useState } from 'react';
import { QRCode } from 'react-qrcode-logo';
import { HexColorPicker } from 'react-colorful';

interface LinkQRCodeForm {
    url: string;
    removeLogo?: boolean;
    enableBrandLogo?: boolean;
    handleSubmit: (payload: Dict) => void;
}

export const LinkQrCodeForm = (props: LinkQRCodeForm) => {
    const { removeLogo, enableBrandLogo, url, handleSubmit } = props;
    const [isRemoveLogo, setIsRemoveLogo] = useState(removeLogo ?? false);
    const [color, setColor] = useState('#000000');

    const handleOnClick = () => {
        const payload = {
            fgColor: color,
            value: url,
            logoImage: '/favicon.ico'
        };
        console.log('payload:::', payload);
        handleSubmit(payload);
    };

    return (
        <div className="flex justify-center p-6">
            <div className="bg-white rounded-lg max-w-sm w-full p-8">
                <div className="flex justify-center mb-6">
                    <QrCodeIcon className="text-gray-400 h-6 w-6" />
                </div>
                <h1 className="text-center text-xl font-semibold mb-2">Retrieve the QR code.</h1>
                <p className="text-center text-sm text-gray-500 mb-6">
                    Customize the QR code if needed (e.g., adjust size, color, or add a logo).
                </p>
                <div className="flex justify-center mb-4">
                    <QRCode
                        value={url}
                        removeQrCodeBehindLogo={true}
                        ecLevel="L"
                        logoImage="/favicon.ico"
                        logoHeight={35}
                        logoWidth={35}
                        fgColor={color}
                        logoPaddingStyle={'circle'}
                        style={{
                            aspectRatio: '192/192',
                            objectFit: 'cover'
                        }}
                    />
                </div>
                <LinkCheckBox
                    isChecked={isRemoveLogo}
                    setIsChecked={setIsRemoveLogo}
                    id={'remove-logo-required-checkbox'}
                    name={'password-required-checkbox'}
                    label={'Remove Logo'}
                    disabled={true}
                    description={
                        <span>
                            Click to remove the Shtcut logo.
                            <a className="underline" href="#" target="_blank">
                                Upgrade{' '}
                            </a>
                        </span>
                    }
                />
                <div className="border-t border-b py-4 my-6">
                    <p className="text-center text-xs text-gray-500 uppercase mb-2">
                        or manually change the QRCode Color
                    </p>
                    <div className="flex justify-center">
                        <HexColorPicker color={color} onChange={setColor} />
                    </div>
                </div>
                <div className="flex justify-center mb-2">
                    <Button className="w-full" onClick={handleOnClick}>
                        Continue
                    </Button>
                </div>
            </div>
        </div>
    );
};
