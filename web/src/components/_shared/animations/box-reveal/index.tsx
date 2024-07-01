/** @format */

'use client';

import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface BoxRevealProps {
    children: JSX.Element;
    width?: 'fit-content' | '100%';
    boxColor?: string;
    duration?: number;
    className?: string;
}

export const BoxReveal = ({ children, width = 'fit-content', boxColor, duration, className }: BoxRevealProps) => {
    const mainControls = useAnimation();
    const slideControls = useAnimation();

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            slideControls.start('visible');
            mainControls.start('visible');
        } else {
            slideControls.start('hidden');
            mainControls.start('hidden');
        }
    }, [isInView, mainControls, slideControls]);

    return (
        <span ref={ref} style={{ position: 'relative', width, overflow: 'hidden' ,height:'100%' }}>
            <motion.span
                variants={{
                    hidden: { opacity: 0, y: 75 },
                    visible: { opacity: 1, y: 0 }
                }}
                initial="hidden"
                animate={mainControls}
                transition={{ duration: duration ? duration : 0.5, delay: 0.25 }}
                className={`h-full z-50 ${className}`}
            >
                {children}
            </motion.span>

            <motion.span
                variants={{
                    hidden: { left: 0 },
                    visible: { left: '100%' }
                }}
                initial="hidden"
                animate={slideControls}
                transition={{ duration: duration ? duration : 0.5, ease: 'easeIn' }}
                style={{
                    position: 'absolute',
                    top: 4,
                    bottom: 4,
                    left: 0,
                    right: 0,
                    zIndex: 20,
                    background: boxColor ? boxColor : '#5046e6'

                }}
            />
        </span>
    );
};

export default BoxReveal;
