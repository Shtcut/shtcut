'use client';

import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface AnimatedContainerProps {
    children: React.ReactNode;
    className?: string;
}

const AnimatedContainer = ({ children, className }: AnimatedContainerProps) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default AnimatedContainer;
