'use client';

import {
    Button,
    Calendar,
    Card,
    CardContent,
    CommonProps,
    Dict,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
    Input,
    Label,
    Modal,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    cn,
    toast
} from '@shtcut-ui/react';
import { CalendarIcon, LinkIcon } from 'lucide-react';
import { ChangeEvent, useEffect, useState } from 'react';
import { LinkSettingsForm } from '../link-settings-form';
import { LinkType } from '@shtcut/types';
import { LinkPreview } from '@shtcut/components/_shared/LinkPreview';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { ALPHA_NUMERIC, GOOGLE_FAVICON_URL, PREVIEW_SOCIAL } from '@shtcut/_shared/constant';
import { getApexDomain, isValidURL } from '@shtcut/_shared';
import { customAlphabet } from 'nanoid';
import { LinkQrCodeForm } from '../link-qrcode-form';
import { LinkUtmForm } from '../link-utm-form';
import { LinkCheckBox } from '@shtcut/components/_shared/LinkCheckBox';
import { AnimatePresence, motion } from 'framer-motion';
import { isEmpty, isString, isUndefined } from 'lodash';
import { format } from 'date-fns';
import { AppButton } from '@shtcut/components';
import { useLink } from '@shtcut/hooks/link';
import { title } from 'process';
interface LinkFormProps extends CommonProps {
    id?: string;
    linkProps: LinkType;
    isLoading: boolean;
    handleSubmitForm: (payload: Dict) => void;
    initialValues?: Dict;
}

const linkFormValidationSchema = z.object({
    target: z.string().min(1, 'Destination URL name is required').url('Destination URL must be a valid URL'),
    domain: z.string().min(1, 'Domain name is required'),
    alias: z.string(),
    title: z.string(),
    tag: z.string()
});

export const LinkForm = (props: LinkFormProps) => {
    const {
        id,
        initialValues,
        linkProps: {
            isPasswordProtection = true,
            isIOSTargeting = true,
            isAndroidTargeting = true,
            isExpirationDate = true,
            isUTMBuilder = true,
            isGeoTargeting = false,
            qrCode
        },
        handleSubmitForm
    } = props;
    const [date, setDate] = useState<Date>();
    const [enableExpirationDate, setEnableExpirationDate] = useState<boolean>(isExpirationDate);
    const [enablePasswordProtection, setEnablePasswordProtection] = useState<boolean>(isPasswordProtection);
    const [enableIOSTargeting, setEnableIOSTargeting] = useState<boolean>(isIOSTargeting);
    const [enableAndroidTargeting, setAndroidTargeting] = useState<boolean>(isAndroidTargeting);
    const [enableGeoTargeting, setEnableGeoTargeting] = useState<boolean>(isGeoTargeting);
    const [isQrCode, setIsQrCode] = useState<boolean>(false);
    const [isUtmBuilderEnabled, setIsUtmBuilderEnabled] = useState<boolean>(false);
    const [utmBuilderPayload, setUtmBuilderPayload] = useState<Dict>({});
    const [qrCodePayload, setQrCodeBuilderPayload] = useState<Dict>({});
    const [defaultValues, setDefaultValues] = useState<Dict>({
        target: '',
        alias: '',
        tag: '',
        title: '',
        ...initialValues,
        domain: !isUndefined(initialValues?.domain)
            ? isString(initialValues.domain)
                ? initialValues.domain
                : initialValues.domain._id
            : ''
    });

    const enableQrCode = qrCode ? qrCode.enableQrCode : true;

    const [value, setValue] = useState({
        android: '',
        ios: '',
        password: ''
    });

    const form = useForm<z.infer<typeof linkFormValidationSchema>>({
        resolver: zodResolver(linkFormValidationSchema),
        defaultValues
    });

    const linkSettingsFormPayload = {
        qrCode: qrCodePayload,
        utmParams: utmBuilderPayload,
        password: value.password,
        expiryDate: date,
        devices: {
            android: value.android,
            ios: value.ios
        }
    };

    const apexDomain = getApexDomain(form.getValues('target'));

    const handleFormSubmit = (values: z.infer<typeof linkFormValidationSchema>) => {
        const payload = {
            ...values,
            ...linkSettingsFormPayload
        };
        if (!isValidURL(payload.target)) {
            toast({
                description: 'The target url is invalid',
                variant: 'destructive'
            });
            return;
        }
        handleSubmitForm(payload);
    };

    const handleQRCodeVisibility = (open: boolean) => {
        setIsQrCode(open);
    };

    const handleOnUtmSubmit = (payload: Dict) => {
        if (payload) {
            setIsUtmBuilderEnabled(false);
            setUtmBuilderPayload(payload);
        }
    };

    const handleOnQrCodeSubmit = (payload: Dict) => {
        if (payload) {
            setIsQrCode(false);
            setQrCodeBuilderPayload(payload);
        }
    };

    const handleOnValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValue((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    useEffect(() => {
        if (initialValues) {
            setUtmBuilderPayload((prev) => ({
                ...prev,
                ...initialValues?.utmParams
            }));
            setDefaultValues((prev) => ({
                ...prev,
                ...initialValues,
                domain: !isUndefined(initialValues?.domain)
                    ? isString(initialValues.domain)
                        ? initialValues.domain
                        : initialValues.domain._id
                    : ''
            }));
            setDate(initialValues.expiryDate);
            setQrCodeBuilderPayload((prev) => ({
                ...prev,
                ...initialValues?.qrCode?.properties
            }));
            setValue((prev) => ({
                ...prev,
                password: initialValues?.password,
                ...initialValues?.devices
            }));
        }
    }, [initialValues]);

    return (
        <>
            <div className="overflow-y-auto">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleFormSubmit)}>
                        <div className="flex flex-col lg:flex-row mt-5 gap-8 p-8  rounded-md ">
                            <div className="overflow-y-auto flex flex-col space-y-6 border bg-white rounded-md p-10 overflow-scroll w-full lg:w-1/2">
                                <div className="flex items-center space-x-2">
                                    {form.getValues('target') && isValidURL(form.getValues('target')) ? (
                                        <Image
                                            src={`${GOOGLE_FAVICON_URL}${apexDomain}`}
                                            alt={apexDomain}
                                            className="h-8 w-8 blur-0 border  rounded-full sm:h-10 sm:w-10"
                                            unoptimized
                                            width={20}
                                            height={20}
                                            priority
                                        />
                                    ) : (
                                        <Image
                                            src="/world-link.png"
                                            alt={apexDomain}
                                            className="h-8 w-8 blur-0 border  rounded-full sm:h-10 sm:w-10"
                                            unoptimized
                                            width={20}
                                            height={20}
                                            priority
                                        />
                                    )}
                                    <h2 className="text-xl font-semibold">{id ? 'Edit' : 'Create a new'} link</h2>
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
                                                        type="url"
                                                        autoComplete="off"
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
                                                        disabled={Boolean(id && initialValues)}
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
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="alias"
                                            render={({ field: { ...rest } }) => (
                                                <FormItem>
                                                    <Label className="block text-sm font-medium mb-1" htmlFor="title">
                                                        Unique back-half (optional)
                                                    </Label>
                                                    <FormControl>
                                                        <Input
                                                            id="target"
                                                            placeholder="Example: marketing"
                                                            autoComplete="off"
                                                            {...rest}
                                                            disabled={Boolean(id && initialValues)}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name="tag"
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
                                                            { id: '66059257bcb47c8944881922', name: 'Marketing' },
                                                            { id: '66059257bcb47c8944881924', name: 'Sales' }
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
                                    {/* Link settings here */}
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
                                        <div className="space-y-4 overflow-scroll">
                                            <div className="space-y-4">
                                                <Card>
                                                    <CardContent className="space-y-2 mt-5">
                                                        <form className="overflow-y-auto">
                                                            <div className="">
                                                                <LinkCheckBox
                                                                    isChecked={enableExpirationDate}
                                                                    setIsChecked={setEnableExpirationDate}
                                                                    id={'expiration-date-checkbox'}
                                                                    name={'expiration-date-checkbox'}
                                                                    label={'Expiration Date'}
                                                                    disabled={!isExpirationDate}
                                                                    description={
                                                                        <span>
                                                                            Establish an expiration date for your links,
                                                                            after which they will no longer be
                                                                            accessible.{' '}
                                                                            <a
                                                                                className="underline"
                                                                                href="#"
                                                                                target="_blank"
                                                                            >
                                                                                Learn more{' '}
                                                                            </a>
                                                                        </span>
                                                                    }
                                                                />
                                                                <motion.div
                                                                    initial={enableExpirationDate}
                                                                    animate={enableExpirationDate ? 'open' : 'closed'}
                                                                    variants={{
                                                                        open: { height: 'auto', opacity: 1 },
                                                                        closed: { height: 0, opacity: 0 }
                                                                    }}
                                                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                                                    style={{ overflow: 'hidden' }}
                                                                >
                                                                    <AnimatePresence initial={enableExpirationDate}>
                                                                        {
                                                                            <Popover>
                                                                                <PopoverTrigger asChild>
                                                                                    <Button
                                                                                        variant={'outline'}
                                                                                        className={cn(
                                                                                            'flex justify-start ml-7 mt-2 w-full max-w-[20rem] p-5 rounded-md border-0 py-1.5 text-sm shadow-inner ring-1 ring-inset ring-shade-line placeholder:text-shade-disabled focus:ring-inset focus:ring-stratos-default ',
                                                                                            !isExpirationDate
                                                                                                ? 'cursor-not-allowed bg-shade-line/20'
                                                                                                : ''
                                                                                        )}
                                                                                    >
                                                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                                                        {date ? (
                                                                                            format(date, 'PPP')
                                                                                        ) : (
                                                                                            <span>Pick a date</span>
                                                                                        )}
                                                                                    </Button>
                                                                                </PopoverTrigger>
                                                                                <PopoverContent
                                                                                    className="w-auto p-0"
                                                                                    align="start"
                                                                                >
                                                                                    <Calendar
                                                                                        mode="single"
                                                                                        selected={
                                                                                            initialValues?.expiryDate ??
                                                                                            date
                                                                                        }
                                                                                        onSelect={setDate}
                                                                                        initialFocus
                                                                                        disabled={(date) =>
                                                                                            new Date() > date
                                                                                        }
                                                                                    />
                                                                                </PopoverContent>
                                                                            </Popover>
                                                                        }
                                                                    </AnimatePresence>
                                                                </motion.div>
                                                            </div>
                                                            <div className="flex flex-col space-y-4 mt-5">
                                                                <LinkCheckBox
                                                                    isChecked={
                                                                        isUtmBuilderEnabled ||
                                                                        !isEmpty(linkSettingsFormPayload.utmParams)
                                                                    }
                                                                    setIsChecked={() =>
                                                                        setIsUtmBuilderEnabled(!isUtmBuilderEnabled)
                                                                    }
                                                                    id="UTMbuilder-checkbox"
                                                                    name="UTMbuilder-checkbox"
                                                                    label={'UTM Builder'}
                                                                    disabled={!isUTMBuilder}
                                                                    description={
                                                                        <span>
                                                                            Include UTM parameters in your abbreviated
                                                                            links to track conversions effectively.{' '}
                                                                            <a
                                                                                className="underline"
                                                                                href="#"
                                                                                target="_blank"
                                                                            >
                                                                                Learn more{' '}
                                                                            </a>
                                                                        </span>
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="flex flex-col space-y-4 mt-5">
                                                                <LinkCheckBox
                                                                    isChecked={enablePasswordProtection}
                                                                    setIsChecked={setEnablePasswordProtection}
                                                                    id="password-protected-checkbox"
                                                                    name="password-protected-checkbox"
                                                                    label={'Password Protection'}
                                                                    disabled={!isPasswordProtection}
                                                                    description={
                                                                        'Secure your shortened links by encrypting them with a password to restrict access.'
                                                                    }
                                                                />
                                                                <motion.div
                                                                    initial={enablePasswordProtection}
                                                                    animate={
                                                                        enablePasswordProtection ? 'open' : 'closed'
                                                                    }
                                                                    variants={{
                                                                        open: { height: 'auto', opacity: 1 },
                                                                        closed: { height: 0, opacity: 0 }
                                                                    }}
                                                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                                                    style={{ overflow: 'hidden' }}
                                                                >
                                                                    <AnimatePresence initial={enablePasswordProtection}>
                                                                        <Input
                                                                            type="text"
                                                                            name="password"
                                                                            id="password"
                                                                            value={value.password}
                                                                            onChange={handleOnValueChange}
                                                                            className={cn(
                                                                                'ml-7 w-full max-w-[20rem] p-5 rounded-md border-0 py-1.5 text-sm shadow-inner ring-1 ring-inset ring-shade-line placeholder:text-shade-disabled focus:ring-inset focus:ring-stratos-default ',
                                                                                !isPasswordProtection
                                                                                    ? 'cursor-not-allowed bg-shade-line/20'
                                                                                    : ''
                                                                            )}
                                                                            placeholder="Enter password"
                                                                            maxLength={32}
                                                                            disabled={!isPasswordProtection}
                                                                        />
                                                                    </AnimatePresence>
                                                                </motion.div>
                                                            </div>
                                                            <div className="flex flex-col space-y-4 mt-2">
                                                                <LinkCheckBox
                                                                    isChecked={
                                                                        isQrCode ||
                                                                        !isEmpty(linkSettingsFormPayload.qrCode)
                                                                    }
                                                                    setIsChecked={() => setIsQrCode(!isQrCode)}
                                                                    id={'password-required-checkbox'}
                                                                    name={'password-required-checkbox'}
                                                                    label={'Qr Code'}
                                                                    disabled={!enableQrCode}
                                                                    description={
                                                                        'Utilize QR codes to promote your shortened URL on printed documents and marketing materials for easy access and engagement.'
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="flex flex-col space-y-4 mt-5">
                                                                <LinkCheckBox
                                                                    isChecked={enableIOSTargeting}
                                                                    setIsChecked={setEnableIOSTargeting}
                                                                    id={'ios-targeting-checkbox'}
                                                                    name={'ios-targeting-checkbox'}
                                                                    label={'IOS Targeting'}
                                                                    disabled={!isIOSTargeting}
                                                                    description={
                                                                        'Direct your iOS users to an alternate link for optimal user experience.'
                                                                    }
                                                                />
                                                                <motion.div
                                                                    initial={enableIOSTargeting}
                                                                    animate={enableIOSTargeting ? 'open' : 'closed'}
                                                                    variants={{
                                                                        open: { height: 'auto', opacity: 1 },
                                                                        closed: { height: 0, opacity: 0 }
                                                                    }}
                                                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                                                    style={{ overflow: 'hidden' }}
                                                                >
                                                                    <AnimatePresence initial={enableIOSTargeting}>
                                                                        <Input
                                                                            type="url"
                                                                            name="ios"
                                                                            id="ios"
                                                                            value={value.ios}
                                                                            onChange={handleOnValueChange}
                                                                            className={cn(
                                                                                'ml-7 w-full max-w-[20rem] p-5 rounded-md border-0 py-1.5 text-sm shadow-inner ring-1 ring-inset ring-shade-line placeholder:text-shade-disabled focus:ring-inset focus:ring-stratos-default ',
                                                                                !isIOSTargeting
                                                                                    ? 'cursor-not-allowed bg-shade-line/20'
                                                                                    : ''
                                                                            )}
                                                                            placeholder="URL For IOS Device"
                                                                            disabled={!isIOSTargeting}
                                                                        />
                                                                    </AnimatePresence>
                                                                </motion.div>
                                                            </div>
                                                            <div className="flex flex-col space-y-4 mt-5">
                                                                <LinkCheckBox
                                                                    isChecked={enableAndroidTargeting}
                                                                    setIsChecked={setAndroidTargeting}
                                                                    id={'android-required-checkbox'}
                                                                    name={'android-required-checkbox'}
                                                                    label={'Android Targeting'}
                                                                    disabled={!isAndroidTargeting}
                                                                    description={
                                                                        'Send Android users to a separate link for a tailored browsing experience.'
                                                                    }
                                                                />
                                                                <motion.div
                                                                    initial={enableAndroidTargeting}
                                                                    animate={enableAndroidTargeting ? 'open' : 'closed'}
                                                                    variants={{
                                                                        open: { height: 'auto', opacity: 1 },
                                                                        closed: { height: 0, opacity: 0 }
                                                                    }}
                                                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                                                    style={{ overflow: 'hidden' }}
                                                                >
                                                                    <AnimatePresence initial={enableAndroidTargeting}>
                                                                        <Input
                                                                            type="url"
                                                                            name="android"
                                                                            id="android"
                                                                            onChange={handleOnValueChange}
                                                                            value={value.android}
                                                                            className={cn(
                                                                                'ml-7 w-full max-w-[20rem] p-5 rounded-md border-0 py-1.5 text-sm shadow-inner ring-1 ring-inset ring-shade-line placeholder:text-shade-disabled focus:ring-inset focus:ring-stratos-default ',
                                                                                !isAndroidTargeting
                                                                                    ? 'cursor-not-allowed bg-shade-line/20'
                                                                                    : ''
                                                                            )}
                                                                            placeholder="URL For Android Device"
                                                                            disabled={!isAndroidTargeting}
                                                                        />
                                                                    </AnimatePresence>
                                                                </motion.div>
                                                            </div>
                                                            <div className="flex flex-col space-y-4 mt-5">
                                                                <LinkCheckBox
                                                                    isChecked={enableGeoTargeting}
                                                                    setIsChecked={setEnableGeoTargeting}
                                                                    id={'password-required-checkbox'}
                                                                    name={'password-required-checkbox'}
                                                                    label={'Geo Targeting'}
                                                                    disabled={!isGeoTargeting}
                                                                    description={
                                                                        'Direct users to distinct links depending on their geographic location for targeted content delivery.'
                                                                    }
                                                                />
                                                                <motion.div
                                                                    initial={enableGeoTargeting}
                                                                    animate={enableGeoTargeting ? 'open' : 'closed'}
                                                                    variants={{
                                                                        open: { height: 'auto', opacity: 1 },
                                                                        closed: { height: 0, opacity: 0 }
                                                                    }}
                                                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                                                    style={{ overflow: 'hidden' }}
                                                                >
                                                                    <AnimatePresence
                                                                        initial={enableGeoTargeting}
                                                                    ></AnimatePresence>
                                                                </motion.div>
                                                            </div>
                                                        </form>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <AppButton className="mt-5" loading={props.isLoading} type="submit">
                                    {id ? 'Update' : 'Create'} link
                                </AppButton>
                            </div>
                            <div className="flex flex-col border rounded-md p-6 bg-white space-y-4 w-full lg:w-1/2">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-semibold">Social Previews</h2>
                                </div>

                                <div className="overflow-y-auto flex flex-col space-y-4 ">
                                    {PREVIEW_SOCIAL.map((name, idx) => (
                                        <div key={`${name}-${idx}`} className="border rounded-md p-6">
                                            <Label>{name}</Label>
                                            <LinkPreview
                                                className="border rounded-md p-6 mt-4 bg-gray-600"
                                                url={form.getValues('target')}
                                                width={'500px'}
                                                height={'400px'}
                                                imageHeight={'200px'}
                                                textAlign="left"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </form>
                </Form>
            </div>

            <Modal
                showModel={isQrCode}
                setShowModal={setIsQrCode}
                showCloseIcon={true}
                useDrawer={true}
                onClose={() => handleQRCodeVisibility(false)}
                className="bg-white"
            >
                <LinkQrCodeForm
                    qrPayload={qrCodePayload}
                    url={form.getValues('target')}
                    removeLogo={qrCode?.removeLogo}
                    handleSubmit={handleOnQrCodeSubmit}
                />
            </Modal>
            <Modal
                showModel={isUtmBuilderEnabled}
                setShowModal={setIsUtmBuilderEnabled}
                showCloseIcon={true}
                useDrawer={true}
                onClose={() => setIsUtmBuilderEnabled(false)}
                className="bg-white"
            >
                <LinkUtmForm utmPayload={utmBuilderPayload} handleSubmitForm={handleOnUtmSubmit} />
            </Modal>
        </>
    );
};
