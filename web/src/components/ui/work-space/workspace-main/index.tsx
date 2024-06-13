import React from 'react';
import { Button } from '@shtcut-ui/react';
import { useMediaQuery } from 'react-responsive';
import HeadersTitle from './headers';
import { HowTopPlan, SolutionUi } from './steps-ui';
import InviteForm from './invite-form';
import ToolsUi from './tools-ui';

const WorkSpaceMain = ({
    handleOptionChange,
    userValue,
    form,
    step,
    handleNext,
    handlePrevious,
    handleSelect,
    solutionValues,
    toolsValues,
    handleSelectTools
}: PropsCreate) => {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1125px)' });
    return (
        <div className="bg-white flex justify-center items-center h-full  w-full">
            <div className="flex flex-col lg:pl-4 items-center w-full gap-y-2">
                <HeadersTitle step={step} />
                <section className={`${isTabletOrMobile ? 'w-full' : 'w-4/5'}  mt-4`}>
                    {step === 1 && (
                        <HowTopPlan
                            form={form}
                            handleNext={handleNext}
                            handleOptionChange={handleOptionChange}
                            handlePrevious={handlePrevious}
                            step={step}
                            userValue={userValue}
                        />
                    )}
                    {step === 2 && <SolutionUi handleSelect={handleSelect} solutionValues={solutionValues} />}
                    {step === 3 && <InviteForm form={form} />}
                    {step === 4 && <ToolsUi handleSelectTools={handleSelectTools} toolsValues={toolsValues} />}
                    <div className="flex justify-between gap-x-4  w-full mt-10">
                        {step > 1 && (
                            <Button
                                variant={'outline'}
                                className="border border-[#2B2829] w-full"
                                onClick={() => {
                                    step === 3 ? handleNext() : handlePrevious();
                                }}
                            >
                                {step === 3 ? 'Skip for now' : '   Previous'}
                            </Button>
                        )}
                        <Button className="bg-primary-0 w-full" onClick={handleNext}>
                            {step < 4 ? 'Next' : 'Submit'}
                        </Button>
                    </div>
                    <div className="flex justify-center mt-20 items-center gap-x-2">
                        {[1, 2, 3, 4].map((page) => (
                            <div
                                key={page}
                                className={`w-20 h-[6px] rounded-full transition duration-500 ease-in-out ${
                                    step >= page ? 'bg-primary-0' : 'bg-[#DCE5FB]'
                                }`}
                            />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default WorkSpaceMain;
