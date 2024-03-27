'use client';

import { Button, Input } from '@shtcut-ui/react';
import { LinkCheckBox } from '@shtcut/components/_shared/LinkCheckBox';
import { IconCopy } from '@tabler/icons-react';
import { QrCodeIcon } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { QRCode } from 'react-qrcode-logo';

export const LinkQrCodeForm = () => {
    const [isRemoveLogo, setIsRemoveLogo] = useState(false);

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
                        value="https://www.npmjs.com/package/react-qr-code"
                        removeQrCodeBehindLogo={true}
                        ecLevel="L"
                        logoImage="/favicon.ico"
                        logoHeight={35}
                        logoWidth={35}
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
                    <p className="text-center text-xs text-gray-500 uppercase mb-2">or enter the code manually</p>
                    <div className="flex justify-center">
                        <Input className="text-center" placeholder="HLA8G4L1B9ZX4" type="text" />
                        <Button className="ml-2" variant="ghost">
                            <IconCopy className="h-5 w-5 text-gray-500" />
                        </Button>
                    </div>
                </div>
                <div className="flex justify-center mb-6">
                    <Button className="w-full">Continue</Button>
                </div>
            </div>
        </div>
    );
};
