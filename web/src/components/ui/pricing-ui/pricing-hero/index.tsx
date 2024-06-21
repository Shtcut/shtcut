'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@shtcut-ui/react';

const PricingHero = () => {
    return (
        <motion.div
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="max-w-screen-xl mx-auto px-4 pt-40"
            id="down"
        >
            <div className="flex flex-col items-center gap-y-4">
                <Button className="rounded-full  bg-[#DCE5FB]/40  text-[#092059]" variant={'outline'}>
                    Join the Shtcut evolution today 🎉
                </Button>
                <h1 className="text-4xl sm:text-6xl sm:w-[40rem] sm:leading-[55px] text-center  font-semibold">
                    <h1 className="text-4xl sm:text-6xl sm:w-[40rem] sm:leading-[55px] text-center font-semibold">
                        Pricing plans
                    </h1>
                </h1>
                <p className="text-[#2B2829] w-full sm:w-[30rem] text-center">
                    Paste in any long url, make it sharable, trackable and customizable with just a few clicks.
                </p>
            </div>
        </motion.div>
    );
};

export default PricingHero;
