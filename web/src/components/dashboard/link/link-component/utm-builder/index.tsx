'use client';

import { FormControl, FormField, FormItem, FormMessage, Input, Separator } from '@shtcut-ui/react';
import { Switch } from '@shtcut-ui/react';
import React, { useState } from 'react';

const UTMbuilder = (form: any) => {
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const handleSwitchChange = (checked: boolean) => {
        setIsSwitchOn(checked);
    };
    return (
        <div>
            <div className="flex justify-between items-center gap-4">
                <div className="w-full lg:w-5/6">
                    <h2 className="text-sm font-medium">UTM Builder</h2>
                    <p className="text-xs mt-1 text-[#4d4d4d]">
                        Add UTM parameters to your short links for conversion tracking
                    </p>
                </div>
                <Switch checked={isSwitchOn} onCheckedChange={handleSwitchChange} />
            </div>
            {isSwitchOn && (
                <div className="flex flex-col gap-2">
                    <div className="mt-4 flex flex-col gap-y-2">
                        <div className="flex items-center rounded-md border h-10">
                            <FormField
                                control={form.control}
                                name=""
                                render={({ field }) => (
                                    <FormItem className=" border-none  w-2/5">
                                        <FormControl>
                                            <Input
                                                placeholder="ghhghhh"
                                                className="h-10 focus-visible:ring-0  border-none shadow-none w-full bg-[#FDFDFD]"
                                                {...field}
                                                disabled
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
                                                placeholder="ghhghhh"
                                                className="h-10 border-none focus-visible:ring-0  shadow-none  w-full"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div className=" flex flex-col gap-y-2">
                        <div className="flex items-center rounded-md border h-10">
                            <FormField
                                control={form.control}
                                name=""
                                render={({ field }) => (
                                    <FormItem className=" border-none  w-2/5">
                                        <FormControl>
                                            <Input
                                                placeholder="ghhghhh"
                                                className="h-10 focus-visible:ring-0  border-none shadow-none w-full bg-[#FDFDFD]"
                                                {...field}
                                                disabled
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
                                                placeholder="ghhghhh"
                                                className="h-10 border-none focus-visible:ring-0  shadow-none  w-full"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <div className=" flex flex-col gap-y-2">
                        <div className="flex items-center rounded-md border h-10">
                            <FormField
                                control={form.control}
                                name=""
                                render={({ field }) => (
                                    <FormItem className=" border-none  w-2/5">
                                        <FormControl>
                                            <Input
                                                placeholder="ghhghhh"
                                                className="h-10 focus-visible:ring-0  border-none shadow-none w-full bg-[#FDFDFD]"
                                                {...field}
                                                disabled
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
                                                placeholder="ghhghhh"
                                                className="h-10 border-none focus-visible:ring-0  shadow-none  w-full"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div className=" flex flex-col gap-y-2">
                        <div className="flex items-center rounded-md border h-10">
                            <FormField
                                control={form.control}
                                name=""
                                render={({ field }) => (
                                    <FormItem className=" border-none  w-2/5">
                                        <FormControl>
                                            <Input
                                                placeholder="ghhghhh"
                                                className="h-10 focus-visible:ring-0  border-none shadow-none w-full bg-[#FDFDFD]"
                                                {...field}
                                                disabled
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
                                                placeholder="ghhghhh"
                                                className="h-10 border-none focus-visible:ring-0  shadow-none  w-full"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UTMbuilder;
