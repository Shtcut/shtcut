'use client';

import { WorkSpaceMain, WorkSpaceSideBar } from '@shtcut/components/ui/work-space';
import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

const WorkSpaceContainer = () => {
    const [step, setStep] = useState(1);
    const [solutionValues, setSolutionValues] = useState<string[]>([]);
    const [toolsValues, setToolsValues] = useState<string[]>([]);
    const [userValue, setUserValue] = useState<'team' | 'myself'>('team');
    const handleSelect = (value: string) => {
        setSolutionValues((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]));
    };
     const handleSelectTools = (value: string) => {
         setToolsValues((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]));
     };

    const handleNext = () => {
        if (step < 4) {
            setStep(step + 1);
        }
    };

    const handlePrevious = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };
    const handleOptionChange = (value: 'team' | 'myself') => {
        setUserValue(value);
    };

    const handleFormSubmit = (values: any) => {
        /**
         * todo Your form submit logic
         */
    };

    const form = useForm({
        defaultValues: {
            name: '',
            users: ''
        }
    });

    return (
        <div className="max-w-screen-xl mx-auto px-4">
            <section className="flex py-4 h-screen">
                <WorkSpaceSideBar step={step} />
                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(handleFormSubmit)} className="w-full">
                        <WorkSpaceMain
                            step={step}
                            userValue={userValue}
                            handleOptionChange={handleOptionChange}
                            form={form}
                            handleNext={handleNext}
                            handlePrevious={handlePrevious}
                            solutionValues={solutionValues}
                            handleSelect={handleSelect}
                            handleSelectTools={handleSelectTools}
                            toolsValues={toolsValues}
                        />
                    </form>
                </FormProvider>
            </section>
        </div>
    );
};

export default WorkSpaceContainer;
