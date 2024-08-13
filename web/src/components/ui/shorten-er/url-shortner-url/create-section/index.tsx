
import AnimatedContainer from '@shtcut/components/framer/animate-div';
import Image from 'next/image';
import React from 'react';

const CreateSection = () => {
    return (
        <AnimatedContainer>
            <div className="max-w-screen-custom mx-auto px-4 pt-16 md:pt-20">
                <section className="flex lg:flex-row gap-y-10 lg:gap-x-6 flex-col-reverse justify-between items-center">
                    <div className="flex flex-col gap-y-[30px]">
                        <h1 className="text-3xl md:text-5xl font-semibold text-center lg:text-start drop-shadow-xl dark:bg-gradient-to-br dark:from-neutral-200 dark:to-neutral-600 dark:bg-clip-text dark:text-transparent">
                            Create & Optimize <br className="md:block hidden" />
                            Marketing Campaigns
                        </h1>
                        <p className="text-tertiary-100 sm:w-[30rem] leading-7 text-center lg:text-start w-full">
                            Send and receive payments in any currency, without any <br className="md:block hidden" />{' '}
                            extra charges, within 24 hours or less. Make international{' '}
                            <br className="md:block hidden" /> ransactions a piece of cake
                        </p>
                        <p className="text-tertiary-100 sm:w-[30rem] leading-7 text-center lg:text-start w-full">
                            Avoid late fees and penalties, and capture every early <br className="md:block hidden" />{' '}
                            payment discount with reminders and automated approvals
                        </p>
                    </div>
                    <div className="shadow bg-white w-fit h-fit">
                        <Image width={642} height={416} src={'/images/dashboard.svg.png'} alt="dashboard" />
                    </div>
                </section>
            </div>
        </AnimatedContainer>
    );
};

export default CreateSection;
