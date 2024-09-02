/** @format */
'use client';

import { Button, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Label } from '@shtcut-ui/react';
import ImageSkeleton from '@shtcut/components/image-skeleton';
import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Camera } from 'lucide-react';

const GeneralScreen = () => {
    const [, setPreview] = useState<null | string>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setPreview(previewUrl);
        } else {
            setPreview(null);
        }
    };

    const form = useForm({
        defaultValues: {
            file: ''
        }
    });

    // const handleEmptyImage = () => {
    //     setPreview(null);
    // };

    return (
        <FormProvider {...form}>
            <div>
                <section className="flex gap-4">
                    <div className="w-full">
                        <section className="h-10 flex items-center px-4 border border-[#e3e3e3] bg-[#f7f7f7] rounded-[4px]">
                            <h3 className="font-semibold text-sm">Profile</h3>
                        </section>
                        <section className="flex border border-[##E3E3E3] flex-col gap-3 mt-5 rounded-[4px] p-4">
                            <section>
                                <Label className="text-xs">Full Name</Label>
                                <Input placeholder="Stephen Adebayo" className="mt-2" />
                            </section>
                            <section>
                                <Label className="text-xs">Email</Label>
                                <Input placeholder="Stephen Adebayo" className="mt-2" />
                            </section>
                            <section>
                                <Label className="text-xs">User ID</Label>
                                <Input placeholder="Stephen Adebayo" className="mt-2" />
                            </section>
                        </section>
                        <section className="h-10 mt-4 flex items-center px-4 border border-[#e3e3e3] bg-[#f7f7f7] rounded-[4px]">
                            <h3 className="font-semibold text-sm">Account</h3>
                        </section>
                        <section className="bg-background p-4 border border-[#e3e3e3] mt-4 rounded-[4px]">
                            <h3 className="text-sm">Delete Account</h3>
                            <p className="text-xs text-[#A4A4A4] font-medium mt-2">
                                Permanently delete your Shtcut account, all of your workspaces, links and their
                                respective stats. This action cannot be undone - please proceed with caution.
                            </p>
                            <Button className="mt-6 text-xs h-8 w-36 bg-[#EF1D1D]">Delete</Button>
                        </section>
                    </div>
                    <div className="border p-4 rounded-[4px] border-[#e3e3e3] h-fit w-1/2">
                        <h3 className="font-semibold text-sm">Your Avatar</h3>
                        <section className="flex justify-center mt-6">
                            <section className="relative w-36 h-36">
                                <FormField
                                    control={form.control}
                                    name="file"
                                    render={({ field: { ...fieldProps } }) => (
                                        <FormItem className="flex flex-col items-center  rounded-full  justify-center">
                                            <FormLabel className="cursor-pointer  rounded-lg flex-col justify-center w-36 h-36 ">
                                                <ImageSkeleton />
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...fieldProps}
                                                    placeholder="Picture"
                                                    type="file"
                                                    className="border-none mx-auto hidden"
                                                    accept="image/*, application/pdf"
                                                    onChange={handleFileChange}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <section className="bg-[#E3E3E3] absolute w-9 h-9 flex bottom-2 justify-center left-[100px] items-center rounded-full">
                                    <Camera color="black" size={18} />
                                </section>
                            </section>
                        </section>
                        <p className="text-xs font-medium mt-4 text-[#808080]">
                            Square image recommended. Accepted file types: .png, .jpg. Max file size: 2MB.
                        </p>
                    </div>
                </section>
            </div>
        </FormProvider>
    );
};

export default GeneralScreen;
