'use client';

import { Button, Input, toast } from '@shtcut-ui/react';
import { LinkCheckBox } from '@shtcut/components/_shared/LinkCheckBox';
import { IconCopy } from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';
import { QRCode } from 'react-qrcode-logo';
import satori from 'satori';

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
import { LOGO_FAV_ICON, QR_CORNER_PATTERNS, QR_PATTERNS, SOCIAL_ICONS_LOGOS, font } from '@shtcut/_shared/constant';
import { isEmpty } from 'lodash';
import { isValidURL } from '@shtcut/_shared';

export const QRCodeForm = () => {
    const [isRemoveLogo, setIsRemoveLogo] = useState(false);
    const [qrCodeLogo, setQrCodeLogo] = useState(LOGO_FAV_ICON);
    const [link, setLink] = useState('https://shtcut.link/');

    const [options, setOptions] = useState<Options>({
        width: 250,
        height: 250,
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
    const [qrCode] = useState<QRCodeStyling>(new QRCodeStyling(options));
    const ref = useRef<HTMLDivElement>(null);

    const handleOnChangeLink = (e) => {
        const { value } = e.target;
        setLink(value);
        setOptions((prev) => ({
            ...prev,
            data: !isEmpty(value) ? value : 'https://shtcut.link/'
        }));
    };

    const handleOnChangeLogo = (e, logo) => {
        e.preventDefault();
        setQrCodeLogo(logo);
        setOptions((prev) => ({
            ...prev,
            image: logo
        }));
    };

    const handleOnChangePattern = (e, pattern) => {
        e.preventDefault();
        console.log('pattern::', pattern);
        setOptions((prev) => ({
            ...prev,
            dotsOptions: {
                color: '#222222',
                type: pattern as DotType
            }
        }));
    };

    const handleOnChangeCornerPattern = (e, pattern) => {
        e.preventDefault();
        setOptions((prev) => ({
            ...prev,
            cornersSquareOptions: {
                color: '#222222',
                type: pattern as CornerSquareType
            },
            cornersDotOptions: {
                color: '#222222',
                type: pattern as CornerDotType
            }
        }));
    };

    const onDownloadClick = async () => {
        if (!qrCode) return;
        if (isEmpty(link)) {
            if (!isValidURL(link)) {
                toast({
                    variant: 'destructive',
                    description: 'Link must be a valid URL'
                });
                return;
            }
            toast({
                variant: 'destructive',
                description: 'Link is required'
            });
            return;
        }
        const svg = await qrCode.getRawData('svg');
        console.log('svg::', svg);
        const objectUrl = URL.createObjectURL(svg as Blob);
        const qrSvg = await satori(
            <div
                tw="border rounded-md"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <span>Hello World</span>
                <img src={objectUrl} height={200} width={200} />
            </div>,
            {
                width: 800,
                height: 800,
                fonts: [
                    {
                        name: 'CalSans-SemiBold',
                        data: await font,
                        weight: 700,
                        style: 'normal'
                    }
                ]
            }
        );
        const blob = new Blob([qrSvg], { type: 'image/svg+xml' });
        const qrCodeObjectUrl = URL.createObjectURL(blob);
        const qrCodeLink = document.createElement('a');
        qrCodeLink.href = qrCodeObjectUrl;
        qrCodeLink.download = 'qrCode.svg';
        document.body.appendChild(qrCodeLink);
        qrCodeLink.click();
        document.body.removeChild(qrCodeLink);

        setTimeout(() => URL.revokeObjectURL(qrCodeObjectUrl), 5000);
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
                    <button>Cancel</button>
                </div>
            </div>
            <div className="w-full my-8 p-6 bg-white  border rounded-lg">
                <div className="flex gap-8">
                    <div className="flex flex-col w-1/4  border rounded-lg p-6">
                        <h2 className="text-lg font-semibold mb-4">Logos</h2>
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
                        <div className="grid grid-cols-2 gap-4 mt-5">
                            {SOCIAL_ICONS_LOGOS.map(({ name, image }, idx) => (
                                <div
                                    className="w-100 h-100 border rounded-md p-4 justify-center bg-gray-100 cursor-pointer"
                                    key={`${name}`}
                                    onClick={(e) => handleOnChangeLogo(e, image)}
                                >
                                    <Image
                                        className="flex items-center justify-center"
                                        src={image}
                                        alt={name}
                                        width={50}
                                        height={50}
                                    />
                                </div>
                            ))}
                        </div>
                        <h2 className="text-lg font-semibold mb-4 mt-5">Frame</h2>
                        <div className="grid grid-cols-2 gap-4">
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
                    <div className="flex flex-col w-1/2 border rounded-md p-6">
                        <h2 className="text-lg font-semibold mb-4">Enter your website URL</h2>
                        <Input className="mb-8" placeholder="URL the website" onChange={handleOnChangeLink} />
                        <h2 className="text-lg font-semibold mb-4">Live Preview</h2>
                        <div className="flex justify-center mb-4">
                            <div ref={ref} className="h-35 w-35" />
                        </div>
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
                            {QR_PATTERNS.map(({ icon, type }) => (
                                <div
                                    key={type}
                                    className="cursor-pointer border rounded-lg p-4 justify-center items-center"
                                    onClick={(e) => handleOnChangePattern(e, type)}
                                >
                                    {icon}
                                </div>
                            ))}
                        </div>
                        <h2 className="text-lg font-semibold">Corners</h2>
                        <LinkCheckBox
                            isChecked={isRemoveLogo}
                            setIsChecked={setIsRemoveLogo}
                            id={'remove-logo-required-checkbox'}
                            name={'password-required-checkbox'}
                            label={'Remove Logo'}
                            disabled={true}
                            description={
                                <span>
                                    Click to change QR Code Corners.
                                    <a className="underline" href="#" target="_blank">
                                        Upgrade{' '}
                                    </a>
                                </span>
                            }
                        />
                        <div className="grid grid-cols-2 gap-4 mt-5 mb-8">
                            {QR_CORNER_PATTERNS.map(({ icon, type }) => (
                                <div
                                    key={type}
                                    className="cursor-pointer border rounded-lg p-4 justify-center items-center"
                                    onClick={(e) => handleOnChangeCornerPattern(e, type)}
                                >
                                    {icon}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
