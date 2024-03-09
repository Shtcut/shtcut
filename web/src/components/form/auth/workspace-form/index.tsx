'use client';

import { Dict, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, cn } from '@shtcut-ui/react';
import { workspaceValidationSchema } from './validation';
import { AppButton } from '@shtcut/components/_shared';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { HTMLAttributes } from 'react';
import z from 'zod';
import { IconHelp } from '@tabler/icons-react';

interface WorkspaceFormProps extends HTMLAttributes<HTMLDivElement> {
    isLoading: boolean;
    handleWorkspaceSubmit: (payload: Dict) => void;
    error?: string;
}

export const WorkspaceForm = (props: WorkspaceFormProps) => {
    const { isLoading, handleWorkspaceSubmit, error, className } = props;

    const form = useForm<z.infer<typeof workspaceValidationSchema>>({
        resolver: zodResolver(workspaceValidationSchema),
        defaultValues: {
            name: '',
            slug: ''
        }
    });

    const handleFormSubmit = (values: z.infer<typeof workspaceValidationSchema>) => {
        handleWorkspaceSubmit(values);
    };

    return (
        <div className={cn('grid gap-6', className)} {...props}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleFormSubmit)}>
                    <div className="grid gap-2">
                        <div className="mt-2">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <FormLabel>Workspace Name</FormLabel>
                                        <FormControl>
                                            <Input className="h-11" placeholder="Facebook Inc" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="mt-5">
                            <FormField
                                control={form.control}
                                name="slug"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <div>
                                                <FormLabel>Workspace Slug</FormLabel>
                                            </div>
                                            <div>
                                                <FormLabel>Workspace Slug</FormLabel>
                                            </div>
                                        </div>

                                        <FormControl>
                                            <div className="flex items-center text-gray-400 border rounded-md">
                                                <div className="px-3 py-2.5 rounded-l-md text-gray-400 bg-gray-50 border-r">
                                                    shtcut.app
                                                </div>
                                                <Input className="h-11" placeholder="facebook-inc" {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <AppButton
                            className="mt-5 h-12 px-4 py-2 text-white font-medium bg-blue-600 hover:bg-blue-500 active:bg-blue-600 rounded-lg duration-150"
                            loading={isLoading}
                        >
                            Create workspace
                        </AppButton>
                    </div>
                </form>
            </Form>
        </div>
    );
};
