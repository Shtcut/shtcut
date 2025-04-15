'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { get } from 'lodash';
import { Dict, toast } from '@shtcut-ui/react';
import { useWorkspace } from '@shtcut/hooks';

export const useCreateWorkspace = () => {
    const [showModal, setShowModal] = useState(false);
    const [moduleValues, setModuleValues] = useState<string[]>([]);
    const [workspaceType, setWorkspaceType] = useState<'team' | 'personal'>('team');

    const form = useForm<{
        name: string;
        type: string;
        capacity: string;
        [key: string]: any;
    }>({
        defaultValues: {
            name: '',
            type: '',
            capacity: ''
        }
    });

    const { createWorkspace, createWorkspaceResponse } = useWorkspace({});
    const { isSuccess, isLoading, isError, error, data } = createWorkspaceResponse;
    const { watch } = form;

    const handleOnSelectModule = (value: string) => {
        setModuleValues((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]));
    };

    const onSubmit = async () => {
        const name = watch('name');
        const capacity = watch('capacity');
        const isValid = await form.trigger();
        if (!isValid) {
            return;
        }
        if (workspaceType === 'personal') {
            if (!name) {
                toast({
                    title: 'Validation Error',
                    variant: 'destructive',
                    description: 'Personal Workspace name is required'
                });
                return;
            }
        } else if (workspaceType === 'team') {
            if (!name) {
                toast({
                    title: 'Validation Error',
                    variant: 'destructive',
                    description: 'Team Workspace name is required'
                });
                return;
            } else if (!capacity) {
                toast({
                    title: 'Validation Error',
                    variant: 'destructive',
                    description: 'Number of users is required'
                });
                return;
            }
        }

        if (moduleValues.length === 0) {
            toast({
                title: 'Validation Error',
                variant: 'destructive',
                description: 'At least one module must be selected'
            });
            return;
        }
        if (workspaceType === 'personal' && name && moduleValues.length > 0) {
            handleFormSubmit({ name, capacity, workspaceType, moduleValues });
        } else if (workspaceType === 'team' && name && capacity && moduleValues.length > 0) {
            handleFormSubmit({ name, capacity, workspaceType, moduleValues });
        }
    };

    const handleFormSubmit = (values: Dict) => {
        const emailFields = Object.keys(values).filter((key) => key.startsWith('email'));
        const emailArray = emailFields.map((key) => values[key]).filter(Boolean);

        const personalPayload = {
            name: get(values, ['name']),
            type: workspaceType,
            modules: moduleValues,
            redirectUrl: process.env.NEXT_PUBLIC_REDIRECT_URL || ''
        };
        const teamPayload = {
            name: get(values, ['name']),
            capacity: get(values, ['capacity']),
            type: workspaceType,
            ...(emailArray.length > 0 && { memberEmails: emailArray }),
            modules: moduleValues,
            redirectUrl: process.env.NEXT_PUBLIC_REDIRECT_URL
        };
        const allPayload = workspaceType === 'team' ? teamPayload : personalPayload;
        createWorkspace({
            payload: allPayload,
            options: {
                successMessage: 'Workspace is successfully created'
            }
        });
    };

    const handleModalClose = () => {
        form.reset();
        setModuleValues([]);
        setWorkspaceType('team');
        setShowModal(false);
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        form.reset();
        setModuleValues([]);
        setWorkspaceType('team');
        setShowModal(false);
    };
    useEffect(() => {
        if (isSuccess) {
            handleModalClose();
        }
    }, [isSuccess]);

    return {
        showModal,
        openModal,
        closeModal,
        form,
        moduleValues,
        workspaceType,
        setWorkspaceType,
        handleOnSelectModule,
        onSubmit,
        isLoading,
        isSuccess,
        isError,
        error,
        data,
        setShowModal,
        handleModalClose
    };
};
