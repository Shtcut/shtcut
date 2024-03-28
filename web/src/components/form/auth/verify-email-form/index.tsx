'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
    Dict,
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    Label,
    FormMessage,
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot
} from '@shtcut-ui/react';
import { AppButton } from '@shtcut/components';
import { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const FormSchema = z.object({
    pin: z.string().min(6, {
        message: 'Your one-time password must be 6 characters.'
    })
});

interface VerifyEmailFormProps {
    handleVerifyEmailSubmit: (payload: Dict) => void;
    isLoading: boolean;
    error?: Dict;
}

export function VerifyEmailPasswordForm(props: VerifyEmailFormProps) {
    const { isLoading, handleVerifyEmailSubmit } = props;
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            pin: ''
        }
    });

    const handleFormSubmit = (data: z.infer<typeof FormSchema>) => {
        handleVerifyEmailSubmit({
            verificationCode: data.pin
        });
    };

    return (
        <div className="grid gap-6">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="pin"
                        render={({ field }) => (
                            <FormItem>
                                <Label>Please enter the code sent to your email.</Label>
                                <FormControl>
                                    <InputOTP
                                        maxLength={6}
                                        className="w-full"
                                        render={({ slots }) => (
                                            <InputOTPGroup>
                                                {slots.map((slot, index) => (
                                                    <Fragment key={index}>
                                                        <InputOTPSlot className="h-14 rounded-md border" {...slot} />
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
                    <AppButton
                        type="submit"
                        loading={isLoading}
                        disabled={isLoading}
                        className="w-full h-12  px-4 py-2 text-white font-medium bg-blue-600 hover:bg-blue-500 active:bg-blue-600 rounded-lg duration-150"
                    >
                        Continue
                    </AppButton>
                </form>
            </Form>
        </div>
    );
}
