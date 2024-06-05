import AnimatedContainer from '@shtcut/components/framer/animate-div';
import React from 'react';
import { Button, Tabs, TabsList, TabsTrigger } from '@shtcut-ui/react';
import Image from 'next/image';
import { PlanInfo } from '@shtcut/_shared/data';
import { Check } from 'lucide-react';

const PlanSection = () => {
    return (
        <div>
            <div className="max-w-screen-xl mx-auto px-4 pt-16 md:pt-20">
                <AnimatedContainer className="flex flex-col gap-4 items-center">
                    <h1 className="text-4xl md:text-5xl font-semibold text-center">
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

                <AnimatedContainer className="flex justify-center  md:flex-row flex-col gap-6 w-full lg:w-3/4 mx-auto">
                    {PlanInfo.map((plan) => (
                        <div className="flex flex-col gap-1 bg-white p-6 border border-gray-100 shadow-lg rounded-lg   md:w-1/2">
                            <h1 className="text-[#191D23] text-lg font-semibold">{plan.title}</h1>
                            <p className={`text-[#64748B] ${plan.id === 2 ? 'w-3/4' : ''} text-sm`}>{plan.text}</p>
                            <div>
                                <p className="font-semibold text-2xl flex items-center gap-x-1 text-[#191D23]">
                                    {plan.amt}{' '}
                                    <span className="font-normal text-sm text-[#4B5768]">
                                        {plan.plan && `/ ${plan.plan}`}
                                    </span>
                                </p>
                            </div>
                            <Button
                                variant={'outline'}
                                className="border font-semibold mt-4 border-primary-0 text-primary-0 rounded-full "
                            >
                                {plan.btnText}
                            </Button>
                            <section className="flex flex-col gap-y-2 mt-8">
                                {plan.plans.map((_e) => (
                                    <div className="flex items-center gap-3">
                                        <div className="bg-[#E8EDFB] w-8 h-8 rounded-full flex justify-center items-center">
                                            <Check className="text-primary-0" size={16} />
                                        </div>
                                        <p className="text-[#191D23] text-sm">{_e}</p>
                                    </div>
                                ))}
                            </section>
                        </div>
                    ))}
                </AnimatedContainer>
                <div>
                    <p className="font-medium text-center py-6 text-[#9F9C9C]">
                        Compare all plans & features on the{' '}
                        <span className="text-primary-0 underline">pricing page.</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PlanSection;
