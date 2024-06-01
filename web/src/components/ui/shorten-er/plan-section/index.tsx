import AnimatedContainer from '@shtcut/components/framer/animate-div';
import React from 'react';

const PlanSection = () => {
    return (
        <div>
            <div className="max-w-screen-xl mx-auto px-4 pt-16 md:pt-20">
                <AnimatedContainer className="flex flex-col gap-4 items-center">
                    <h1 className="text-5xl font-semibold">
                        Powerful <span className="text-primary-0">features</span> on all plans for you
                    </h1>
                    <p className='w-[35rem] mx-auto text-center'>
                        URL Shorten-er, Survey Creation, Email Marketing and Social media management - all in one place!
                    </p>
                    <div>
                        <h1>hey</h1>
                    </div>
                </AnimatedContainer>
            </div>
        </div>
    );
};

export default PlanSection;
