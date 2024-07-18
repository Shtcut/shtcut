import { Logo } from '@shtcut/components/ui/logo';
import Image from 'next/image';
import React from 'react';
import { Link } from 'lucide-react';

const WelcomePage = () => {
    return (
        <div className="bg-primary-0 px-14 justify-between py-10 h-screen w-2/3 ">
            {/* overflow-y-auto */}
            <div className="">
                <Logo whiteLogo className="p-0" />
                <h1 className="text-background mt-8 leading-[48.3px] w-[418px] font-bold text-[42px]">
                    Generate short URLs with just a click
                </h1>
                <p className="text-background mt-2 font-medium">Say goodbye to chaos and hello to productivity</p>
            </div>
            <div className="py-6">
                <Image src={'/images/qrcode-d.png'} width={482} height={366} alt="auth-img" />
            </div>
            <div className="rounded-[10px] text-background bg-black/10 w-full p-6  flex flex-col gap-4 justify-between">
                <Link />
                <div>
                    <p className="text-2xl font-semibold">URL Shortener</p>
                    <p className="w-80">
                        Paste in any long url, make it sharable, trackable and customizable with just a few clicks.
                    </p>
                </div>
                <div className="bg-white w-2 h-2" />
            </div>
        </div>
    );
};
export default WelcomePage;
