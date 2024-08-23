'use client';

import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@shtcut-ui/react';

export default function NumberTicker({
    value,
    direction = 'up',
    delay = 0,
    suffix = '',
    className
}: {
    value: number;
    direction?: 'up' | 'down';
    className?: string;
    delay?: number;
    suffix?: string;
}) {
    const ref = useRef<HTMLSpanElement>(null);
    const motionValue = useMotionValue(direction === 'down' ? value : 0);
    const springValue = useSpring(motionValue, {
        damping: 60,
        stiffness: 300
    });
    const isInView = useInView(ref, { once: true, margin: '0px' });

    useEffect(() => {
        if (isInView) {
            setTimeout(() => {
                motionValue.set(direction === 'down' ? 0 : value);
            }, delay * 1000);
        }
    }, [motionValue, isInView, delay, value, direction]);

    useEffect(
        () =>
            springValue.on('change', (latest) => {
                if (ref.current) {
                    const formattedValue = Intl.NumberFormat('en-US').format(Number(latest.toFixed(0)));
                    ref.current.textContent = `${formattedValue}${suffix}`;
                }
            }),
        [springValue, suffix]
    );

    return (
        <span
            className={cn('inline-block tabular-nums text-black dark:text-white tracking-wider', className)}
            ref={ref}
        />
    );
}
