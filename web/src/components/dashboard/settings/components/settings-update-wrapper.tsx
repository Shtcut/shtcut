'use client';

import { Form } from '@shtcut-ui/react';
import { LoadingButton } from '@shtcut/components/_shared/loading-button';
import React from 'react';

interface SettingsModalFormProps {
    form: any;
    onSubmit: (values: any) => void;
    loading: boolean;
    children: React.ReactNode;
    buttonText?: string;
    className?: string;
}

const SettingsModalForm = ({
    form,
    onSubmit,
    loading,
    children,
    buttonText = 'Submit',
    className = ''
}: SettingsModalFormProps) => {
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={`p-4 ${className}`}>
                {children}
                <LoadingButton loading={loading} type="submit" className="mt-6">
                    {buttonText}
                </LoadingButton>
            </form>
        </Form>
    );
};

export default SettingsModalForm;
