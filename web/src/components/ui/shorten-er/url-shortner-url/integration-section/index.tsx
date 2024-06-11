import { integrationData } from '@shtcut/_shared/data';
import AnimatedContainer from '@shtcut/components/framer/animate-div';
import Image from 'next/image';
import React from 'react';
import { useMediaQuery } from 'react-responsive';
const IntegrationSection = () => {
    const mobileTab = useMediaQuery({ query: '(max-width: 1024px' });
    const cardTab = useMediaQuery({ query: '(max-width: 1194px' });
    return (
        <AnimatedContainer>
            <div className="max-w-screen-xl mx-auto px-4 pt-16 md:pt-20">
                <div
                    className="relative flex  justify-center flex-col p-4 md:p-8 h-full rounded-xl w-full"
                    style={{
                        backgroundImage: 'url(/images/frame.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        height: mobileTab ? '100%' : '652px'
                    }}
                >
                    <h2 className="text-[#B2B2B2] text-2xl italic">Integrations..</h2>
                    <h1 className="text-white py-2 font-semibold text-4xl">Easy access to all your favourite tools.</h1>
                    <section className="flex justify-between items-center lg:items-start lg:flex-row flex-col w-full pt-10 md:w-2/3  mx-auto lg:w-full gap-x-4 lg:mx-0 gap-y-6 lg:gap-y-0">
                        {integrationData.map((int, index) => (
                            <div
                                className={`text-white h-[400px]  ${cardTab ? 'w-full' : 'w-[360px]'} bg-black cursor-pointer rounded-lg p-2 md:p-4 gap-x-2 flex flex-col justify-between gap-y-4 border shadow-md border-black/10`}
                                key={index}
                            >
                                <div>
                                    <h1 className="text-[60px]  font-semibold italic">{int.id}</h1>
                                    <div className="flex flex-col mt-[24px]">
                                        <h1 className="font-semibold text-[24px]">{int.title}</h1>
                                        <p
                                            className={`text-white/70 w-full mt-[24px]  sm:w-5/6  ${cardTab ? 'w-full' : 'w-[290px]'} `}
                                        >
                                            {int.text}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex pb-6 items-center gap-x-2">
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
