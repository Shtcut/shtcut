'use client';

import { Button, Input } from '@shtcut-ui/react';
import { LinkCheckBox } from '@shtcut/components/_shared/LinkCheckBox';
import { IconCopy } from '@tabler/icons-react';
import {
    BarChart3Icon,
    BarChart4Icon,
    Clock5Icon,
    Clock6Icon,
    Code2Icon,
    FacebookIcon,
    InstagramIcon,
    MailIcon,
    MessageCircleIcon,
    PaperclipIcon,
    Repeat1Icon,
    UploadIcon,
    YoutubeIcon
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { QRCode } from 'react-qrcode-logo';

import QRCodeStyling, {
    DrawType,
    TypeNumber,
    Mode,
    ErrorCorrectionLevel,
    DotType,
    CornerSquareType,
    CornerDotType,
    Extension,
    Options
} from 'qr-code-styling';
import Image from 'next/image';
import { LOGO_FAV_ICON, QR_CORNER_PATTERNS, SOCIAL_ICONS_LOGOS } from '@shtcut/_shared/constant';

export const QRCodeForm = () => {
    const [isRemoveLogo, setIsRemoveLogo] = useState(false);
    const [qrCodePattern, setQrCodePattern] = useState('L');
    const [qrCodeLogo, setQrCodeLogo] = useState(LOGO_FAV_ICON);

    const [options, setOptions] = useState<Options>({
        width: 300,
        height: 300,
        type: 'svg' as DrawType,
        data: 'https://app.shtcut.link/',
        image: qrCodeLogo,
        margin: 10,
        qrOptions: {
            typeNumber: 0 as TypeNumber,
            mode: 'Byte' as Mode,
            errorCorrectionLevel: 'Q' as ErrorCorrectionLevel
        },
        imageOptions: {
            hideBackgroundDots: true,
            imageSize: 0.4,
            margin: 20,
            crossOrigin: 'anonymous'
        },
        dotsOptions: {
            color: '#222222',
            type: 'classy' as DotType
        },
        cornersSquareOptions: {
            color: '#222222',
            type: 'extra-rounded' as CornerSquareType
            // gradient: {
            //   type: 'linear', // 'radial'
            //   rotation: 180,
            //   colorStops: [{ offset: 0, color: '#25456e' }, { offset: 1, color: '#4267b2' }]
            // },
        },
        cornersDotOptions: {
            color: '#222222',
            type: 'dot' as CornerDotType,
            gradient: {
                type: 'linear', // 'radial'
                rotation: 180,
                colorStops: [
                    { offset: 0, color: '#00266e' },
                    { offset: 1, color: '#4060b3' }
                ]
            }
        }
    });
    const [fileExt, setFileExt] = useState<Extension>('svg');
    const [qrCode] = useState<QRCodeStyling>(new QRCodeStyling(options));
    const ref = useRef<HTMLDivElement>(null);

    const handleOnChangePattern = (e, pattern) => {
        e.preventDefault();
        setQrCodePattern(pattern);
    };

    const handleOnChangeLogo = (e, logo) => {
        e.preventDefault();
        setOptions((prev) => ({
            ...prev,
            image: logo,
        }))
    };

    const onDownloadClick = () => {
        if (!qrCode) return;
        qrCode.download({
            extension: fileExt
        });
    };

    useEffect(() => {
        if (ref.current) {
            qrCode.append(ref.current);
        }
    }, [qrCode, ref]);

    useEffect(() => {
        if (!qrCode) return;
        qrCode.update(options);
    }, [qrCode, options]);


    return (
        <>
            <div className="flex items-center justify-between space-y-2">
                <h1 className="text-2xl font-bold tracking-light md:text-3xl">Create QR Code</h1>
                <div className="flex items-center space-x-2">
                    <Button>Cancel</Button>
                </div>
            </div>
            <div className="w-full my-8 p-6 bg-white  border rounded-lg">
                <div className="flex gap-8">
                    <div className="flex flex-col w-1/4  border rounded-lg p-6">
                        <h2 className="text-lg font-semibold mb-4">Logos</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {SOCIAL_ICONS_LOGOS.map(({ name, image }, idx) => (
                                <div
                                    className="w-100 h-100 border rounded-md justify-center bg-gray-100 cursor-pointer"
                                    key={`${name}`}
                                    onClick={(e) => handleOnChangeLogo(e, image)}
                                >
                                    <Image
                                        className="flex items-center justify-center border rounded-md"
                                        src={image}
                                        alt={name}
                                        width={50}
                                        height={50}
                                    />
                                </div>
                            ))}
                        </div>
                        <h2 className="text-lg font-semibold mb-4 mt-5">Destination</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <Button className="bg-[#eff3fe]">
                                <FacebookIcon className="text-[#3b82f6]" />
                            </Button>
                            <Button className="bg-[#eff3fe]">
                                <PaperclipIcon className="text-[#3b82f6]" />
                            </Button>
                            <Button className="bg-[#eff3fe]">
                                <YoutubeIcon className="text-[#3b82f6]" />
                            </Button>
                            <Button className="bg-[#eff3fe]">
                                <FacebookIcon className="text-[#3b82f6]" />
                            </Button>
                            <Button className="bg-[#eff3fe]">
                                <UploadIcon className="text-[#3b82f6]" />
                            </Button>
                            <Button className="bg-[#eff3fe]">
                                <InstagramIcon className="text-[#3b82f6]" />
                            </Button>
                            <Button className="bg-[#eff3fe]">
                                <MessageCircleIcon className="text-[#3b82f6]" />
                            </Button>
                            <Button className="bg-[#eff3fe]">
                                <MailIcon className="text-[#3b82f6]" />
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-col w-1/2 border rounded-md p-6">
                        <h2 className="text-lg font-semibold mb-4">Enter your website URL</h2>
                        <Input className="mb-8" placeholder="URL the website" />
                        <h2 className="text-lg font-semibold mb-4">Live Preview</h2>
                        <div className="flex justify-center mb-4">
                            <div ref={ref} className="h-35 w-35" />
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
                                or enter the code manually
                            </p>
                            <div className="flex justify-center">
                                <Input className="text-center" placeholder="HLA8G4L1B9ZX4" type="text" />
                                <Button className="ml-2" variant="ghost">
                                    <IconCopy className="h-5 w-5 text-gray-500" />
                                </Button>
                            </div>
                        </div>
                        <div className="flex justify-center mb-6">
                            <Button className="w-full" onClick={onDownloadClick}>
                                Continue
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-col w-1/4 border rounded-md p-5">
                        <h2 className="text-lg font-semibold mb-4">Pattern</h2>
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            {['L', 'M', 'Q', 'H'].map((p, idx) => (
                                <div key={`${p}-${idx}`} onClick={(e) => handleOnChangePattern(e, p)}>
                                    <QRCode
                                        id="shtcut-qrcode"
                                        value={''}
                                        ecLevel={p as any}
                                        quietZone={10}
                                        fgColor={'#000000'}
                                        size={50}
                                        qrStyle="dots"
                                        style={{
                                            aspectRatio: '192/192',
                                            objectFit: 'cover',
                                            cursor: 'pointer'
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                        <h2 className="text-lg font-semibold">Frame</h2>
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            {[...Array(8)].map((_, idx) => (
                                <Image
                                    className="cursor-pointer"
                                    key={idx}
                                    src={`/svg/qrcode-scanner-${idx + 1}.svg`}
                                    alt={`qrcode-scanner-${idx + 1}`}
                                    width={500}
                                    height={500}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
