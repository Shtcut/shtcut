'use client';

import { Card } from '@shtcut-ui/react';
import AnimatedContainer from '@shtcut/components/framer/animate-div';
import CountUp from 'react-countup';

export const Stats = () => {
    const stats = [
        {
            data: 50,
            title: 'Global paying customers'
        },
        {
            data: 200,
            title: 'Links & QR Codes created monthly'
        },
        {
            data: 200000,
            title: 'Connections (clicks & scans) monthly'
        }
    ];
    return (
        <AnimatedContainer className="py-14 mt-5">
            <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
                <div className="max-w-2xl mt-5 mx-auto text-center">
                    <h2 className="font-heading  text-2xl drop-shadow-xl dark:bg-gradient-to-br dark:from-neutral-200 dark:to-neutral-600 dark:bg-clip-text dark:text-transparent sm:text-3xl md:text-4xl">
                        Experience the impact yourself, let results speak louder than our claims.
                    </h2>
                    <h2 className="mt-3 max-w-xl text-lg text-muted-foreground duration-500 ease-out animate-in fade-in zoom-in-50 slide-in-from-bottom-1/2">
                        Experience the tangible outcomes firsthand, allowing the actual results to speak volumes beyond
                        mere statements or claims.
                    </h2>
                </div>
                <Card className="mt-10 w-full mb-10 mx-auto px-4 text-gray-600 md:px-8 bg-transparent">
                    <div className="mt-12 mb-10">
                        <ul className="flex flex-col items-center justify-center gap-y-10 sm:flex-row sm:flex-wrap lg:divide-x">
                            {stats.map((item, idx) => (
                                <li key={idx} className="text-center px-12 md:px-16">
                                    <h4 className="text-4xl  text-blue-600 font-semibold">
                                        <CountUp
                                            duration={10}
                                            className="text-4xl  text-blue-600 font-semibold"
                                            end={item.data}
                                        />
                                    </h4>
                                    <p className="mt-3 text-muted-foreground font-medium">{item.title}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Card>
            </div>
        </AnimatedContainer>
    );
};
