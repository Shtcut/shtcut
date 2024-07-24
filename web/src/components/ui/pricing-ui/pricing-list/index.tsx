'use client';

import { PricingData } from '@shtcut/_shared/data';
import AnimatedContainer from '@shtcut/components/framer/animate-div';
import PricingTab from '@shtcut/components/tabs/pricing-tab';
import Image from 'next/image';
import PricingCard from '../../shorten-er/url-shortner-url/pricing-section/pricing-card';

const PricingList = () => {
    return (
        <AnimatedContainer className="">
            <div className="max-w-screen-xl mx-auto  px-4 ">
                <PricingTab />
                <div className="md:w-[45rem] mx-auto">
                    <span className="text-sm text-primary-0 font-medium float-left mt-11">Save 25%</span>
                    <Image src={'/mark-line.png'} width={90} height={55} alt="line marker" />
                </div>
                <div className="flex justify-center mt-10  items-center lg:items-start   lg:flex-row flex-col gap-6 w-full mx-auto">
                    {PricingData.map((plan, index) => (
                        <PricingCard plan={plan} key={index} />
                    ))}
                </div>
            </div>
        </AnimatedContainer>
    );
};

export default PricingList;
