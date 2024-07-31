'use client';

import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface AnimatedContainerProps {
    children: React.ReactNode;
    className?: string;
    direction?: 'left' | 'right' | 'default';
    repeat?: boolean;
    style?: React.CSSProperties;
}

const AnimatedContainer = ({
    children,
    className,
    direction = 'default',
    repeat = false,
    style
}: AnimatedContainerProps) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ triggerOnce: !repeat, threshold: 0.1 });

    useEffect(() => {
        if (inView) {
            controls.start('visible');
            if (repeat) {
                controls.start('hidden').then(() => {
                    controls.start('visible');
                });
            }
        }
    }, [controls, inView, repeat]);

    const variants = {
        hidden: {
            opacity: 0,
            x: direction === 'left' ? -20 : direction === 'right' ? 20 : 0,
            y: direction === 'default' ? 20 : 0
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0
        }
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={variants}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className={className}
            style={style}
        >
            {children}
        </motion.div>
    );
};

export default AnimatedContainer;
