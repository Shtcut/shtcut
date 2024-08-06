import { Logo } from '@shtcut/components/ui/logo';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Link } from 'lucide-react';
import useWindowSize from '@shtcut/components/_shared/Responsiveness';
import { authSlides } from '@shtcut/_shared/data';

const WelcomePage = () => {
    const { width } = useWindowSize();
    const mobileTab = width !== undefined && width <= 1320;
  
    const [activeSlide, setActiveSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % authSlides.length);
        }, 6000);

        return () => clearInterval(interval);
    }, []);
    return (
        <section
            className={`bg-primary-0 relative   justify-between py-10 h-screen ${mobileTab ? 'px-5  w-4/5' : 'px-14  w-2/3'} `}
        >
            {authSlides.map((slider, index) => (
                <div
                    key={slider.id}
                    className={` absolute top-10 transition-opacity duration-1000 ease-in-out ${
                        index === activeSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    <div className="">
                        <Logo whiteLogo className="p-0" />
                        <h1 className="text-background mt-8 leading-[48.3px] w-[418px] font-bold text-[38px]">
                            {slider.title}
                        </h1>
                        <p className="text-background mt-2 font-medium">{slider.text}</p>
                    </div>
                    <div className="py-6">
                        <Image
                            src={slider.image}
                            width={mobileTab ? 400 : 482}
                            height={mobileTab ? 300 : 366}
                            alt="auth-img"
                        />
                    </div>
                    <div className="rounded-[10px] text-background bg-black/10 w-full p-6  flex flex-col gap-4 justify-between">
                        <Link />
                        <div>
                            <p className="text-2xl font-semibold">{slider.subTitle}</p>
                            <p className="w-80">{slider.text}</p>
                        </div>
                        <div className="bg-white w-2 h-2" />
                    </div>
                </div>
            ))}
        </section>
    );
};
export default WelcomePage;
