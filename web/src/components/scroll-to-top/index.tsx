/** @format */
'use client';

import { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import AnimatedContainer from '../framer/animate-div';

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            {isVisible && (
                <AnimatedContainer
                    className={`fixed z-50 cursor-pointer bottom-12 right-12 transition-transform duration-500 ${
                        isVisible ? 'translate-y-0 opacity-100 animate-out' : 'translate-y-20 opacity-0'
                    }`}
                >
                    <div
                        onClick={scrollToTop}
                        className="bg-primary-0 w-8 h-8 rounded-full flex justify-center items-center"
                    >
                        <FaArrowUp color="white" />
                    </div>
                </AnimatedContainer>
            )}
        </>
    );
};

export default ScrollToTopButton;
