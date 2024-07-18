'use client';

import { cn } from '@shtcut-ui/react';
import { motion, Variants } from 'framer-motion';


interface WordFadeInProps {
    words: string;
    className?: string;
    delay?: number;
    variants?: Variants;
}

export default function WordFadeIn({
    words,
    delay = 0.15,
    variants = {
        hidden: { opacity: 0 },
        visible: (i: any) => ({
            y: 0,
            opacity: 1,
            transition: { delay: i * delay }
        })
    },
    className
}: WordFadeInProps) {
    const _words = words.split(' ');

    return (
        <motion.h1
            variants={variants}
            initial="hidden"
            animate="visible"
            className={cn(
                'tracking-[-0.01em] text-black drop-shadow-sm dark:text-white ',
                className
            )}
        >
            {_words.map((word, i) => (
                <motion.span key={word} variants={variants} custom={i}>
                    {word}{' '}
                </motion.span>
            ))}
        </motion.h1>
    );
}
