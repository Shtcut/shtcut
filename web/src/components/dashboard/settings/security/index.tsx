import { Button, FormControl, FormField, FormItem, FormMessage, Label } from '@shtcut-ui/react';
import { PasswordInput } from '@shtcut/components/_shared';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

const SecurityScreen = () => {
    const form = useForm({
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        }
    });
    return (
        <div>
            <section className="h-10 flex items-center px-4 border border-[#e3e3e3] bg-[#f7f7f7] rounded-[4px]">
                <h3 className="font-semibold text-sm">Change Password</h3>
            </section>
            <div className="bg-background border border-[#e3e3e3] mt-6 rounded">
                <section className="p-4 w-3/4">
                    <FormProvider {...form}>
                        <div className="flex flex-col gap-4">
                            <FormField
                                control={form.control}
                                name="currentPassword"
                                render={({ field }) => (
                                    <FormItem className="space-y-1 w-full">
                                        <div className="flex mb-2 items-center justify-start">
                                            <Label className="text-xs">Current Password</Label>
                                        </div>
                                        <FormControl>
                                            <PasswordInput
                                                className="h-12"
                                                placeholder="Must be 8 characters"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="newPassword"
                                render={({ field }) => (
                                    <FormItem className="space-y-1 w-full">
                                        <div className="flex mb-2 items-center justify-start">
                                            <Label className="text-xs">New Password</Label>
                                        </div>
                                        <FormControl>
                                            <PasswordInput
                                                className="h-12"
                                                placeholder="Must be 8 characters"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem className="space-y-1 w-full">
                                        <div className="flex mb-2 items-center justify-start">
                                            <Label className="text-xs">Confirm Password</Label>
                                        </div>
                                        <FormControl>
                                            <PasswordInput
                                                className="h-12"
                                                placeholder="Must be 8 characters"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button className='text-xs h-8 w-60 bg-primary-0 mt-6'>Change Password</Button>
                        </div>
                    </FormProvider>
                </section>
            </div>
        </div>
    );
};

export default SecurityScreen;
