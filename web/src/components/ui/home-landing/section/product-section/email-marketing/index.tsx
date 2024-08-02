import { Button, Card } from '@shtcut-ui/react';
import useWindowSize from '@shtcut/components/_shared/Responsiveness';
import AnimatedContainer from '@shtcut/components/framer/animate-div';
import Image from 'next/image';
import React from 'react';

const EmailMarketing = () => {
    const { width } = useWindowSize();
    const mobileTab = width !== undefined && width <= 1073;
    const tab = width !== undefined && width <= 768;
    return (
        <AnimatedContainer>
            <div id="email-marketing">
                <Card className="bg-white">
                    <div className="md:pl-[20px] lg:pl-[50px] ">
                        <div className="flex bg-white md:flex-row flex-col-reverse items-center   mx-auto">
                            <div className="md:w-2/3 p-4 flex flex-col gap-y-6">
                                <div className="flex items-center gap-2">
                                    <Image src={'/url.png'} width={20} height={20} alt="survey creation" />
                                    <p className="font-medium">Email Marketing</p>
                                    <Button className="text-[10px] bg-primary-0 w-[90px] h-[23px]">COMING SOON</Button>
                                </div>
                                <h1 className="text-2xl md:text-[42px] font-semibold md:leading-[48px]">
                                    Connect with customers using targeted email campaigns
                                </h1>

                                <div className="flex pl-4 flex-col gap-y-4">
                                    {[1, 2, 3].map((data) => (
                                        <ul
                                            className="list-disc text-[#404625] list-disc-[#404625] md:w-2/3 "
                                            key={data}
                                        >
                                            <li className="text-sm text-[#404625]">
                                                Paste in any long url, make it sharable, trackable and customizable with
                                                just a few clicks.
                                            </li>
                                        </ul>
                                    ))}
                                </div>
                            </div>
                            <div className={` bg-white z-20 ${mobileTab ? 'w-1/2' : ''} ${tab ? 'w-full' : ''}`}>
                                <Image
                                    alt="icons"
                                    width={0}
                                    height={0}
                                    className={`bg-white w-full object-fill  md:w-[624px] h-80 md:h-[488px]`}
                                    src="/images/container_1.png"
                                    sizes="100vw"
                                    loading="eager"
                                />
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </AnimatedContainer>
    );
};

export default EmailMarketing;
