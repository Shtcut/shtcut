import React from 'react';
import { useMediaQuery } from 'react-responsive';
import HeadersTitle from './headers';
import { HowTopPlan, ModuleUi } from './steps-ui';
import InviteForm from './invite-form';
import ToolsUi from './tools-ui';
import { PropsCreate } from '@shtcut/types/types';
import { AppButton } from '@shtcut/components/_shared';

const WorkSpaceMain = ({
    handleOptionChange,
    userValue,
    form,
    step,
    handleNext,
    handlePrevious,
    handleSelect,
    modules,
    toolsValues,
    handleSelectTools,
    isLoading
}: PropsCreate) => {
    const isTab = useMediaQuery({ query: '(max-width: 1247px)' });
    return (
        <div
            className={`bg-white flex justify-center items-center h-full ${isTab ? 'w-full' : ' w-[700px] '}  mx-auto`}
        >
            <div className="flex flex-col  lg:pl-4 items-center w-full gap-y-2">
                <HeadersTitle step={step} />
                <section className={'w-full  mt-4'}>
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
                    {step === 2 && <ModuleUi handleSelect={handleSelect} modules={modules} />}
                    {step === 3 && <InviteForm form={form} />}
                    {step === 4 && <ToolsUi handleSelectTools={handleSelectTools} toolsValues={toolsValues} />}
                    <div className="flex justify-between gap-x-4  w-full mt-10">
                        {step > 1 && (
                            <AppButton
                                type="button"
                                variant={'outline'}
                                className="border border-[#2B2829] w-full"
                                onClick={() => handlePrevious()}
                                loading={isLoading}
                            >
                                Previous
                            </AppButton>
                        )}
                        <AppButton
                            type={step === 4 ? 'submit' : 'button'}
                            className="bg-primary-0 w-full"
                            onClick={handleNext}
                            loading={isLoading}
                        >
                            {step < 4 ? 'Next' : 'Done'}
                        </AppButton>
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
