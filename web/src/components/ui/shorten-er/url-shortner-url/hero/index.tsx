import React, { useEffect } from 'react';
import { Link2, Minimize2 } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const HeroShorten = () => {
    useEffect(() => {
        AOS.init({
            offset: 200,
            duration: 1000,
            easing: 'ease-in-out',
            delay: 100,
            once: true
        });
    }, []);
    return (
        <section>
            <div className="max-w-screen-xl mx-auto  px-4 pt-10">
                <section className="flex justify-between lg:flex-row flex-col  items-center">
                    <div className="flex flex-col gap-4">
                        <h1 className="mt-4 font-heading text-4xl font-bold duration-500 ease-out animate-in fade-in-0 zoom-in-50 slide-in-from-bottom-1/2 [text-shadow:_0_4px_0_#e1e1e1] dark:bg-gradient-to-br dark:from-neutral-200 dark:to-neutral-600 dark:bg-clip-text dark:text-transparent dark:[text-shadow:none] md:text-7xl">
                            Generate short URLs with just a click
                        </h1>
                        <p className="w-2/3 text-black/60">
                            Paste in any long url, make it sharable, trackable and customizable with just a few clicks.
                        </p>
                        <div className="bg-white border-gray-100 h-12 sm:h-14 border pl-2 sm:pl-4 shadow-xl flex items-center justify-between rounded-full w-[18rem] sm:w-[24rem]">
                            <Link2 className="text-tertiary-100 text-xs" />
                            <div className="text-sm text-tertiary-100 font-semibold">https://www.google.com</div>
                            <div className="bg-blue-600 flex items-center justify-center gap-1 sm:gap-3 w-20 sm:w-36 h-full rounded-full">
                                <p className="text-white font-bold sm:text-base text-xs">Shorten</p>
                                <Minimize2 className="text-white" />
                            </div>
                        </div>
                    </div>

                    <div data-aos="zoom-in-up" className="w-full animate-bounce mt-10  lg:w-4/5">
                        <img src={'/all-hero.svg'} loading="lazy" className=" w-full " />
                    </div>
                </section>
            </div>
        </section>
    );
};
export default HeroShorten;
