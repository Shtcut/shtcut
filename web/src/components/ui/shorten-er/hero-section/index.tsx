import { Button, Input } from '@shtcut-ui/react';
import React from 'react';
import { RiLink } from 'react-icons/ri';
import { Link } from 'lucide-react';
import { useMediaQuery } from 'react-responsive';
import { motion } from 'framer-motion';
import SwingingText from '@shtcut/components/framer/swing-div';

const HeroSection = () => {
    const smallMobile = useMediaQuery({ query: '(max-width: 640px' });
    const rateData = [
        {
            amount: '176,000',
            text: 'Global paying customers'
        },
        {
            amount: '1,350,050 ',
            text: 'Links & QR Codes created monthly'
        },
        {
            amount: '176,000 ',
            text: 'Apps integrations'
        }
    ];
    return (
        <section>
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="max-w-screen-xl mx-auto px-4 pt-40"
            >
                <div className="flex flex-col items-center gap-y-4">
                    <Button className="rounded-full  bg-[#DCE5FB]/40  text-[#092059]" variant={'outline'}>
                        Join the Shtcut evolution today 🎉
                    </Button>
                    <h1 className="text-4xl sm:text-6xl sm:w-[40rem] sm:leading-[55px] text-center  font-semibold">
                        <h1 className="text-4xl sm:text-6xl sm:w-[40rem] sm:leading-[55px] text-center font-semibold">
                            <SwingingText text="Generate " spanClassName="inline-block" />
                            <span className="text-primary-0">
                                <SwingingText text="short URLs" spanClassName="inline-block" />
                            </span>
                            <SwingingText text=" with just a click" spanClassName="inline-block" />
                        </h1>
                    </h1>
                    <p className="text-[#2B2829] w-full sm:w-[30rem] text-center">
                        Paste in any long url, make it sharable, trackable and customizable with just a few clicks.
                    </p>
                </div>
                <section className="mt-8">
                    <div className="bg-white w-full lg:w-4/5 mx-auto shadow-lg border border-gray-100 px-4 py-6 flex flex-col gap-y-8 rounded-xl sm:rounded-2xl">
                        <h1 className="text-[#433E3F]font-semibold text-center text-xl sm:text-3xl">
                            Shorten URL here
                        </h1>
                        <div className="w-full sm:w-2/3 sm:mx-auto relative flex items-center ">
                            <Input
                                className="border-2 border-primary-0  w-full rounded-full pl-8 sm:pl-14 text-tertiary-100  h-12  "
                                placeholder="https://www.google.com"
                            />
                            <div className="absolute  border top-0 mt-4 left-2 sm:left-4">
                                <RiLink className="text-tertiary-100" />
                            </div>
                            <Button className="absolute right-0 sm:w-32 border top-0 mt-[7px] text-[11px] sm:text-sm flex items-center font-semibold gap-x-2 mr-2 bg-primary-0  rounded-full">
                                Shorten <Link size={smallMobile ? 12 : 16} />
                            </Button>
                        </div>

                        <div className="flex sm:flex-row sm:justify-around flex-col gap-y-4">
                            {rateData.map((rate) => (
                                <div className="flex flex-col gap-y-1">
                                    <h1 className="text-2xl sm:text-4xl text-primary-0 font-semibold text-center">
                                        <SwingingText text={`${rate.amount} +`} spanClassName="inline-block" />
                                    </h1>
                                    <p className="text-[#5A5555] sm:text-base text-sm text-center">{rate.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </motion.div>
        </section>
    );
};

export default HeroSection;
