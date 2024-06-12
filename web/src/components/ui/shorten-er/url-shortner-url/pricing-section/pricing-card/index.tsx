import { Button } from '@shtcut-ui/react';
import { Check } from 'lucide-react';
import React from 'react';

const PricingCard = ({ plan }: PlanCard) => {
    return (
        <div
            className={`flex flex-col gap-1  ${plan.id === 2 ? 'bg-primary-0 border-primary-0 text-white' : 'bg-white border-gray-100 '} p-6 border  shadow rounded-xl cursor-pointer w-full sm:w-[400px] lg:w-1/2 `}
            key={plan.id}
        >
            <h1 className={`text-lg font-semibold ${plan.id === 2 ? 'text-white' : 'text-[#191D23]'} `}>
                {plan.title}
            </h1>
            <p
                className={`${plan.id === 2 ? 'text-white' : 'text-[#64748B]'}  ${plan.id === 3 || plan.id === 2 ? 'w-5/6' : 'w-6/7'} text-sm`}
            >
                {plan.text}
            </p>
            <div>
                <p
                    className={`font-semibold text-2xl flex items-center gap-x-1  ${plan.id === 2 ? 'text-white' : 'text-[#191D23]'}`}
                >
                    {plan.amt}{' '}
                    <span className={`font-normal text-sm  ${plan.id === 2 ? 'text-[#F7F8F9]' : 'text-[#4B5768]'} `}>
                        {plan.plan && `/ ${plan.plan}`}
                    </span>
                </p>
            </div>
            <Button
                variant={'outline'}
                className="border font-semibold mt-4 border-primary-0 text-primary-0 rounded-full "
            >
                {plan.btnText}
            </Button>
            <section className="flex flex-col gap-y-2 mt-8">
                {plan.plans.map((_e) => (
                    <div className="flex items-center gap-3">
                        <div className="bg-[#E8EDFB] w-8 h-8 rounded-full flex justify-center items-center">
                            <Check className="text-primary-0" size={16} />
                        </div>
                        <p className={` ${plan.id === 2 ? 'text-white' : 'text-[#191D23]'} text-sm`}>{_e}</p>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default PricingCard;
