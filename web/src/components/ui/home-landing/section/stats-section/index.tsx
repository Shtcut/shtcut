import { Card } from '@shtcut-ui/react';
import AnimatedContainer from '@shtcut/components/framer/animate-div';
import React from 'react';

const StatsSection = () => {
    const stats = [
        { value: '4,875', label: 'ACTIVE COMPANIES' },
        { value: '280K', label: 'LINKS CREATED' },
        { value: '1.5M+', label: 'CLICKS TRACKED' }
    ];
    return (
        <AnimatedContainer className="px-4 max-w-screen-custom mx-auto">
            <Card className="h-36 flex justify-around w-full">
                <div className="flex justify-evenly items-center gap-3 flex-1">
                    {stats.map((stat) => (
                        <div key={stat.label} className="flex flex-col gap-1 justify-center items-center">
                            <h1 className="text-2xl sm:text-4xl font-bold">{stat.value}</h1>
                            <p className="text-[#6F6F6F] text-xs text-center font-semibold">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </Card>
        </AnimatedContainer>
    );
};

export default StatsSection;
