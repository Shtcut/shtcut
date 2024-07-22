import React, { useEffect, useState } from 'react';
import './styles/style.css';
import { Button } from '@shtcut-ui/react';
const HeroLanding = () => {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const maxRotationX = 16;
    const rotationX = Math.max(maxRotationX - scrollY / 20, 0);
    const rotationY = 0;

    const maxOpacity = 1;
    const minOpacity = 0;
    const fadeStart = 100;
    const fadeEnd = 300;

    const opacity = Math.max(minOpacity, Math.min(maxOpacity, 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart)));
    return (
        <div className="relative">
            {/* Sticky Header */}
            <div
                className="sticky flex flex-col gap-y-6 top-20 w-[584px] mx-auto bg-white z-10 p-6"
                style={{ opacity: opacity }}
            >
                <h1 className="text-[50px] leading-[56px] text-center font-semibold">
                    All in one <span className="text-primary-0">digital marketing</span> platform
                </h1>
                <p className="text-center text-sm">
                    URL Shorten-er, Survey Creation, Email Marketing and Social media management. Start in three steps,
                    track issues easily, and adopt in days, not weeks.
                </p>
                <div className="flex justify-center items-center gap-x-3">
                    <Button className="bg-primary-0">Watch a Demo</Button>
                    <Button variant={'outline'} className="border border-black">
                        Watch a Demo
                    </Button>
                </div>
            </div>
            <div className="relative bottom-60 z-30 h-screen overflow-hidden w-5/6 mx-auto hero-header_content-bottom is-pad hide-mobile-landscape">
                <img
                    src="/images/landing-img.png"
                    alt="Hero"
                    className="absolute inset-0 w-full h-full object-cover image-wrapper_image"
                    style={{
                        transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`,
                        transition: 'transform 0.1s ease-out'
                    }}
                    sizes="100vw"
                    loading="eager"
                />
            </div>
        </div>
    );
};

export default HeroLanding;
