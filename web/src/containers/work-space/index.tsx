'use client';

import { Dict, toast } from '@shtcut-ui/react';
import { WorkSpaceMain, WorkSpaceSideBar } from '@shtcut/components/ui/work-space';
import { useWorkspace } from '@shtcut/hooks';
import { get } from 'lodash';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import slugify from 'react-slugify';

const WorkSpaceContainer = () => {
    const [step, setStep] = useState(1);
    const [moduleValues, setModuleValues] = useState<string[]>([]);
    const [toolsValues, setToolsValues] = useState<string[]>([]);
    const [workspaceType, setWorkspaceType] = useState<'team' | 'personal'>('team');
    const { push } = useRouter();

    const { createWorkspace, createWorkspaceResponse } = useWorkspace({});
    const { isSuccess, isLoading, error, data } = createWorkspaceResponse;

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
        setWorkspaceType(value);
    };

    if (isSuccess && data) {
        push(`/url/${get(data, ['data','slug'])}/links`);
    }

    const handleFormSubmit = (values: Dict) => {
        const emailFields = Object.keys(values).filter((key) => key.startsWith('email'));
        const emailArray = emailFields.map((key) => values[key]);

        const payload = {
            ...values,
            type: workspaceType,
            slug: slugify(values.name),
            memberEmails: emailArray,
            module: moduleValues[0],
            redirectUrl: `${process.env.NEXT_PUBLIC_REDIRECT_URL}`,
        };
        
        createWorkspace({
            payload,
            options: {
                successMessage: 'Welcome to shtcut, your workspace was created successfully'
            }
        });
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
                            userValue={workspaceType}
                            handleOptionChange={handleOptionChange}
                            form={form}
                            handleNext={handleNext}
                            handlePrevious={handlePrevious}
                            modules={moduleValues}
                            handleSelect={handleOnSelectModule}
                            handleSelectTools={handleSelectTools}
                            toolsValues={toolsValues}
                            isLoading={isLoading}
                        />
                    </form>
                </FormProvider>
            </section>
        </div>
    );
};

export default WorkSpaceContainer;
