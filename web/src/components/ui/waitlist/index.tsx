'use client';

import { Button, Input } from '@shtcut-ui/react';

import Image from 'next/image';
import React from 'react';
import { useMediaQuery } from 'react-responsive';

import { motion } from 'framer-motion';
import TypingText from '@shtcut/components/typewriter';
const WaitListComponent = () => {
    const mobile = useMediaQuery({ query: '(max-width: 640px' });
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'linear' }}
        >
            <div className="flex justify-center flex-col items-center h-screen  gap-4 max-w-screen-xl mx-auto px-4 ">
                <Button
                    className="rounded-full border border-primary-300 bg-transparent text-primary-300"
                    variant={'outline'}
                >
                    The Shtcut evolution coming soon 🎉
                </Button>

                <h1 className="text-4xl sm:text-6xl sm:w-[40rem] sm:leading-[55px] text-center  font-semibold ">
                    Join the waitlist for{' '}
                    <span className="inline-flex  relative top-2 text-primary-0 sm:top-3">
                        <Image
                            width={mobile ? 30 : 60}
                            height={mobile ? 30 : 60}
                            style={{ objectFit: 'contain' }}
                            alt="logo"
                            src={'/images/logo.png'}
                        />
                        {'   '}
                        Shtcut
                    </span>{' '}
                    <span className="">
                        {' '}
                        <TypingText text="Today!" speed={300} />
                    </span>
                </h1>
                <p className="text-center text-[#2B2829] w-full ">
                    Digital marketing platform with all you need ; URL Shorten-er, Survey
                    <br className="sm:flex hidden" /> Creation, Email Marketing and Social media management - all in one
                    place! <br className="sm:flex hidden" /> Sign up to our waitlist to get notified when we launch.
                </p>
                <div className="relative w-full sm:w-[40rem]">
                    <div className="w-full  sm:w-96 sm:mx-auto relative flex items-center ">
                        <Input
                            className="border border-tertiary-500 w-full rounded-full text-tertiary-600 h-12 pr-12 "
                            placeholder="Your Email address"
                        />
                        <Button className="absolute right-0 top-0 mt-[7px] sm:text-sm text-[10px] mr-2 bg-primary-0 rounded-full">
                            Join the waitlist
                        </Button>
                    </div>
                    <section className="flex justify-end sm:absolute    right-12 top-2 ">
                        <Image
                            width={mobile ? 40 : 60}
                            height={mobile ? 40 : 60}
                            style={{ objectFit: 'contain' }}
                            alt="logo"
                            src={'/images/Arrow.png'}
                        />
                    </section>
                </div>
            </div>
        </motion.div>
    );
};

export default WaitListComponent;
