'use client';

import { Button, Dict, Form, FormControl, FormField, FormItem, FormMessage, Input, Label, cn } from '@shtcut-ui/react';
import { Logo } from '@shtcut/components';
import { LinkCheckBox } from '@shtcut/components/_shared/LinkCheckBox';
import { IconCopy } from '@tabler/icons-react';
import { QrCodeIcon } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { QRCode } from 'react-qrcode-logo';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

interface LinkUtmFormProps {
    handleSubmitForm: (payload: Dict) => void;
}

const utmFormValidationSchema = z.object({
    source: z.string().min(1, 'Source name is required'),
    medium: z.string().min(1, 'Medium name is required'),
    campaign: z.string().min(1, 'Campaign name is required'),
    term: z.string().min(1, 'Term name is required'),
    content: z.string().min(1, 'Content name is required')
});
export const LinkUtmForm = ({ handleSubmitForm }: LinkUtmFormProps) => {
    const form = useForm<z.infer<typeof utmFormValidationSchema>>({
        resolver: zodResolver(utmFormValidationSchema),
        defaultValues: {
            source: '',
            medium: '',
            campaign: '',
            term: '',
            content: ''
        }
    });

    const handleFormSubmit = (values: z.infer<typeof utmFormValidationSchema>) => {
        handleSubmitForm(values);
    };
    return (
        <div className="flex justify-center p-6">
            <div className="bg-white rounded-lg max-w-sm w-full p-8">
                <h1 className="text-center text-xl font-semibold mb-2">UTM Builder.</h1>
                <p className="text-center text-sm text-gray-500 mb-6">
                    Make use of short URLs for efficient tracking of online marketing campaigns. Improve tracking
                    capabilities by integrating UTM tags to analyze traffic data in Google Analytics.
                </p>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleFormSubmit)}>
                        <div className="flex justify-center mb-4">
                            <div className="mt-2 flex w-full flex-col space-y-4">
                                <div className=" mt-2 flex w-full flex-col space-y-4">
                                    <div className="justify-center">
                                        <FormField
                                            control={form.control}
                                            name="source"
                                            render={({ field }) => (
                                                <FormItem className="space-y-1">
                                                    <Label className="">UTM Source</Label>
                                                    <FormControl>
                                                        <Input
                                                            type="text"
                                                            id="source"
                                                            className={cn(
                                                                'mt-2 w-full max-w-[20rem] p-5 rounded-md border-0 py-1.5 text-sm shadow-inner ring-1 ring-inset ring-shade-line placeholder:text-shade-disabled focus:ring-inset focus:ring-stratos-default '
                                                            )}
                                                            placeholder="E.g. twitter, facebook"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="justify-center">
                                        <FormField
                                            control={form.control}
                                            name="medium"
                                            render={({ field }) => (
                                                <FormItem className="space-y-1">
                                                    <Label>UTM Medium</Label>
                                                    <FormControl>
                                                        <Input
                                                            type="text"
                                                            id="medium"
                                                            className={cn(
                                                                'mt-2 w-full max-w-[20rem] p-5 rounded-md border-0 py-1.5 text-sm shadow-inner ring-1 ring-inset ring-shade-line placeholder:text-shade-disabled focus:ring-inset focus:ring-stratos-default '
                                                            )}
                                                            placeholder="E.g. banner, email"
                                                            maxLength={32}
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="justify-center">
                                        <FormField
                                            control={form.control}
                                            name="campaign"
                                            render={({ field }) => (
                                                <FormItem className="space-y-1">
                                                    <Label>UTM Campaign</Label>
                                                    <FormControl>
                                                        <Input
                                                            type="text"
                                                            className="mt-2 w-full max-w-[20rem] p-5 rounded-md border-0 py-1.5 text-sm shadow-inner ring-1 ring-inset ring-shade-line placeholder:text-shade-disabled focus:ring-inset focus:ring-stratos-default "
                                                            placeholder="E.g. acme_campaign"
                                                            maxLength={32}
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="justify-center">
                                        <FormField
                                            control={form.control}
                                            name="term"
                                            render={({ field }) => (
                                                <FormItem className="space-y-1">
                                                    <Label>UTM Term</Label>
                                                    <FormControl>
                                                        <Input
                                                            type="text"
                                                            id="term"
                                                            className="mt-2 w-full max-w-[20rem] p-5 rounded-md border-0 py-1.5 text-sm shadow-inner ring-1 ring-inset ring-shade-line placeholder:text-shade-disabled focus:ring-inset focus:ring-stratos-default"
                                                            placeholder="Identify the paid keywords"
                                                            maxLength={32}
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="justify-center">
                                        <FormField
                                            control={form.control}
                                            name="content"
                                            render={({ field }) => (
                                                <FormItem className="space-y-1">
                                                    <Label>UTM Content</Label>
                                                    <FormControl>
                                                        <Input
                                                            type="text"
                                                            id="content"
                                                            className="mt-2 w-full max-w-[20rem] p-5 rounded-md border-0 py-1.5 text-sm shadow-inner ring-1 ring-inset ring-shade-line placeholder:text-shade-disabled focus:ring-inset focus:ring-stratos-default "
                                                            placeholder="Use to differentiate ads"
                                                            maxLength={32}
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
                        </div>
                        <div className="flex justify-center mb-6">
                            <Button className="w-full">Save</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
};
