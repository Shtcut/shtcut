'use client';

import { Button, Input } from '@shtcut-ui/react';
import { LayoutBody } from '@shtcut/components';
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
import Image from 'next/image';
import { useState } from 'react';
import { QRCode } from 'react-qrcode-logo';

const QrCode = () => {
    const [isRemoveLogo, setIsRemoveLogo] = useState(false);

    return (
        <LayoutBody className="container">
            <div className="flex items-center justify-between space-y-2">
                <h1 className="text-2xl font-bold tracking-light md:text-3xl">QrCode</h1>
                <div className="flex items-center space-x-2">
                    <Button>QrCode</Button>
                </div>
            </div>

            <div className="w-full my-8 p-6 bg-white  border rounded-lg">
                <div className="flex gap-8">
                    <div className="flex flex-col w-1/4  border rounded-lg p-6">
                        <h2 className="text-lg font-semibold mb-4">Destination</h2>
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
                            <QRCode
                                value="https://shtcut.link/auth/sign-in"
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
                            <Button className="w-full">Continue</Button>
                        </div>
                    </div>
                    <div className="flex flex-col w-1/4 border rounded-md p-5">
                        <h2 className="text-lg font-semibold mb-4">Pattern</h2>
                        <div className="grid grid-cols-3 gap-4 mb-8">
                            <Button className="bg-[#eff3fe]">
                                <Repeat1Icon className="text-[#3b82f6]" />
                            </Button>
                            <Button className="bg-[#eff3fe]">
                                <Code2Icon className="text-[#3b82f6]" />
                            </Button>
                            <Button className="bg-[#eff3fe]">
                                <BarChart3Icon className="text-[#3b82f6]" />
                            </Button>
                            <Button className="bg-[#eff3fe]">
                                <BarChart4Icon className="text-[#3b82f6]" />
                            </Button>
                            <Button className="bg-[#eff3fe]">
                                <Clock5Icon className="text-[#3b82f6]" />
                            </Button>
                            <Button className="bg-[#eff3fe]">
                                <Clock6Icon className="text-[#3b82f6]" />
                            </Button>
                        </div>
                        <h2 className="text-lg font-semibold mb-4">Color</h2>
                        <div className="grid grid-cols-3 gap-4 mb-8">
                            <Button className="bg-black rounded-full w-8 h-8" />
                            <Button className="bg-gray-500 rounded-full w-8 h-8" />
                            <Button className="bg-red-500 rounded-full w-8 h-8" />
                            <Button className="bg-pink-500 rounded-full w-8 h-8" />
                            <Button className="bg-purple-500 rounded-full w-8 h-8" />
                            <Button className="bg-blue-500 rounded-full w-8 h-8" />
                            <Button className="bg-cyan-500 rounded-full w-8 h-8" />
                            <Button className="bg-green-500 rounded-full w-8 h-8" />
                            <Button className="bg-orange-500 rounded-full w-8 h-8" />
                            <Button className="bg-yellow-600 rounded-full w-8 h-8" />
                        </div>
                        <h2 className="text-lg font-semibold">Theme</h2>
                    </div>
                </div>
            </div>
        </LayoutBody>
    );
};

export default QrCode;
