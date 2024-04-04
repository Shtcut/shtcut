'use client';

import {
    Button,
    CommonProps,
    Dict,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
    Input,
    Label,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@shtcut-ui/react';
import { LinkIcon } from 'lucide-react';
import { useState } from 'react';
import { LinkSettingsForm } from '../link-settings-form';
import { LinkType } from '@shtcut/types';
import { LinkPreview } from '@shtcut/components/_shared/LinkPreview';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

interface LinkFormProps extends CommonProps {
    linkProps: LinkType;
    handleSubmitForm: (payload: Dict) => void;
}

const linkFormValidationSchema = z.object({
    target: z.string().min(1, 'Destination URL name is required'),
    domain: z.string().min(1, 'Domain name is required'),
    alias: z.string(),
    title: z.string(),
    tag: z.string()
});

export const LinkForm = (props: LinkFormProps) => {
    const { linkProps, handleSubmitForm } = props;
    const [linkSettingsFormPayload, setLinkSettingsFormPayload] = useState<Dict>();

    const form = useForm<z.infer<typeof linkFormValidationSchema>>({
        resolver: zodResolver(linkFormValidationSchema),
        defaultValues: {
            target: '',
            domain: '',
            alias: '',
            tag: '',
            title: ''
        }
    });

    const handleLinkSettingSubmit = (payload) => {
        setLinkSettingsFormPayload(payload);
    };

    const handleFormSubmit = (values: z.infer<typeof linkFormValidationSchema>) => {
        const payload = {
            ...values,
            ...linkSettingsFormPayload
        };
        handleSubmitForm(payload);
    };

    return (
        <>
            <div className="overflow-y-auto">
                {/* <div className="text-center">
                    <Logo width={150} className="mx-auto" />
                </div> */}

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleFormSubmit)}>
                        <div className="flex flex-col lg:flex-row mt-5 gap-8 p-8  rounded-md ">
                            <div className="flex flex-col space-y-6 border bg-white rounded-md p-10 overflow-scroll w-full lg:w-1/2">
                                <div className="sticky top-0 flex items-center space-x-2">
                                    <LinkIcon className="h-6 w-6 text-gray-600" />
                                    <h2 className="text-xl font-semibold">Create a new link</h2>
                                </div>
                                <div className="flex flex-col space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="target"
                                        render={({ field }) => (
                                            <FormItem>
                                                <Label className="block text-sm font-medium mb-1" htmlFor="target">
                                                    Paste a destination URL
                                                </Label>
                                                <FormControl>
                                                    <Input
                                                        id="target"
                                                        placeholder="Example: https://long-link.com/shorten-long-URL"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="mb-2">
                                        <FormField
                                            control={form.control}
                                            name="title"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <Label className="block text-sm font-medium mb-1" htmlFor="title">
                                                        Title (optional)
                                                    </Label>
                                                    <FormControl>
                                                        <Input
                                                            id="target"
                                                            placeholder="Example: Acme Link"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <FormField
                                            control={form.control}
                                            name="domain"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <Label className="block text-sm font-medium mb-1" htmlFor="domain">
                                                        Domain
                                                    </Label>
                                                    <Select
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value}
                                                        value={field.value}
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Choose a domain" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {[
                                                                { id: '66059257bcb47c8944881927', name: 'shtcut.in' },
                                                                { id: '66059257bcb47c8944881928', name: 'shtcut.zh' }
                                                            ].map((domain) => (
                                                                <SelectItem key={domain.id} value={domain.id}>
                                                                    {domain.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    {/* <Select
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value}
                                                        value={field.value}
                                                    >
                                                        <SelectTrigger id="short-link">
                                                            <SelectValue placeholder="Choose a domain" />
                                                        </SelectTrigger>
                                                        <SelectContent position="popper" {...field}>
                                                            <SelectItem value="66059257bcb47c8944881927">
                                                                shtcut.in
                                                            </SelectItem>
                                                            <SelectItem value="66059257bcb47c8944881923">
                                                                shtcut.zh
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select> */}
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="title"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <Label className="block text-sm font-medium mb-1" htmlFor="title">
                                                        Unique back-half (optional)
                                                    </Label>
                                                    <FormControl>
                                                        <Input
                                                            id="target"
                                                            placeholder="Example: marketing"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name="domain"
                                        render={({ field }) => (
                                            <FormItem>
                                                <Label className="block text-sm font-medium mb-1" htmlFor="domain">
                                                    Tag
                                                </Label>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                    value={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Choose a tag" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {[
                                                            { id: '66059257bcb47c8944881927', name: 'Marketing' },
                                                            { id: '66059257bcb47c8944881928', name: 'Sales' }
                                                        ].map((tag) => (
                                                            <SelectItem key={tag.id} value={tag.id}>
                                                                {tag.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="relative my-5">
                                        <div className="absolute inset-0 flex items-center">
                                            <span className="w-full border-t" />
                                        </div>
                                        <div className="relative flex justify-center text-xs uppercase">
                                            <span className="bg-background px-2 text-black font-normal">
                                                Link Settings
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <LinkSettingsForm
                                            linkProps={{
                                                url: '',
                                                isExpirationDate: true,
                                                isAndroidTargeting: true,
                                                isPasswordProtection: true,
                                                isIOSTargeting: true,
                                                isGeoTargeting: false,
                                                isUTMBuilder: true,
                                                qrCode: {
                                                    enableQrCode: true,
                                                    removeLogo: false,
                                                    enableBrandLogo: false
                                                }
                                            }}
                                            handleOnSubmit={handleLinkSettingSubmit}
                                        />
                                    </div>
                                </div>
                                <Button>Create link</Button>
                            </div>
                            <div className="flex flex-col border rounded-md p-6 bg-white space-y-4 w-full lg:w-1/2">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-semibold">Social Previews</h2>
                                </div>
                                <div className="flex flex-col space-y-4 ">
                                    <div className="border rounded-md p-6">
                                        <Label>Twitter</Label>
                                        <LinkPreview
                                            className="border rounded-md p-6 mt-4 bg-gray-600"
                                            url="https://github.com/Shtcut/shtcut"
                                            width={'500px'}
                                            height={'400px'}
                                            imageHeight={'200px'}
                                            textAlign="left"
                                        />
                                    </div>
                                    <div className="border rounded-md p-6">
                                        <Label>Facebook</Label>
                                        <LinkPreview
                                            className="border rounded-md p-6 mt-4"
                                            url="https://en.as.com/latest_news/why-is-the-us-currency-called-dollar-what-is-its-origin-and-meaning-n/"
                                            width={'500px'}
                                            height={'400px'}
                                            imageHeight={'200px'}
                                            textAlign="left"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </Form>
            </div>
        </>
    );
};
