import { FormControl, FormField, FormItem, FormMessage, Label } from '@shtcut-ui/react';
import { PasswordInput } from '@shtcut/components/_shared';
import React from 'react';

const ChangePasswordForm = ({ form }: { form: any }) => {
    return (
        <div className="flex flex-col gap-4 ">
            <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                    <FormItem className="space-y-1">
                        <div className="flex items-center mb-2 justify-between">
                            <Label>Current Password</Label>
                        </div>
                        <FormControl>
                            <PasswordInput className="" placeholder="********" {...field} />
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
                        <div className="flex items-center mb-2 justify-between">
                            <Label>Password</Label>
                        </div>
                        <FormControl>
                            <PasswordInput className="" placeholder="********" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
};

export default ChangePasswordForm;
