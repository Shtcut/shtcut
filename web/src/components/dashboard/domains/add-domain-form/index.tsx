'use client';

import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
    Input,
    Label,
    RadioGroup,
    RadioGroupItem,
    Separator
} from '@shtcut-ui/react';
import React, { useState } from 'react';

const AddDomainsForm = ({ form }: any) => {
    const [radioValue, setRadioValue] = useState('spare');
    const handleRadioChange = (value: string) => {
        setRadioValue(value);
    };
    return (
        <div>
            {radioValue === 'subdomain' ? (
                <div className="mt-6 flex flex-col gap-y-2">
                    <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Domain name
                    </p>
                    <div className="flex items-center rounded-md border h-12">
                        <FormField
                            control={form.control}
                            name="subdomain"
                            render={({ field }) => (
                                <FormItem className=" border-none  w-2/5">
                                    <FormControl>
                                        <Input
                                            placeholder="Subdomain"
                                            className="h-12 focus-visible:ring-0  border-none shadow-none w-full"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Separator orientation="vertical" />
                        <FormField
                            control={form.control}
                            name="domainName"
                            render={({ field }) => (
                                <FormItem className=" border-none   w-full">
                                    <FormControl>
                                        <Input
                                            placeholder="Enter domain "
                                            className="h-12 border-none focus-visible:ring-0  shadow-none  w-full"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
            ) : (
                <FormField
                    control={form.control}
                    name="domainName"
                    render={({ field }) => (
                        <FormItem className="space-y-1  mb-2 w-full">
                            <Label className="">Domain name</Label>
                            <FormControl>
                                <Input placeholder="Enter domain  " className="h-12 w-full" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            )}

            <div className="mt-6">
                <RadioGroup defaultValue="spare" className="flex flex-col gap-y-4" onValueChange={handleRadioChange}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="spare" />
                        <Label htmlFor="r2" className="text-[#5A5555]">
                            This is a spare domain
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="subdomain" id="r3" />
                        <Label htmlFor="r3" className="text-[#5A5555]">
                            This is a domain I already use for website{' '}
                        </Label>
                    </div>
                </RadioGroup>
            </div>
        </div>
    );
};

export default AddDomainsForm;
