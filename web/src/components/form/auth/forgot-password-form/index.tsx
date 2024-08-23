'use client';

import { Dict, Form, FormControl, FormField, FormItem, Label, FormMessage, Input } from '@shtcut-ui/react';
import { NavLink } from '@shtcut/components';
import { forgotPasswordValidationSchema } from './validation';
import { AppButton } from '@shtcut/components/_shared';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { HTMLAttributes } from 'react';
import z from 'zod';
import { routes } from '@shtcut/_shared/utils/route';

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
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleFormSubmit)}>
                    <div className="">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <Label>Email address</Label>
                                    <FormControl>
                                        <Input placeholder="Enter your email" className="h-12" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <AppButton className="mt-8 " loading={isLoading}>
                            Reset Password
                        </AppButton>
                    </div>
                </form>
            </Form>
            <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or</span>
                </div>
            </div>
            <div className="text-center">
                <p className="text-[#64748B] text-sm ">
                    Back to
                    <NavLink href={routes.login} className=" text-primary-0 font-medium">
                        {' '}
                        Log in
                    </NavLink>
                </p>
            </div>
        </div>
    );
};
