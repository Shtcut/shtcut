import { Button, Card } from '@shtcut-ui/react';
import AnimatedContainer from '@shtcut/components/framer/animate-div';
import Image from 'next/image';
import React from 'react';

const SocialMedia = () => {
    return (
        <AnimatedContainer>
            <div id="social-media">
                <Card className="bg-white  p-4 lg:py-0">
                    <div className="flex md:flex-row flex-col bg-white items-center  md:w-[95%]  lg:w-[90%] mx-auto">
                        <div className="md:w-2/3 flex flex-col gap-y-3 md:gap-y-6">
                            <div className="flex items-center gap-2">
                                <Image src={'/url.png'} width={20} height={20} alt="Social Media Management" />
                                <p className="text-sm md:text-base  font-medium">Social Media Management</p>
                                <Button className="text-[10px] bg-primary-0 w-[90px] h-[23px]">COMING SOON</Button>
                            </div>
                            <h1 className="text-2xl md:text-[42px] font-semibold md:leading-[48px]">
                                Stay connected with your audience!
                            </h1>

                            <div className="flex flex-col gap-y-2 md:gap-y-4 px-4">
                                {[1, 2, 3].map((data) => (
                                    <ul
                                        className="list-disc text-[#404625] list-disc-[#404625] w-full sm:w-2/3 "
                                        key={data}
                                    >
                                        <li className="text-xs sm:text-sm text-[#404625]">
                                            Paste in any long url, make it sharable, trackable and customizable with
                                            just a few clicks.
                                        </li>
                                    </ul>
                                ))}
                            </div>
                        </div>
                        <div className="w-1/2 pt-6 bg-white z-20">
                            <Image
                                alt="icons"
                                width={0}
                                height={0}
                                className="bg-white w-full h-full"
                                src="/images/icons.svg.png"
                                sizes="100vw"
                                loading="eager"
                            />
                        </div>
                    </div>
                </Card>
            </div>
        </AnimatedContainer>
    );
};

export default SocialMedia;
