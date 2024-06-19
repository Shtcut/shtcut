'use client';

import {
    Dict,
    Form,
    FormControl,
    FormField,
    FormItem,
    Label,
    FormMessage,
    Input,
    cn,
    Checkbox
} from '@shtcut-ui/react';
import { NavLink } from '@shtcut/components';
import { AppButton, PasswordInput } from '@shtcut/components/_shared';
import { get } from 'lodash';
import { HTMLAttributes } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInValidationSchema } from './validation';
import { SocialLogin } from '../social-login';

interface SignInFormProps extends HTMLAttributes<HTMLDivElement> {
    isLoading: boolean;
    handleLoginSubmit: (payload: Dict) => void;
    onFailure: (type: string, response: Dict) => void;
    onSuccess: (type: string, response: Dict) => void;
    error?: Dict;
}

export const SignInForm = (props: SignInFormProps) => {
    const { isLoading, handleLoginSubmit, error, className, onFailure, onSuccess } = props;

    const handleFormSubmit = (values: z.infer<typeof signInValidationSchema>) => {
        handleLoginSubmit(values);
    };

    const form = useForm<z.infer<typeof signInValidationSchema>>({
        resolver: zodResolver(signInValidationSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    return (
        <div className="w-full mt-8">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleFormSubmit)}>
                    <div className="flex flex-col gap-3 w-full">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="space-y-1  mb-2 w-full">
                                    <Label>Email address</Label>
                                    <FormControl>
                                        <Input placeholder="Enter your email" className="h-12 w-full" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="space-y-1 w-full">
                                    <div className="flex mb-2 items-center justify-start">
                                        <Label>Password</Label>
                                    </div>
                                    <FormControl>
                                        <PasswordInput className="h-12" placeholder="Must be 8 characters" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-x-3">
                                <Checkbox />
                                <p className="text-sm text-[#334155]">Keep me logged in</p>
                            </div>
                            <div className="text-sm  ">
                                <NavLink
                                    href="/auth/forgot-password"
                                    className=" hover:opacity-75 text-primary-0 hover:text-blue-500"
                                >
                                    Forgot password?
                                </NavLink>
                            </div>
                        </div>
                        <AppButton
                            className="mt-10 h-12 px-4 py-2 text-white font-semibold bg-blue-600 hover:bg-blue-500 active:bg-blue-600 rounded-lg duration-150"
                            loading={isLoading}
                        >
                            Sign In
                        </AppButton>

                        <div className="relative mt-3 mb-6">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">Or </span>
                            </div>
                        </div>
                    </div>
                </form>
            </Form>
            <SocialLogin onFailure={onFailure} onSuccess={onSuccess} isLoading={isLoading} />
        </div>
    );
};
