/** @format */

import React from 'react';
import { Check } from 'lucide-react';

const Stepper = ({ step }: { step: number | undefined }) => {
    return (
        <div className="">
            <div className="mx-auto p-4  sm:w-full ">
                <div className="flex items-center w-full">
                    <div className="flex items-center text-muted-grey relative">
                        <div
                            className={` ${step === 2 || step === 3 ? 'bg-[#06B217] ' : 'border-[#D9D9D9] border-2'} rounded-full transition duration-500 ease-in-out h-[26px] w-[26px]  text-white flex justify-center items-center`}
                        >
                            {step === 1 && <div className="bg-[#06B217] w-[13px] h-[13px] rounded-full" />}
                            {step === 2 ? (
                                <Check size={20} color="white" className="text-white" />
                            ) : step === 3 ? (
                                <Check size={20} color="white" className="text-white" />
                            ) : null}
                        </div>
                        <h1 className="absolute top-0 -ml-12 text-center mt-8  w-32 text-xs sm:text-base font-medium  text-black">
                            URL
                        </h1>
                    </div>
                    <div
                        className={`flex-auto border-t-[10px] transition duration-500 ease-in-out  ${step === 2 || step === 3 ? 'border-[#06B217]' : 'border-[#F1F1F1]'} `}
                    ></div>
                    <div className="flex items-center text-white relative">
                        <div
                            className={`rounded-full transition duration-500 ease-in-out h-[26px] w-[26px]  ${
                                step === 1 ? 'border-2' : step === 2 ? ' border-2' : step === 3 ? 'bg-[#06B217] ' : ''
                            }  flex justify-center items-center `}
                        >
                            {step === 2 && <div className="bg-[#06B217] w-[13px] h-[13px] rounded-full" />}
                            {step === 3 && <Check size={20} />}
                        </div>
                        <h1
                            className={`absolute top-0 -ml-10 text-center mt-8  w-32 text-xs sm:text-base font-medium  text-black`}
                        >
                            Appearance
                        </h1>
                    </div>
                    <div className="flex-auto border-t-[10px] transition duration-500 ease-in-out border-[#F1F1F1]"></div>
                    <div className="flex items-center  relative">
                        <div
                            className={`rounded-full text-white flex justify-center border-2  items-center transition duration-500 ${
                                step === 3 ? '' : ' border-[#D9D9D9] border-muted-grey'
                            }  ease-in-out h-[26px] w-[26px] text-white`}
                        >
                            {step === 3 && <div className="bg-[#06B217] w-[13px] h-[13px] rounded-full" />}
                        </div>
                        <h1
                            className={`absolute top-0 sm:w-40 mt-8 sm:-ml-16 text-center -ml-2  text-xs sm:text-base font-medium `}
                        >
                            Done
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Stepper;
