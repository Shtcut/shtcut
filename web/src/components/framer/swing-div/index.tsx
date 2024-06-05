import React from 'react';
import { motion } from 'framer-motion';

interface SwingingTextProps {
    text: string;
    spanClassName?: string;
}

const SwingingText = ({ text, spanClassName }: SwingingTextProps) => {
    const letters = text.split('');

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const child = {
        hidden: {
            opacity: 0,
            rotate: -90
        },
        visible: {
            opacity: 1,
            rotate: 0,
            transition: {
                type: 'spring',
                damping: 12,
                stiffness: 100
            }
        }
    };

    return (
        <motion.div className="inline-block" variants={container} initial="hidden" animate="visible">
            {letters.map((letter, index) => (
                <motion.span
                    key={index}
                    variants={child}
                    style={{ display: 'inline-block', whiteSpace: 'pre' }}
                    className={spanClassName}
                >
                    {letter}
                </motion.span>
            ))}
        </motion.div>
    );
};

export default SwingingText;
