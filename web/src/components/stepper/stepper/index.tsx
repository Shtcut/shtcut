/** @format */

import { Check } from 'lucide-react';
import React from 'react';


const Stepper = ({ step }: { step: number }) => {
    return (
        <div className="mx-auto p-4 sm:w-full">
            <div className="flex flex-col items-start w-full">
                <StepperStep
                    number={1}
                    label={
                        <section className="text-white">
                            <h1 className="font-semibold">How do you plan to use Shrtcut</h1>
                            <p className="text-sm"> To help tailor your shhtcut experience</p>
                        </section>
                    }
                    isActive={step === 1}
                    isCompleted={step > 1}
                />
                <StepperDivider isActive={step >= 2} />
                <StepperStep
                    number={2}
                    label={
                        <section className="text-white">
                            <h1 className="font-semibold">Solutions</h1>
                            <p className="text-sm"> Which solution would you like to start with</p>
                        </section>
                    }
                    isActive={step === 2}
                    isCompleted={step > 2}
                />
                <StepperDivider isActive={step >= 3} />
                <StepperStep
                    number={3}
                    label={
                        <section className="text-white">
                            <h1 className="font-semibold">Invite members</h1>
                            <p className="text-sm"> Invite people to your workspace</p>
                        </section>
                    }
                    isActive={step === 3}
                    isCompleted={step > 3}
                />
                <StepperDivider isActive={step >= 4} />
                <StepperStep
                    number={4}
                    label={
                        <section className="text-white">
                            <h1 className="font-semibold">Tools you use</h1>
                            <p className="text-sm"> To help tailor your shhtcut experience</p>
                        </section>
                    }
                    isActive={step === 4}
                    isCompleted={step > 4}
                />
            </div>
        </div>
    );
};

const StepperStep = ({
    number,
    label,
    isActive,
    isCompleted
}: {
    number: number;
    label: any;
    isActive: boolean;
    isCompleted: boolean;
}) => {
    return (
        <div className="flex items-center relative">
            <div
                className={`font-bold rounded-full transition duration-500 ease-in-out h-12 w-12 py-3  flex justify-center items-center ${
                    isActive
                        ? 'bg-white text-primary-0'
                        : isCompleted
                          ? 'bg-green-500 border-2 border-[#7498F0] text-white'
                          : ' bg-[#CCCBCB] text-white'
                }`}
            >
                {isCompleted ? <Check /> : number}
            </div>
            <h1 className={`ml-2 text-xs sm:text-base font-medium ${isActive ? 'text-black' : 'text-muted-grey'}`}>
                {label}
            </h1>
        </div>
    );
};

const StepperDivider = ({ isActive }: { isActive: boolean }) => (
    <div className="flex items-center h-14 ml-6">
        <div
            className={`border-l-[3px] transition duration-500 ease-in-out h-full ${
                isActive ? 'border-[#2d5fdd]' : 'border-muted-grey'
            }`}
        ></div>
    </div>
);

export default Stepper;
