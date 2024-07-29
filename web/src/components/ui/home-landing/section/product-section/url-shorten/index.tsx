import { Button, Card } from '@shtcut-ui/react';
import useWindowSize from '@shtcut/components/_shared/Responsiveness';
import AnimatedContainer from '@shtcut/components/framer/animate-div';
import Image from 'next/image';
import React from 'react';

const UrlShortener = () => {
    const { width } = useWindowSize();
    const mobileTab = width !== undefined && width <= 1073;
    const tab = width !== undefined && width <= 768;
    return (
        <AnimatedContainer>
            <div id="url-shorten" className=" ">
                <Card className="bg-white">
                    <div className="md:pl-[20px] lg:pl-[50px] ">
                        <div className="flex bg-white md:flex-row flex-col-reverse items-center   mx-auto">
                            <div className="md:w-2/3 p-4 flex flex-col gap-y-6">
                                <div className="flex items-center gap-2">
                                    <Image src={'/url.png'} width={20} height={20} alt="survey creation" />
                                    <p className="font-medium">URL Shortener</p>
                                    <Button className="text-[10px] bg-primary-0 w-[90px] h-[23px]">COMING SOON</Button>
                                </div>
                                <h1 className="text-2xl md:text-[42px] font-semibold md:leading-[48px]">
                                    Generate short URLs with just a click
                                </h1>
                                <p className="text-sm text-[#404625]">
                                    Optimize URL management for individuals, businesses, and organizations with a robust
                                    range of features to streamline tracking and enhance link management.
                                </p>
                                <Button className="w-32 bg-primary-0">Get started</Button>
                            </div>
                            <div className={` bg-white z-20 ${mobileTab ? 'w-1/2' : ''} ${tab ? 'w-full' : ''}`}>
                                <Image
                                    alt="icons"
                                    width={0}
                                    height={0}
                                    className={`bg-white w-full   md:w-[624px] h-80 md:h-[488px]`}
                                    src="/images/url-shorten.png"
                                    sizes="100vw"
                                    loading="eager"
                                />
                            </div>
                        </div>
                    </div>
                </Card>

                <div className="flex flex-col  gap-y-4 md:gap-y-0 lg:gap-y-4">
                    <div className="flex gap-4 md:gap-5 lg:gap-[30px] w-full mt-4 md:mt-[30px] md:flex-row flex-col ">
                        <Card className="w-full  shadow-none flex flex-col gap-y-6 md:gap-y-0 justify-between px-4 lg:px-8 h-fit md:h-[400px]   bg-[#f7f7f7] border border-[#E3E3E3]">
                            <div className="lg:w-[422px] pt-[16px] lg:pt-[22px] flex-1">
                                <h1 className="text-xl md:text-2xl">Link Management</h1>
                                <p className="text-xs sm:text-sm mt-2">
                                    Shtcut allows users to shorten customise and edit links. Provide the option to set
                                    expiration dates and
                                </p>
                            </div>
                            <div className="h-full w-full md:flex-1">
                                <Image
                                    src={'/images/link-shorten.png'}
                                    width={634}
                                    height={400}
                                    alt="link management"
                                />
                            </div>
                        </Card>
                        <Card className="w-full   lg:w-2/3 shadow-none px-4 lg:px-8 pt-[16px] lg:pt-[22px]   flex flex-col  justify-between h-fit md:h-[400px] bg-[#f7f7f7] border border-[#E3E3E3]">
                            <div className=" flex-1">
                                <h1 className="text-xl md:text-2xl">QR Code</h1>
                                <p className="text-xs sm:text-sm mt-2">
                                    Generate, customize and track QR Codes scans and associated link management for
                                    performance analysis.
                                </p>
                            </div>
                            <div className="h-full mt-20 md:mt-0 w-full md:flex-1 justify-center flex lg:block">
                                <Image
                                    src={'/images/create-link.png'}
                                    width={409}
                                    height={258}
                                    alt="qr code"
                                    objectFit="contain"
                                />
                            </div>
                        </Card>
                    </div>
                    <div className="flex gap-4 md:gap-5 lg:gap-[30px] w-full  md:mt-[30px] md:flex-row flex-col ">
                        <Card className="w-full   lg:w-2/3 shadow-none px-4 lg:px-8 pt-[16px] lg:pt-[22px]   flex flex-col  justify-between h-fit md:h-[400px] bg-[#f7f7f7] border border-[#E3E3E3]">
                            <div className=" flex-1">
                                <h1 className="text-2xl">Custom Domains</h1>
                                <p className="text-xs sm:text-sm mt-2">
                                    Domain Integration,DNS Configuration and SSL Support, to reinforce brand identity
                                    and credibility.
                                </p>
                            </div>
                            <div className="h-full mt-20 md:mt-0 w-full md:flex-1 justify-center flex lg:block">
                                <Image src={'/images/custom.png'} width={634} height={400} alt="custom" />
                            </div>
                        </Card>
                        <Card className="w-full  shadow-none flex flex-col gap-y-6 md:gap-y-0 justify-between px-4 lg:px-8 h-fit md:h-[400px]   bg-[#f7f7f7] border border-[#E3E3E3]">
                            <div className="lg:w-[422px] pt-[16px] lg:pt-[22px] flex-1">
                                <h1 className="text-xl md:text-2xl">Analytics</h1>
                                <p className="text-xs sm:text-sm mt-2">
                                    Domain Integration,DNS Configuration and SSL Support, to reinforce brand identity
                                    and credibility.
                                </p>
                            </div>
                            <div className="h-full w-full md:flex-1">
                                <Image
                                    src={'/images/analytics.png'}
                                    width={0}
                                    height={258}
                                    alt="analytics"
                                    className="w-full"
                                    sizes="100vw"
                                    loading="eager"
                                />
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </AnimatedContainer>
    );
};

export default UrlShortener;
