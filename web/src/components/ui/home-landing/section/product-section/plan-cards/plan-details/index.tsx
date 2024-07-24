import { Button } from '@shtcut-ui/react';
import { Check } from 'lucide-react';
import React from 'react';

const PlanDetails = ({ plan }: { plan: any }) => {
    return (
        <div
            className={`flex flex-col gap-1 h-fit md:h-[525px] bg-background  ${plan.id === 2 ? 'border-primary-0  border-[1.5px]' : ' border-[#EDEDED] '} p-6 border  shadow-sm rounded-xl cursor-pointer w-full sm:w-[400px] lg:w-1/2 `}
            key={plan.id}
        >
            <h1 className={`text-lg font-medium  `}>{plan.title}</h1>
            <p className={`  ${plan.id === 3 || plan.id === 2 ? 'w-5/6' : 'w-6/7'} text-xs`}>{plan.text}</p>
            <div className="mt-4">
                <p className={`font-semibold  flex items-center gap-x-1  `}>
                    {plan.amt} <span className={`font-normal text-xs  `}>{plan.plan && `/ ${plan.plan}`}</span>
                </p>
            </div>
            <Button
                variant={'outline'}
                className="border font-medium text-xs mt-4 border-primary-0 text-primary-0 rounded-[6px] "
            >
                {plan.btnText}
            </Button>
            <section className="flex flex-col gap-y-2 mt-8">
                {plan.plans.map((_e, index) => (
                    <div className="flex items-center gap-3" key={index}>
                        <div className="bg-[#E8EDFB] w-5 h-5 rounded-full flex justify-center items-center">
                            <Check className="text-primary-0" size={10} />
                        </div>
                        <p className={` text-xs`}>{_e}</p>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default PlanDetails;
