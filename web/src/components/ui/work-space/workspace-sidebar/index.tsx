import React from 'react';
import { Logo } from '../../logo';
import { Stepper } from '@shtcut/components/stepper';
import AnimatedContainer from '@shtcut/components/framer/animate-div';

const WorkSpaceSideBar = ({ step }: { step: number }) => {
    return (
        <div className="bg-primary-0 hidden lg:flex flex-col justify-between py-10 px-6 rounded-xl h-full w-[40rem]">
            <AnimatedContainer direction="left">
                <Logo whiteLogo />
                <Stepper step={step} />
            </AnimatedContainer>
            <div className="flex justify-between items-center">
                <p className="text-[#CCCBCB]">Shutcut 2024</p>
                <p className="text-[#CCCBCB] flex items-center gap-x-2">
                    <div className="w-4 h-4 bg-[#D9D9D9]" />
                    help@shrtcut.com
                </p>
            </div>
        </div>
    );
};

export default WorkSpaceSideBar;
