'use client';

import { Dict, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, cn } from '@shtcut-ui/react';
import { NavLink } from '@shtcut/components';
import { forgotPasswordValidationSchema } from './validation';
import { AppButton } from '@shtcut/components/_shared';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { HTMLAttributes } from 'react';
import z from 'zod';

interface ForgotPasswordFormProps extends HTMLAttributes<HTMLDivElement> {
    isLoading: boolean;
    handleForgotPasswordSubmit: (payload: Dict) => void;
    error?: string;
}

export const ForgotPasswordForm = (props: ForgotPasswordFormProps) => {
    const { isLoading, handleForgotPasswordSubmit, error, className } = props;

    const form = useForm<z.infer<typeof forgotPasswordValidationSchema>>({
        resolver: zodResolver(forgotPasswordValidationSchema),
        defaultValues: {
            email: ''
        }
    });

    const handleFormSubmit = (values: z.infer<typeof forgotPasswordValidationSchema>) => {
        handleForgotPasswordSubmit(values);
    };

    return (
        <div className={cn('grid gap-6', className)} {...props}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleFormSubmit)}>
                    <div className="grid gap-2">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="name@example.com" className="h-12" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <AppButton className="mt-2 h-12 px-4 py-2 text-white font-medium bg-blue-600 hover:bg-blue-500 active:bg-blue-600 rounded-lg duration-150" loading={isLoading}>
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
