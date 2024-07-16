import AnimatedContainer from '@shtcut/components/framer/animate-div';
import React from 'react';
import Image from 'next/image';
import { PricingData } from '@shtcut/_shared/data';
import PlanCard from './pricing-card';
import PricingTab from '@shtcut/components/tabs/pricing-tab';
import PricingCard from './pricing-card';
import BoxReveal from '@shtcut/components/_shared/animations/box-reveal';

const PlanSection = () => {
    return (
        <div>
            <div className="max-w-screen-xl mx-auto px-4 pt-16 md:pt-20">
                <AnimatedContainer className="flex flex-col  items-center">
                    <BoxReveal boxColor={'#101010'} duration={1}>
                        <h1 className="text-4xl h-[72px] md:text-5xl font-semibold text-center drop-shadow-xl dark:bg-gradient-to-br dark:from-neutral-200 dark:to-neutral-600 dark:bg-clip-text dark:text-transparent">
                            Powerful <span className="text-primary-0">features</span> on all plans for you
                        </h1>
                    </BoxReveal>
                    <BoxReveal>
                        <p className="md:w-[35rem] mx-auto text-center">
                            URL Shorten-er, Survey Creation, Email Marketing and Social media management - all in one
                            place!
                        </p>
                    </BoxReveal>

                    <div className='mt-4'>
                        <PricingTab />
                    </div>
                </AnimatedContainer>
                <AnimatedContainer>
                    <div className="md:w-[45rem]  mx-auto">
                        <span className="text-sm text-primary-0 font-medium float-left mt-11">Save 25%</span>
                        <Image src={'/mark-line.png'} width={90} height={55} alt="line marker" />
                    </div>
                </AnimatedContainer>

                <AnimatedContainer className="flex justify-center mt-8  items-center lg:items-start   lg:flex-row flex-col gap-6 w-full mx-auto">
                    {PricingData.map((plan, index) => (
                        <PricingCard plan={plan} key={index} />
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
