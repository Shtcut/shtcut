'use client';

import {
    Checkbox,
    Dict,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
    Label,
    cn
} from '@shtcut-ui/react';
import { NavLink } from '@shtcut/components';
import { AppAlert, AppButton, PasswordInput } from '@shtcut/components/_shared';
import { get } from 'lodash';
import { HTMLAttributes } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconBrandFacebook, IconBrandGithub, IconBrandGmail, IconBrandTwitter } from '@tabler/icons-react';
import { signUpValidationSchema } from './validation';
import { SocialLogin } from '../social-login';

interface SignUpFormProps extends HTMLAttributes<HTMLDivElement> {
    isLoading: boolean;
    handleSignUpSubmit: (payload: Dict) => void;
    error?: Dict;
}

export const SignUpForm = (props: SignUpFormProps) => {
    const { isLoading, handleSignUpSubmit, error, className } = props;

    const errorMessage = get(error, ['data', 'meta', 'error', 'message'], 'An error occurred, please try again.');

    const handleFormSubmit = (values: z.infer<typeof signUpValidationSchema>) => {
        handleSignUpSubmit(values);
    };

    const form = useForm<z.infer<typeof signUpValidationSchema>>({
        resolver: zodResolver(signUpValidationSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    return (
        <div className={cn('grid gap-6 px-1', className)} {...props}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleFormSubmit)}>
                    <div className="grid gap-2">
                        <div className="grid grid-cols-2 w-full mx-auto gap-x-2">
                            <div>
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormItem className="space-y-1">
                                            <FormLabel>First name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="John" className="h-12" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div>
                                <FormField
                                    control={form.control}
                                    name="lastName"
                                    render={({ field }) => (
                                        <FormItem className="space-y-1">
                                            <FormLabel>Last name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Doe" className="h-12" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
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
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <div className="flex items-center justify-between">
                                        <FormLabel>Password</FormLabel>
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
                            Sign Up
                        </AppButton>
                        <div className="mt-2 mb-2 items-top flex space-x-2">
                            <Checkbox id="terms1" />
                            <div className="grid gap-1.5 leading-none">
                                <Label
                                    htmlFor="terms1"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Accept our{' '}
                                    <NavLink href="#" className="underline underline-offset-4 hover:text-primary ">
                                        terms
                                    </NavLink>{' '}
                                    and{' '}
                                    <NavLink href="#" className="underline underline-offset-4 hover:text-primary ">
                                        conditions
                                    </NavLink>
                                </Label>
                            </div>
                        </div>

                        <div className="relative my-2">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                            </div>
                        </div>
                    </div>
                    <SocialLogin isLoading={isLoading} />
                </form>
            </Form>
            <div className="text-center">
                <div className="font-poppins font-normal-l">
                    Already have an account?
                    <NavLink href="/auth/sign-in" className="px-1 text-blue-600 hover:text-blue-500">
                        Sign In
                    </NavLink>
                </div>
            </div>
        </div>
    );
};
