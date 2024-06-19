'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
    Button,
    Dict,
    Form,
    FormControl,
    FormField,
    FormItem,
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
    handleResendVerification: () => void;
    email: string;
}

export function VerifyEmailPasswordForm(props: VerifyEmailFormProps) {
    const { isLoading, handleVerifyEmailSubmit, handleResendVerification, email } = props;
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
        <div className="">
            <p className="my-4">
                Check your email, a verification was sent to <br className="lg:flex hidden" /> {email || ''} reset your
                password
            </p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleFormSubmit)} className=" w-[360px]">
                    <FormField
                        control={form.control}
                        name="pin"
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
                    <div className="flex justify-center flex-col items-center">
                        <p className=" mt-8 text-center text-sm text-[#64748B]">
                            Send Code in <span className="text-[#151314] font-bold">00:10</span>{' '}
                        </p>
                        <Button
                            variant="link"
                            className="px-1 mb-8 text-center font-poppins font-normal text-blue-600 hover:text-blue-500"
                            onClick={handleResendVerification}
                        >
                            Resend
                        </Button>
                    </div>
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
