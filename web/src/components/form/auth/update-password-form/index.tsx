'use client';

import { Dict, Form, FormControl, FormField, FormItem, Label, FormMessage, Input, cn } from '@shtcut-ui/react';
import { AppButton, PasswordInput } from '@shtcut/components/_shared';
import { updatePasswordValidationSchema } from './validation';
import { NavLink } from '@shtcut/components';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { HTMLAttributes } from 'react';
import z from 'zod';

interface UpdatePasswordFormProps extends HTMLAttributes<HTMLDivElement> {
    isLoading: boolean;
    handleUpdatePasswordSubmit: (payload: Dict) => void;
    error?: Dict;
}

export const UpdatePasswordForm = (props: UpdatePasswordFormProps) => {
    const { isLoading, handleUpdatePasswordSubmit, className } = props;

    const form = useForm<z.infer<typeof updatePasswordValidationSchema>>({
        resolver: zodResolver(updatePasswordValidationSchema),
        defaultValues: {
            resetPasswordCode: '',
            password: '',
            confirmPassword: ''
        }
    });

    const handleFormSubmit = (values: z.infer<typeof updatePasswordValidationSchema>) => {
        handleUpdatePasswordSubmit(values);
    };

    return (
        <div className={cn('grid gap-6', className)} {...props}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleFormSubmit)}>
                    <div className="grid gap-2">
                        <FormField
                            control={form.control}
                            name="resetPasswordCode"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <Label>Reset Code</Label>
                                    <FormControl>
                                        <Input placeholder="Enter Reset password code" className="h-12" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <div className="flex items-center justify-between">
                                        <Label>Password</Label>
                                    </div>
                                    <FormControl>
                                        <PasswordInput className="h-12" placeholder="********" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <div className="flex items-center justify-between">
                                        <Label>Confirm Password</Label>
                                    </div>
                                    <FormControl>
                                        <PasswordInput className="h-12" placeholder="********" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <AppButton
                            className="mt-2 h-12 px-4 py-2 text-white font-medium bg-blue-600 hover:bg-blue-500 active:bg-blue-600 rounded-lg duration-150"
                            loading={isLoading}
                        >
                            Continue
                        </AppButton>
                    </div>
                </form>
            </Form>
            <div className="text-center">
                <div className="font-poppins font-normal-l">
                    Don`t have account?
                    <NavLink href="/auth/sign-up" className="px-1 text-blue-600 hover:text-blue-500">
                        Sign up
                    </NavLink>
                </div>
            </div>
        </div>
    );
};
