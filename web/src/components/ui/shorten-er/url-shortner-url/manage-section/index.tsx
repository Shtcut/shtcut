import { manageData } from '@shtcut/_shared/data';
import AnimatedContainer from '@shtcut/components/framer/animate-div';
import { Check } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const ManageSection = () => {
    return (
        <AnimatedContainer>
            <div className="max-w-screen-custom mx-auto px-4 pt-16 md:pt-20">
                <section className="flex lg:flex-row gap-y-10 lg:gap-x-6 flex-col justify-between items-center">
                    <div className="shadow bg-white w-fit h-fit">
                        <Image width={642} height={416} src={'/images/dashboard.svg.png'} alt="dashboard" />
                    </div>
                    <div className="flex flex-col gap-y-[30px]">
                        <h1 className="text-3xl md:text-5xl font-semibold text-center lg:text-start drop-shadow-xl dark:bg-gradient-to-br dark:from-neutral-200 dark:to-neutral-600 dark:bg-clip-text dark:text-transparent">
                            Manage all your marketing <br className="md:block hidden" />
                            tools - in one place{' '}
                        </h1>
                        <p className="text-tertiary-100 sm:w-[30rem] leading-7 text-center lg:text-start w-full">
                            Centralize and simplify payments, and get comprehensive <br className="md:block hidden" />{' '}
                            insights on your financials. Connect your bank account and{' '}
                            <br className="md:block hidden" /> your card to Milestone.
                        </p>
                        <section className="flex lg:justify-start justify-center">
                            <div className="flex flex-col gap-y-2">
                                {manageData.map((man, index) => (
                                    <section className="flex space-x-4 items-center" key={index}>
                                        <div className="bg-black w-7 h-7 rounded-full flex justify-center items-center">
                                            <Check className="text-white" size={16} />
                                        </div>
                                        <p>{man.name}</p>
                                    </section>
                                ))}
                            </div>
                        </section>
                    </div>
                </section>
            </div>
        </AnimatedContainer>
    );
};

export default ManageSection;
