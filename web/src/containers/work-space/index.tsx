'use client';

import { Dict } from '@shtcut-ui/react';
import WorkSpaceMain from '@shtcut/components/ui/work-space/workspace-main';
import WorkSpaceSideBar from '@shtcut/components/ui/work-space/workspace-sidebar';
import { useAuth, useWorkspace } from '@shtcut/hooks';
import { get } from 'lodash';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { redirect } from 'next/navigation';

const WorkSpaceContainerPage = () => {
    const [step, setStep] = useState(1);
    const [moduleValues, setModuleValues] = useState<string[]>([]);
    const [toolsValues, setToolsValues] = useState<string[]>([]);
    const [workspaceType, setWorkspaceType] = useState<'team' | 'personal'>('personal');

    const { createWorkspace, createWorkspaceResponse } = useWorkspace({});

    const { isSuccess, isLoading, isError, error, data } = createWorkspaceResponse;
    const errorMessage = get(error, ['data', 'meta', 'error', 'message'], 'An error occurred, please try again.');

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

    if (isSuccess) {
        const slug = get(data, ['data', 'slug']);
        redirect(`/url/${slug}/links`);
    }

    if (isError) {
        // todo show error notification message
    }

    const handleFormSubmit = (values: Dict) => {
        const emailFields = Object.keys(values).filter((key) => key.startsWith('email'));
        const emailArray = emailFields.map((key) => values[key]);
        const payload = {
            name: get(values, ['name']),
            capacity: get(values, ['capacity']),
            type: workspaceType,
            memberEmails: emailArray,
            modules: moduleValues,
            redirectUrl: process.env.NEXT_PUBLIC_REDIRECT_URL
        };
        createWorkspace({
            payload,
            options: {
                successMessage: 'Welcome, your workspace is successfully created'
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
                            isLoading={isLoading}
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

export default WorkSpaceContainerPage;
