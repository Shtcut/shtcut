import { Card } from '@shtcut-ui/react';
import AnimatedContainer from '@shtcut/components/framer/animate-div';
import { Check } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const SocialMedia = () => {
    return (
        <AnimatedContainer>
            <div id="social-media">
                <Card className="bg-white  p-4 lg:py-0">
                    <div className="flex md:flex-row flex-col bg-white items-center  md:w-[95%]   mx-auto">
                        <div className="md:w-2/3 flex flex-col gap-y-3 md:gap-y-6">
                            <div className="flex items-center gap-2 bg-[#FF5E51]/10 w-60 h-11 justify-center cursor-pointer rounded">
                                <Image src={'/images/url.png'} width={20} height={20} alt="survey creation" />
                                <p className="font-medium text-sm text-[#FF5E51]">Social Media Management</p>
                            </div>

                            <h1 className="text-2xl  md:text-[35px] md:leading-[44px]  font-semibold ">
                                Stay connected with your audience!
                            </h1>

                            <div className="flex  flex-col gap-y-4">
                                {[1, 2, 3].map((data) => (
                                    <div className="text-[#404625]   relative gap-x-2 md:w-4/5 " key={data}>
                                        <div className="bg-[#94AEFA]/20 w-5 h-5 rounded-full flex justify-center items-center float-left  ">
                                            <Check color="#144FF0" size={12} />
                                        </div>
                                        <p className="text-sm text-[#404625] ml-7 ">
                                            Paste in any long url, make it sharable, trackable and customizable with
                                            just a few clicks.
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="md:w-2/3 pt-6 bg-white z-20">
                            <Image
                                alt="icons"
                                width={0}
                                height={0}
                                className={`bg-white w-full  md:w-[624px] h-80 md:h-[488px]`}
                                src="/images/connected.svg.png"
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
