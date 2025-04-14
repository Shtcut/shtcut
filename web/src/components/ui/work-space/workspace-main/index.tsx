import React from 'react';
import { useMediaQuery } from 'react-responsive';
import HeadersTitle from './headers';
import { HowTopPlan, ModuleUi } from './steps-ui';
import InviteForm from './invite-form';
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
    isLoading
}: PropsCreate) => {
    const isTab = useMediaQuery({ query: '(max-width: 1247px)' });
    return (
        <div
            className={`bg-white flex justify-center items-center h-full ${isTab ? 'w-full' : ' w-[700px] '}  mx-auto`}
        >
            <div className="flex flex-col  lg:pl-4 items-center w-full gap-y-2">
                <HeadersTitle step={step} userValue={userValue} />
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
                    {userValue === 'team' && (
                        <>
                            {' '}
                            {step === 2 && (
                                <ModuleUi
                                    handleSelect={handleSelect}
                                    modules={modules}
                                    userValue={userValue}
                                    uiUpdate={false}
                                />
                            )}
                            {step === 3 && <InviteForm form={form} />}
                        </>
                    )}
                    {userValue === 'personal' && (
                        <>
                            {' '}
                            {step === 2 && (
                                <ModuleUi
                                    handleSelect={handleSelect}
                                    modules={modules}
                                    userValue={userValue}
                                    uiUpdate={false}
                                />
                            )}
                        </>
                    )}
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
                            type="button"
                            className="bg-primary-0 w-full"
                            onClick={handleNext}
                            loading={isLoading}
                        >
                            {(userValue === 'team' && step < 3) || (userValue !== 'team' && step < 2) ? 'Next' : 'Done'}
                        </AppButton>
                    </div>
                    {userValue === 'team' ? (
                        <>
                            {' '}
                            <div className="flex justify-center mt-20 items-center gap-x-2">
                                {[1, 2, 3].map((page) => (
                                    <div
                                        key={page}
                                        className={`w-20 h-[6px] rounded-full transition duration-500 ease-in-out ${
                                            step >= page ? 'bg-primary-0' : 'bg-[#DCE5FB]'
                                        }`}
                                    />
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="flex justify-center mt-20 items-center gap-x-2">
                            {[1, 2].map((page) => (
                                <div
                                    key={page}
                                    className={`w-20 h-[6px] rounded-full transition duration-500 ease-in-out ${
                                        step >= page ? 'bg-primary-0' : 'bg-[#DCE5FB]'
                                    }`}
                                />
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default WorkSpaceMain;
