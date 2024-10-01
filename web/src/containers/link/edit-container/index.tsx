'use client';
import { Form } from '@shtcut-ui/react';
import EditComponent from '@shtcut/components/dashboard/link/edit-component';
import React from 'react';
import { useForm } from 'react-hook-form';

const EditContainer = () => {
    const form = useForm({
        defaultValues: {
            email: '',
            password: '',
            data_points: null
        }
    });

    return (
        <Form {...form}>
            <form>
                <EditComponent form={form} />
            </form>
        </Form>
    );
};

export default EditContainer;
