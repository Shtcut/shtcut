import { Button, Card } from '@shtcut-ui/react';
import useWindowSize from '@shtcut/components/_shared/Responsiveness';
import AnimatedContainer from '@shtcut/components/framer/animate-div';
import Image from 'next/image';
import React from 'react';
import { Check } from 'lucide-react';
import { MdLock } from 'react-icons/md';

const SurveySectionTab = () => {
    const { width } = useWindowSize();
    const mobileTab = width !== undefined && width <= 1073;
    const tab = width !== undefined && width <= 768;
    return (
        <AnimatedContainer>
            <div id="survey-creation">
                <Card className="bg-white ">
                    <div className="flex md:flex-row flex-col bg-white items-center  md:w-[95%]   mx-auto">
                        <div className="md:w-2/3 p-4 flex flex-col gap-y-6">
                            <div className="flex items-center gap-2 bg-[#8351FF]/10 w-40 h-11 justify-center cursor-pointer rounded">
                                <Image src={'/images/peg.png'} width={20} height={20} alt="survey creation" />
                                <p className="font-medium text-sm text-[#8351FF]">Survey Creation</p>
                            </div>
                            <h1 className="text-2xl  md:text-[35px] md:leading-[44px]  font-semibold ">
                                Craft personalized surveys effortlessly
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
                            <Button
                                variant={'outline'}
                                className="shadow-none border border-textColor text-xs flex items-center gap-x-2 w-32   h-10"
                            >
                                <div>
                                    <MdLock size={14} />
                                </div>
                                Coming Soon
                            </Button>
                        </div>
                        <div className="md:w-2/3 pt-6 bg-white z-20 ">
                            <Image
                                alt="icons"
                                width={0}
                                height={0}
                                className={`bg-white w-full  md:w-[624px] h-80 md:h-[488px]`}
                                src="/images/path.png"
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

export default SurveySectionTab;
