/** @format */

'use client';

import { cn } from '@shtcut-ui/react';
import { AnimatePresence, Variants, motion } from 'framer-motion';

interface GradualSpacingProps {
    text: string;
    duration?: number;
    delayMultiple?: number;
    framerProps?: Variants;
    className?: string;
}

export default function GradualSpacing({
    text,
    duration = 0.5,
    delayMultiple = 0.04,
    framerProps = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
    },
    className
}: GradualSpacingProps) {
    return (
        <span className={cn('flex  flex-wrap lg:flex-none', className)}>
            <AnimatePresence>
                {text.split('').map((char, i) => (
                    <motion.span
                        key={i}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={framerProps}
                        transition={{ duration, delay: i * delayMultiple }}
                        className="drop-shadow-sm"
                    >
                        {char === ' ' ? <span>&nbsp;</span> : char}
                    </motion.span>
                ))}
            </AnimatePresence>
        </span>
    );
}
