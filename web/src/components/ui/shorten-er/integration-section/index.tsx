import { integrationData } from '@shtcut/_shared/data';
import AnimatedContainer from '@shtcut/components/framer/animate-div';
import Image from 'next/image';
import React from 'react';

const IntegrationSection = () => {
    
    
    return (
        <AnimatedContainer>
            <div className="max-w-screen-xl mx-auto px-4 pt-16 md:pt-20">
                <div className="bg-black p-4 md:p-8 rounded-xl w-full">
                    <h2 className="text-[#B2B2B2] text-2xl italic">Integrations..</h2>
                    <h1 className="text-white py-2 font-semibold text-4xl">Easy access to all your favourite tools.</h1>
                    <section className="flex justify-between lg:flex-row flex-col w-full pt-10 md:w-1/2 mx-auto lg:w-full lg:mx-0 gap-y-6 lg:gap-y-0">
                        {integrationData.map((int) => (
                            <div className="text-white bg-black cursor-pointer rounded-lg p-2 md:p-4 gap-x-2 flex flex-col justify-between gap-y-4 border shadow-md border-black/10">
                                <h1 className="text-4xl font-semibold italic">{int.id}</h1>
                                <h1 className='font-semibold'>{int.title}</h1>
                                <p className="text-white/70  sm:w-[290px]">{int.text}</p>
                                <div className="flex items-center gap-x-2">
                                    {int.img.map((imageSrc, index) => (
                                        <Image
                                            key={index}
                                            src={imageSrc}
                                            width={40}
                                            height={40}
                                            alt={`${int.title} image ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </section>
                </div>
            </div>
        </AnimatedContainer>
    );
};

export default IntegrationSection;
