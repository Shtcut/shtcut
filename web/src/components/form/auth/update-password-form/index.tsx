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
    InputOTPSlot,
    Button
} from '@shtcut-ui/react';
import { AppButton, PasswordInput } from '@shtcut/components/_shared';
import { updatePasswordValidationSchema } from './validation';
import { NavLink } from '@shtcut/components';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Fragment, HTMLAttributes } from 'react';
import z from 'zod';

interface UpdatePasswordFormProps extends HTMLAttributes<HTMLDivElement> {
    isLoading: boolean;
    handleUpdatePasswordSubmit: (payload: Dict) => void;
    error?: Dict;
    onNext: () => void;
    step?: number;
    mobileDesktop?: boolean;
}

export const UpdatePasswordForm = (props: UpdatePasswordFormProps) => {
    const { isLoading, handleUpdatePasswordSubmit, className, onNext, step, mobileDesktop } = props;
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
                                                    <InputOTPGroup className="w-full flex items-center gap-x-3 sm:gap-x-5 lg:gap-x-[30px]">
                                                        {slots.map((slot, index) => (
                                                            <Fragment key={index}>
                                                                <InputOTPSlot
                                                                    className="h-14 w-14  rounded-[10px] md:rounded-[15px] border border-[#D8DADC]"
                                                                    {...slot}
                                                                />
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
                        {step === 1 && (
                            <div className="flex justify-center flex-col items-center">
                                <p className=" mt-10 text-center text-sm text-[#64748B]">
                                    Send Code in <span className="text-[#151314] font-bold">00:10</span>{' '}
                                </p>
                                <Button
                                    variant="unstyled"
                                    className="text-center p-0 m-0 text-primary-0 hover:text-blue-500"
                                >
                                    Resend
                                </Button>
                            </div>
                        )}
                        <AppButton
                            className={`${mobileDesktop || step === 2 ? 'w-full' : 'w-[95%]'} ${step === 2 ? 'mt-6' : ''}`}
                            loading={step === 1 ? undefined : isLoading}
                            onClick={() => {
                                step === 1 ? onNext() : undefined;
                            }}
                        >
                            {step === 1 ? ' Continue' : 'Verify'}
                        </AppButton>
                    </div>
                </form>
            </Form>

            <div className="text-center">
                <p className="text-[#64748B] text-sm ">
                    Back to{' '}
                    <NavLink href="/auth?tab=sign-in" className=" text-primary-0 hover:text-blue-500">
                        Log in
                    </NavLink>
                </p>
            </div>
        </div>
    );
};
