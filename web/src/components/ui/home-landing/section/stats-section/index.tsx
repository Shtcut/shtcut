import React from 'react';

import { Card } from '@shtcut-ui/react';
import NumberTicker from '@shtcut/components/_shared/Number-Ticker';

const StatsSection = () => {
    const stats = [
        { value: 4875, label: 'ACTIVE COMPANIES', suffix: '' },
        { value: 280, label: 'LINKS CREATED', suffix: 'k' },
        { value: 1.5, label: 'CLICKS TRACKED', suffix: 'M' }
    ];

    return (
        <div className="px-4 max-w-screen-custom mx-auto">
            <Card className="h-36 flex justify-around w-full">
                <div className="flex justify-evenly items-center gap-3 flex-1">
                    {stats.map((stat) => (
                        <div key={stat.label} className="flex flex-col gap-1 justify-center items-center">
                            <h1 className="text-2xl sm:text-4xl font-bold">
                                <NumberTicker value={stat.value} suffix={stat.suffix} />
                            </h1>
                            <p className="text-[#6F6F6F] text-xs text-center font-semibold">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default StatsSection;
