'use client';

import { Button, Input, Popover, PopoverContent, PopoverTrigger, toast } from '@shtcut-ui/react';
import { LinkCheckBox } from '@shtcut/components/_shared/LinkCheckBox';
import { useEffect, useRef, useState } from 'react';
import QRCodeStyling, {
    DrawType,
    TypeNumber,
    Mode,
    ErrorCorrectionLevel,
    DotType,
    CornerSquareType,
    CornerDotType,
    Options
} from 'qr-code-styling';
import Image from 'next/image';
import {
    LOGO_FAV_ICON,
    QR_CODE_FRAMES,
    QR_CORNER_PATTERNS,
    QR_PATTERNS,
    SOCIAL_ICONS_LOGOS
} from '@shtcut/_shared/constant';
import { isEmpty } from 'lodash';
import { isValidURL } from '@shtcut/_shared';
import './style.css';
import html2canvas from 'html2canvas';
import { documentToSVG, elementToSVG, inlineResources } from 'dom-to-svg';
import ColorPicker from 'react-best-gradient-color-picker';
import { HexColorPicker } from 'react-colorful';

export const QRCodeForm = () => {
    const [color, setColor] = useState('#aabbcc');
    const [isRemoveLogo, setIsRemoveLogo] = useState(false);
    const [qrCodeLogo, setQrCodeLogo] = useState(LOGO_FAV_ICON);
    const [link, setLink] = useState('https://shtcut.link/');

    const [options, setOptions] = useState<Options>({
        width: 200,
        height: 200,
        type: 'svg' as DrawType,
        data: 'https://app.shtcut.link/',
        image: qrCodeLogo,
        margin: 10,
        qrOptions: {
            typeNumber: 0 as TypeNumber,
            mode: 'Byte' as Mode,
            errorCorrectionLevel: 'Q' as ErrorCorrectionLevel
        },
        // backgroundOptions: {
        //     color: '#FF0000'
        // },
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

    const onDownloadClick = () => {
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

        const svgDocument = elementToSVG(document.querySelector('#shtcut-qrcode') as Element);
        const svgString = new XMLSerializer().serializeToString(svgDocument);

        // const blob = new Blob([svgString], { type: 'image/svg+xml' });
        // const qrCodeObjectUrl = URL.createObjectURL(blob);
        // const qrCodeLink = document.createElement('a');
        // qrCodeLink.href = qrCodeObjectUrl;
        // qrCodeLink.download = 'qrCode.svg';
        // document.body.appendChild(qrCodeLink);
        // qrCodeLink.click();
        // document.body.removeChild(qrCodeLink);

        // setTimeout(() => URL.revokeObjectURL(qrCodeObjectUrl), 5000);

        html2canvas(document.querySelector('#shtcut-qrcode') as any).then(function (canvas) {
            const link = document.createElement('a');
            link.download = 'shtcut-qrcode.png';
            link.href = canvas.toDataURL();
            link.click();
            toast({
                description: 'QR Code Downloaded Successfully'
            });
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
                                    className="w-full h-20 border rounded-md flex justify-center items-center bg-gray-100  cursor-pointer"
                                    key={`${name}`}
                                    onClick={(e) => handleOnChangeLogo(e, image)}
                                >
                                    <Image className="" src={image} alt={name} width={50} height={50} />
                                </div>
                            ))}
                        </div>
                        <h2 className="text-lg font-semibold mb-4 mt-5">Frame</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {/* {QR_CODE_FRAMES('').map()} */}
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
                        <section
                            id="shtcut-qrcode"
                            className="border border-black  rounded-[3rem] w-60 mx-auto h-96 flex justify-center    bg-transparent"
                        >
                            <div className="flex flex-col justify-between  w-full ">
                                <div className=" bg-black h-10 w-full rounded-t-[3rem]" />
                                <div className=" w-52  flex justify-center items-center flex-col mx-auto ">
                                    <div className="border-black border-4 flex justify-center items-center  w-full rounded-2xl">
                                        <div ref={ref} className="h-35 w-35 rounded-lg " />
                                    </div>
                                    <section className="flex flex-col w-full items-center">
                                        <div className="triangle" />
                                        <div className="bg-black  flex justify-center mx-auto w-full h-6 items-center  rounded-xl ">
                                            <p className="text-white text-xs">SCAN ME!</p>
                                        </div>
                                    </section>
                                </div>
                                <div className="bg-black h-10  rounded-b-[3rem]" />
                            </div>
                        </section>
                        {/* <div  id="shtcut-qrcode" className=" w-56  flex justify-center items-center flex-col mx-auto ">
                            <div
                               
                                className="border-black border-4 flex justify-center items-center  w-full rounded-2xl"
                            >
                                <div ref={ref} className="h-35 w-35 rounded-lg " />
                            </div>
                            <section className="flex flex-col w-full items-center">
                                <div className="triangle" />
                                <div className="bg-black  flex justify-center mx-auto w-full h-6 items-center  rounded-xl ">
                                    <p className="text-white text-xs">SCAN ME!</p>
                                </div>
                            </section>
                        </div> */}
                        {/* <div id="shtcut-qrcode" className="w-54 relative mx-auto">
                            <div className="flex absolute top-[22%] left-[-10px] right-[-10px] justify-between items-center">
                                <div className="bg-white h-44 w-4" />
                                <div className="bg-white h-44 w-4" />
                            </div>
                            <div className=" flex justify-center items-center flex-col ">
                                <div className="bg-white w-1/2 relative top-4 h-6" />
                                <div className="border-2 border-black rounded w-full ">
                                    <div ref={ref} className="h-35 w-35 rounded-lg " />
                                </div>
                                <div className="bg-white w-1/2 relative bottom-4 h-6" />
                            </div>
                        </div> */}
                        <div className="border-t border-b py-4 my-6">
                            <p className="text-center text-xs text-gray-500 uppercase mb-2">QR pattern color</p>
                            <div className="flex justify-center">
                                <Input className="text-center" placeholder="HLA8G4L1B9ZX4" type="text" value={color} />
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant={'outline'}>
                                            <div
                                                className="flex w-full items-center gap-2"
                                                style={{ background: color }}
                                            >
                                                <div
                                                    className="h-4 w-4 rounded !bg-cover !bg-center transition-all"
                                                    style={{ background: color }}
                                                ></div>
                                            </div>
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <HexColorPicker color={color} onChange={setColor} />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <p className="text-center text-xs text-gray-500 uppercase my-2 ">QR background color</p>
                            <div className="flex justify-center">
                                <Input className="text-center" placeholder="HLA8G4L1B9ZX4" type="text" value={color} />
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant={'outline'}>
                                            <div
                                                className="flex w-full items-center gap-2"
                                                style={{ background: color }}
                                            >
                                                <div
                                                    className="h-4 w-4 rounded !bg-cover !bg-center transition-all"
                                                    style={{ background: color }}
                                                ></div>
                                            </div>
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <HexColorPicker color={color} onChange={setColor} />
                                    </PopoverContent>
                                </Popover>
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
                                    className="cursor-pointer border rounded-lg flex p-4 justify-center items-center"
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
                                    className="cursor-pointer border rounded-lg flex p-4 justify-center items-center"
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
