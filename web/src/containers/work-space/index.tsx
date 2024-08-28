'use client';

import { Dict } from '@shtcut-ui/react';
import WorkSpaceMain from '@shtcut/components/ui/work-space/workspace-main';
import WorkSpaceSideBar from '@shtcut/components/ui/work-space/workspace-sidebar';
import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

const WorkSpaceContainer: React.FC = () => {
    const [step, setStep] = useState(1);
    const [moduleValues, setModuleValues] = useState<string[]>([]);
    const [toolsValues, setToolsValues] = useState<string[]>([]);
    const [userValue, setUserValue] = useState<'team' | 'personal'>('team');

    const handleOnSelectModule = (value: string) => {
        setModuleValues((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]));
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

    const handleOptionChange = (value: 'team' | 'personal') => {
        setUserValue(value);
    };

    const handleFormSubmit = (values: Dict) => {
        console.log('values:::', values);
        // todo Your form submit logic
    };

    const form = useForm({
        defaultValues: {
            name: '',
            type: ''
        }
    });

    return (
        <div className="mx-auto px-4">
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
                            modules={moduleValues}
                            handleSelect={handleOnSelectModule}
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
