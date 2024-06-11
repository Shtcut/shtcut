import AnimatedContainer from '@shtcut/components/framer/animate-div';
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@shtcut-ui/react';
import Image from 'next/image';
import { PlanInfo } from '@shtcut/_shared/data';
import PlanCard from './plan-card';

const PlanSection = () => {
    return (
        <div>
            <div className="max-w-screen-xl mx-auto px-4 pt-16 md:pt-20">
                <AnimatedContainer className="flex flex-col gap-4 items-center">
                    <h1 className="text-4xl md:text-5xl font-semibold text-center drop-shadow-xl dark:bg-gradient-to-br dark:from-neutral-200 dark:to-neutral-600 dark:bg-clip-text dark:text-transparent">
                        Powerful <span className="text-primary-0">features</span> on all plans for you
                    </h1>
                    <p className="md:w-[35rem] mx-auto text-center">
                        URL Shorten-er, Survey Creation, Email Marketing and Social media management - all in one place!
                    </p>
                    <div className="relative">
                        <Tabs defaultValue="yearly" className="w-[329px] rounded-full bg-white">
                            <TabsList className="grid w-full grid-cols-2 items-center rounded-full h-[46px] bg-[#FAFAFA] ">
                                <TabsTrigger
                                    value="yearly"
                                    className="rounded-full  h-9 space-x-1 font-semibold text-[#433E3F]"
                                >
                                    Yearly
                                </TabsTrigger>

                                <TabsTrigger value="monthly" className="rounded-full h-9 font-semibold text-[#433E3F]">
                                    Monthly
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>
                </AnimatedContainer>
                <AnimatedContainer>
                    <div className="md:w-[45rem] md:relative bottom-8 mx-auto">
                        <span className="text-sm text-primary-0 font-medium float-left mt-11">Save 25%</span>
                        <Image src={'/mark-line.png'} width={90} height={55} alt="line marker" />
                    </div>
                </AnimatedContainer>

                <AnimatedContainer className="flex justify-center md:w-2/3  lg:w-full  lg:flex-row flex-col gap-6 w-full mx-auto">
                    {PlanInfo.map((plan) => (
                        <PlanCard plan={plan} />
                    ))}
                </AnimatedContainer>
                <div>
                    <p className="font-medium text-center py-6 text-[#9F9C9C]">
                        Compare all plans & features on the{' '}
                        <span className="text-primary-0 cursor-pointer underline">pricing page.</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PlanSection;
