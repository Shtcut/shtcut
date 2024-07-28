import React, { useEffect, useState } from 'react';
import './styles/style.css';
import { Button } from '@shtcut-ui/react';
import Image from 'next/image';
import BlurIn from '@shtcut/components/_shared/animations/blur-animation';
import AnimatedContainer from '@shtcut/components/framer/animate-div';
import useWindowSize from '@shtcut/components/_shared/Responsiveness';
const HeroLanding = () => {
    const { height, width } = useWindowSize();
    const mobile = height !== undefined && height <= 1181;
    const mobileWidth = width !== undefined && width <= 768;
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
        <AnimatedContainer className="relative max-w-screen-custom mx-auto px-4 ">
            {/* Sticky Header */}
            <div
                className={`md:sticky   flex flex-col gap-y-6 top-20 w-full md:w-[584px] mx-auto mb-2 z-0 p-6 ${mobileWidth ? 'pt-28' : 'md:pt-0'} `}
                style={{ opacity: opacity }}
            >
                <BlurIn
                    word={
                        <h1 className="text-3xl sm:text-[50px] sm:leading-[56px] text-center font-semibold">
                            All in one <span className="text-primary-0">digital marketing</span> platform
                        </h1>
                    }
                />

                <p className="text-center text-sm">
                    URL Shorten-er, Survey Creation, Email Marketing and Social media management. Start in three steps,
                    track issues easily, and adopt in days, not weeks.
                </p>
                <div className="flex justify-center items-center gap-x-3">
                    <Button className="bg-primary-0 cursor-pointer text-xs">Watch a Demo</Button>
                    <Button variant={'outline'} className="border cursor-pointer text-xs border-black">
                        Watch a Demo
                    </Button>
                </div>
            </div>
            <div
                className={` z-20 h-screen overflow-hidden relative  md:top-6 w-full mx-auto hero-header_content-bottom ${mobile ? 'top-10' : ''} `}
            >
                <Image
                    width={0}
                    height={0}
                    src="/images/landing-img.png"
                    alt="Hero"
                    className="absolute  inset-0 w-full md:max-w-[90%] h-full z-40 object-cover image-wrapper_image"
                    style={{
                        transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`,
                        transition: 'transform 0.1s ease-out'
                    }}
                    sizes="100vw"
                    loading="eager"
                />
            </div>
        </AnimatedContainer>
    );
};

export default HeroLanding;
