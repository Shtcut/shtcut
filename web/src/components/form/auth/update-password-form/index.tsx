'use client';

import {
    Dict,
    Form,
    FormControl,
    FormField,
    FormItem,
    Label,
    FormMessage,
    cn,
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot
} from '@shtcut-ui/react';
import { AppButton, PasswordInput } from '@shtcut/components/_shared';
import { updatePasswordValidationSchema } from './validation';
import { NavLink } from '@shtcut/components';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Fragment, HTMLAttributes, useState } from 'react';
import z from 'zod';

interface UpdatePasswordFormProps extends HTMLAttributes<HTMLDivElement> {
    isLoading: boolean;
    handleUpdatePasswordSubmit: (payload: Dict) => void;
    error?: Dict;
    onNext: () => void;
    step?: number;
}

export const UpdatePasswordForm = (props: UpdatePasswordFormProps) => {
    const { isLoading, handleUpdatePasswordSubmit, className, onNext, step } = props;
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
        console.log('values::', values);
    };

    return (
        <div className={cn('grid gap-6', className)} {...props}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleFormSubmit)}>
                    <div className="flex flex-col gap-3">
                        {step === 1 && (
                            <FormField
                                control={form.control}
                                name="resetPasswordCode"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <InputOTP
                                                maxLength={6}
                                                className="w-full mt-6"
                                                render={({ slots }) => (
                                                    <InputOTPGroup className="w-full">
                                                        {slots.map((slot, index) => (
                                                            <Fragment key={index}>
                                                                <InputOTPSlot
                                                                    className="h-10 w-10  rounded-md border"
                                                                    {...slot}
                                                                />
                                                                {index !== slots.length - 1 && <InputOTPSeparator />}
                                                            </Fragment>
                                                        ))}{' '}
                                                    </InputOTPGroup>
                                                )}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
                        {step === 2 && (
                            <Fragment>
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem className="space-y-1">
                                            <div className="flex items-center mb-2 justify-between">
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
                                            <div className="flex items-center mb-2 justify-between">
                                                <Label>Confirm Password</Label>
                                            </div>
                                            <FormControl>
                                                <PasswordInput className="h-12" placeholder="********" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </Fragment>
                        )}
                        <AppButton
                            className="mt-2 h-12 px-4 py-2 text-white font-medium bg-blue-600 hover:bg-blue-500 active:bg-blue-600 rounded-lg duration-150"
                            loading={step === 1 ? undefined : isLoading}
                            onClick={() => {
                                step === 1 ? onNext() : undefined;
                            }}
                        >
                            Continue
                        </AppButton>
                    </div>
                </form>
            </Form>
            <div className="text-center">
                <div className="font-poppins font-normal-l">
                    Back to
                    <NavLink href="/auth" className="px-1 text-blue-600 hover:text-blue-500">
                        Log in
                    </NavLink>
                </div>
            </div>
        </div>
    );
};
