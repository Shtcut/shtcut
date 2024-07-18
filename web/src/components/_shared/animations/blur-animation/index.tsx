'use client';

import { cn } from '@shtcut-ui/react';
import { motion } from 'framer-motion';

interface BlurIntProps {
    word: string;
    className?: string;
    variant?: {
        hidden: { filter: string; opacity: number };
        visible: { filter: string; opacity: number };
    };
    duration?: number;
}
const BlurIn = ({ word, className, variant, duration = 1 }: BlurIntProps) => {
    const defaultVariants = {
        hidden: { filter: 'blur(10px)', opacity: 0 },
        visible: { filter: 'blur(0px)', opacity: 1 }
    };
    const combinedVariants = variant || defaultVariants;

    return (
        <motion.h1
            initial="hidden"
            animate="visible"
            transition={{ duration }}
            variants={combinedVariants}
            className={cn(className, '   drop-shadow-sm ')}
        >
            {word}
        </motion.h1>
    );
};

export default BlurIn;
