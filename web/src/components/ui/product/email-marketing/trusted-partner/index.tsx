import { Button } from '@shtcut-ui/react';
import { trustImage } from '@shtcut/_shared/data';
import Marquee from '@shtcut/components/_shared/animations/cards-animation';
import AnimatedContainer from '@shtcut/components/framer/animate-div';
import Image from 'next/image';
import React from 'react';
import ReusableCard from '../../reusable-card';

const TrustedPartner = () => {
    return (
        <div>
            <div className="relative max-w-screen-custom mx-auto px-4  pt-10">
                <h1 className="text-center w-96 mx-auto">
                    <span className="text-primary-0">Trusted</span> by fast-growing companies around the world
                </h1>
                <Marquee className="[--duration:20s] mt-8" gap="gap-12">
                    {trustImage.map((review, index) => (
                        <Image
                            width={100}
                            height={100}
                            key={index}
                            alt="trusted"
                            src={`/trust/${review}`}
                            className="object-contain"
                        />
                    ))}
                </Marquee>
            </div>
            <div className="bg-[#FAFAFA] mt-14">
                <div className="relative max-w-screen-custom mx-auto px-4  py-14">
                    <AnimatedContainer className="flex flex-col items-center gap-y-4">
                        <h1 className="text-4xl sm:text-[50px]  sm:leading-[60px] mx-auto text-center font-semibold">
                            Email Marketing
                        </h1>
                        <p className="text-[#737A8A] w-full sm:w-[40rem] text-center">
                            Simplify and organize your digital presence with our robust link management system. Easily
                            create, edit and manage all your links from a single, intuitive dashboard.
                        </p>
                    </AnimatedContainer>
                    <AnimatedContainer className="md:flex-row flex-col flex w-full gap-4 mt-6">
                        {/* Top Row */}
                        <ReusableCard
                            text="Create a personalized bio link page to showcase all your important links in one place. Ideal for social media profiles, allowing your audience to find everything they need with a single click."
                            title="Create Email Campaigns"
                            className="lg:w-2/3"
                        />
                        <ReusableCard
                            text="Gain valuable insights with our comprehensive analytics tools. Track link performance, monitor user behavior, and optimize your strategies with real-time data"
                            title="Advanced analytics"
                            textClassName="lg:w-3/4"
                        />
                    </AnimatedContainer>
                    <AnimatedContainer className="sm:grid-cols-2 grid-cols-1 lg:grid-cols-3 mt-4 w-full gap-4 grid">
                        <ReusableCard
                            text="Create a personalized bio link page to showcase all your important links in one place. Ideal for social media profiles, allowing your audience to find everything they need with a single click."
                            title="Optimize maximum impact"
                            className="md:col-span-1"
                        />
                        <ReusableCard
                            text="Gain valuable insights with our comprehensive analytics tools. Track link performance, monitor user behavior, and optimize your strategies with real-time data"
                            title="Segment your lists"
                            className="md:col-span-1"
                        />
                        <ReusableCard
                            text="Gain valuable insights with our comprehensive analytics tools. Track link performance, monitor user behavior, and optimize your strategies with real-time data"
                            title="Share Links"
                            className="md:col-span-1"
                        />
                    </AnimatedContainer>
                </div>
            </div>
        </div>
    );
};

export default TrustedPartner;
