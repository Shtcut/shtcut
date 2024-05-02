import { BENEFITS } from '@shtcut/_shared/data';
import { Check } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const BenefitShorten = () => {
    return (
        <section>
            <div className="max-w-screen-xl mx-auto  px-4">
                <div className="flex justify-between gap-4 lg:flex-row flex-col items-center  lg:text-start  ">
                    <div>
                        <h1
                            className="font-heading text-2xl drop-shadow-xl dark:bg-gradient-to-br dark:from-neutral-200 dark:to-neutral-600 dark:bg-clip-text dark:text-transparent sm:text-3xl md:text-5xl w-80 leading-loose"
                            style={{ lineHeight: '75px' }}
                        >
                            What Benefits Will You Get?
                        </h1>
                        <div className="flex flex-col gap-4 mt-6">
                            {BENEFITS.map((item) => (
                                <div key={item.title} className="flex items-center gap-5">
                                    <div className="w-8 h-8 rounded-full bg-primary-0 flex justify-center items-center font-semibold text-white">
                                        <Check size={'18px'} />
                                    </div>
                                    <h1 className="font-medium text-lg">{item.title}</h1>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="w-full lg:w-2/3 h-full">
                        <img src={'/dashboard-screen.svg'} alt={''} width="100%" height="100%" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BenefitShorten;
