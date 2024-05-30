'use client';

import { Button, Input } from '@shtcut-ui/react';
import Image from 'next/image';
import React from 'react';
import { useMediaQuery } from 'react-responsive';

const WaitListComponent = () => {
    const mobile = useMediaQuery({ query: '(max-width: 640px' });
    return (
        <div className="flex justify-center flex-col items-center h-screen  gap-4 max-w-screen-xl mx-auto px-4 ">
            <Button
                className="rounded-full border border-primary-300 bg-transparent text-primary-300"
                variant={'outline'}
            >
                The Shtcut evolution coming soon 🎉
            </Button>
            <h1 className="text-4xl sm:text-6xl sm:w-[40rem] sm:leading-[55px] text-center  font-semibold ">
                Join the waitlist for{' '}
                <span className="inline-flex  relative top-2 sm:top-3">
                    <Image
                        width={mobile ? 30 : 60}
                        height={mobile ? 30 : 60}
                        style={{ objectFit: 'contain' }}
                        alt="logo"
                        src={'/images/logo.png'}
                    />{' '}
                    Shtcut
                </span>{' '}
                <span className=""> Today!</span>
            </h1>
            <p className="text-center text-[#2B2829] w-full sm:w-[38rem]">
                Digital marketing platform with all you need ; URL Shorten-er, Survey Creation, Email Marketing and
                Social media management - all in one place!Sign up to our waitlist to get notified when we launch.
            </p>
            <div className=" flex w-full sm:w-fit justify-center gap-4">
                <div className="w-full sm:w-96 sm:mx-auto relative flex items-center ">
                    <Input
                        className="border border-tertiary-500 w-full rounded-full text-tertiary-600 h-12 pr-12 "
                        placeholder="Your Email address"
                    />
                    <Button className="absolute right-0 top-0 mt-[7px] sm:text-sm text-[10px] mr-2 bg-primary-0 rounded-full">
                        Join the waitlist
                    </Button>
                </div>
                <Image
                    width={mobile ? 30 : 60}
                    height={mobile ? 30 : 60}
                    style={{ objectFit: 'contain' }}
                    alt="logo"
                    src={'/images/Arrow.png'}
                />
            </div>
        </div>
    );
};

export default WaitListComponent;
