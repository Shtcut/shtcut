import { Button } from '@shtcut-ui/react';
import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { featureData } from '@shtcut/_shared/data';
import Image from 'next/image';

import AnimatedContainer from '@shtcut/components/framer/animate-div';

const FeatureSection = () => {
    return (
        <AnimatedContainer>
            <div className="max-w-screen-xl mx-auto px-4  pt-14">
                <div className="flex flex-col gap-y-8 lg:gap-y-0 lg:flex-row justify-between items-center">
                    <h1 className="text-3xl md:text-5xl font-semibold text-center lg:text-start drop-shadow-xl dark:bg-gradient-to-br dark:from-neutral-200 dark:to-neutral-600 dark:bg-clip-text dark:text-transparent">
                        Features you can get <br className="lg:flex hidden" /> from Shtcut
                    </h1>
                    <p className="text-tertiary-100 sm:w-[30rem] leading-7 text-center lg:text-start w-full">
                        SaaS become a common delivery model for many business application, including office software,
                        messaging software. <br className="md:block hidden" /> We offer a variety of interesting
                        features that you can help <br className="md:block hidden" /> brand and manage links
                    </p>
                </div>
                <section className="feature-card-container pt-20 w-full">
                    <div className="bg-primary-0 rounded-xl feature-card cursor-pointer feature-big-card w-full py-4 px-3 md:p-6">
                        <Image src="/images/text-arrow.svg.png" width={24} height={24} alt="learn more" className="" />
                        <div className="px-3 md:px-6  flex flex-col gap-y-6 w-full">
                            <h1 className="text-3xl md:text-5xl text-white font-semibold">
                                Marketing software <br className="md:flex hidden" /> that{' '}
                                <span className="italic">handles it all.</span>
                            </h1>
                            <Button className="text-black bg-white rounded-full hover:text-white md:w-40 w-fit  h-12 ">
                                LEARN MORE <ArrowUpRight />
                            </Button>
                        </div>
                    </div>
                    {featureData.map((ft) => (
                        <div
                            key={ft.title}
                            className="bg-white border border-gray-100 shadow-lg p-3 md:p-6 cursor-pointer rounded-xl  feature-card flex flex-col gap-y-4"
                        >
                            <Image src={ft.img} width={60} height={60} alt={ft.title} />
                            <h1 className="text-2xl md:text-3xl font-medium ">{ft.title}</h1>
                            <p className="text-black lg:max-w-72 md:text-base text-sm">{ft.text}</p>
                        </div>
                    ))}
                </section>
            </div>
        </AnimatedContainer>
    );
};

export default FeatureSection;
