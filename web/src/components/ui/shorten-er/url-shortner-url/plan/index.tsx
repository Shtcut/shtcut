'use client';
import React, { useState } from 'react';
import { Button } from '@shtcut-ui/react';
import { PLANS } from '@shtcut/_shared/data';
import PlanTab from '@shtcut/components/tabs/pricing-tab';
import { Check } from 'lucide-react';

import ConfettiExplosion, { ConfettiProps } from 'react-confetti-explosion';

const mediumProps: ConfettiProps = {
    force: 0.6,
    duration: 2500,
    particleCount: 100,
    width: 1000,
    colors: ['#9A0023', '#FF003C', '#AF739B', '#FAC7F3', '#F7DBF4']
};

const PlanShorten = () => {
    const [isExploding, setIsExploding] = useState(false);
    console.log('isexplode', isExploding);
    return (
        <div className="max-w-screen-xl px-4  mx-auto">
            <section className="flex flex-col gap-6">
                <h2
                    className="font-heading text-2xl drop-shadow-xl dark:bg-gradient-to-br dark:from-neutral-200 dark:to-neutral-600 dark:bg-clip-text dark:text-transparent sm:text-3xl md:text-6xl text-center"
                    onClick={() => setIsExploding(false)}
                >
                    Choose Plan
                </h2>

                <h2 className="font-heading text-2xl drop-shadow-xl dark:bg-gradient-to-br dark:from-neutral-200 dark:to-neutral-600 dark:bg-clip-text dark:text-transparent sm:text-3xl md:text-6xl text-center ">
                    That’s Right For You
                </h2>
                <p className="text-black/60 font-extrabold text-center sm:w-[35rem] mx-auto text-lg ">
                    Gain control over your links with <span className="font-light">SHTCUT</span> Core by choosing a plan
                    that works best for you, feel free to contact us
                </p>
            </section>
            <section className="flex justify-center mt-6 mb-10">
                <PlanTab />
            </section>
            <section className=" flex justify-center z-50 relative top-4">
                <Button className="bg-primary-0 rounded-full h-12 font-bold">Most Popular</Button>
            </section>
            <section className="grid mb-10 sm:grid-cols-2 lg:grid-cols-3    sm:w-5/6 mx-auto gap-4 ">
                {PLANS.map((_e) => (
                    <div
                        key={_e.id}
                        className="w-full shadow-sm border p-4 md:p-8  rounded-xl hover:bg-white transition-transform duration-200 hover:-translate-y-2 cursor-pointer"
                    >
                        <div className="flex flex-col gap-1">
                            <h1 className="font-bold text-xl">{_e.status}</h1>
                            <div className="flex items-center gap-2">
                                <h1 className="font-bold text-3xl">${_e.amt}</h1>
                                <p className="text-tertiary-400 text-xs md:text-sm">{_e.section}</p>
                            </div>
                            <p className="md:w-6/7">{_e.text}</p>
                        </div>
                        <section className={`flex flex-col gap-3 ${_e.id === 1 ? 'my-12' : 'my-6'}`}>
                            {_e.data.map((str, idx) => (
                                <div key={`${str}-${idx}`} className="flex  gap-2">
                                    <div className="w-5 h-5 rounded-full bg-tertiary-300 flex justify-center items-center font-semibold text-white relative top-0.5">
                                        <Check size={'12px'} color="white" className="font-bold" />
                                    </div>
                                    <p className="font-light text-sm">{str}</p>
                                </div>
                            ))}
                        </section>
                        <div className="w-full flex items-center gap-2 ">
                            <Button
                                className={`${
                                    _e.id === 1 ? 'bg-white text-primary-0' : 'bg-primary-0 '
                                } rounded-full w-full h-12 shadow-md ${
                                    _e.id === 1 ? 'border border-gray-100' : ''
                                } font-semibold hover:text-white`}
                            >
                                {_e.id === 1 ? 'Signup for free ' : _e.id === 2 ? 'Go to pro' : 'Start Free Trial'}
                            </Button>
                            {_e.id === 3 && (
                                <Button className=" bg-white rounded-full w-full border-primary-0 text-primary-0 border hover:text-white h-12 font-semibold">
                                    Request Trial
                                </Button>
                            )}
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default PlanShorten;
