import Image from 'next/image';
import React from 'react';
import { useMediaQuery } from 'react-responsive';

const WelcomePage = () => {
    const mobile = useMediaQuery({ query: '(max-width: 1024px' });
    return (
        <div className="relative w-[30rem] h-full">
            <Image src="/images/auth.png" className="rounded-2xl" alt="Background" layout="fill" objectFit="cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#2F64E9] to-[#2F64E9] opacity-50 z-20 rounded-2xl"></div>
            <div className="absolute inset-0 p-10 flex flex-col justify-between text-white text-3xl z-30">
                <div>
                    <h1 className="text-4xl font-bold">Welcome to SHTCUT</h1>
                    <p className="text-base">Your Gateway to Effortless Management.</p>
                </div>
                <div>
                    <h1 className="text-4xl ">URL Shortener</h1>
                    <p className="text-sm">
                        Paste in any long url, make it sharable, trackable and customizable with just a few clicks.
                    </p>
                </div>
            </div>
        </div>
    );
};
export default WelcomePage;
