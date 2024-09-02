'use client';

import {
    Button,
    Card,
    CardContent,
    Dict,
    Input,
    Calendar,
    Modal,
    Popover,
    PopoverContent,
    PopoverTrigger,
    cn
} from '@shtcut-ui/react';
import { ChangeEvent, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LinkQrCodeForm } from '../link-qrcode-form';
import { LinkCheckBox } from '@shtcut/components/_shared/LinkCheckBox';
import { LinkType } from '@shtcut/types';
import { LinkUtmForm } from '../link-utm-form';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { isEmpty } from 'lodash';

interface LinkSettingsFormProps {
    linkProps: LinkType;
    handleOnSubmit: (payload: Dict) => void;
}

export const LinkSettingsForm = (props: LinkSettingsFormProps) => {
    const {
        linkProps: {
            isPasswordProtection = false,
            isIOSTargeting = false,
            isAndroidTargeting = false,
            isExpirationDate = false,
            isGeoTargeting = false,
            qrCode,
            isUTMBuilder = false
        }    } = props;
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

    const [value, setValue] = useState<Dict>({
        android: '',
        ios: '',
        password: ''
    });

    const handleQRCodeVisibility = () => {};

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

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValue((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const payload = {
        qrCode: qrCodePayload,
        utmParams: utmBuilderPayload,
        password: value.password,
        expiryDate: date,
        devices: {
            android: value.android,
            ios: value.ios
        }
    };
    
    return (
        <>
            <div className="space-y-4 overflow-y-auto overflow-scroll">
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
                                                Establish an expiration date for your links, after which they will no
                                                longer be accessible.{' '}
                                                <a className="underline" href="#" target="_blank">
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
                                                            {date ? format(date, 'PPP') : <span>Pick a date</span>}
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={date}
                                                            onSelect={setDate}
                                                            initialFocus
                                                            disabled={(date) => new Date() > date}
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            }
                                        </AnimatePresence>
                                    </motion.div>
                                </div>
                                <div className="flex flex-col space-y-4 mt-5">
                                    <LinkCheckBox
                                        isChecked={isUtmBuilderEnabled || !isEmpty(payload.utmParams)}
                                        setIsChecked={() => setIsUtmBuilderEnabled(!isUtmBuilderEnabled)}
                                        id="UTMbuilder-checkbox"
                                        name="UTMbuilder-checkbox"
                                        label={'UTM Builder'}
                                        disabled={!isUTMBuilder}
                                        description={
                                            <span>
                                                Include UTM parameters in your abbreviated links to track conversions
                                                effectively.{' '}
                                                <a className="underline" href="#" target="_blank">
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
                                        animate={enablePasswordProtection ? 'open' : 'closed'}
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
                                                onChange={handleOnChange}
                                                className={cn(
                                                    'ml-7 w-full max-w-[20rem] p-5 rounded-md border-0 py-1.5 text-sm shadow-inner ring-1 ring-inset ring-shade-line placeholder:text-shade-disabled focus:ring-inset focus:ring-stratos-default ',
                                                    !isPasswordProtection ? 'cursor-not-allowed bg-shade-line/20' : ''
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
                                        isChecked={isQrCode || !isEmpty(payload.qrCode)}
                                        setIsChecked={() => setIsQrCode(!isQrCode)}
                                        id={'password-required-checkbox'}
                                        name={'password-required-checkbox'}
                                        label={'Qr Code'}
                                        disabled={!qrCode?.enableQrCode}
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
                                                type="text"
                                                name="ios"
                                                id="ios"
                                                onChange={handleOnChange}
                                                className={cn(
                                                    'ml-7 w-full max-w-[20rem] p-5 rounded-md border-0 py-1.5 text-sm shadow-inner ring-1 ring-inset ring-shade-line placeholder:text-shade-disabled focus:ring-inset focus:ring-stratos-default ',
                                                    !isIOSTargeting ? 'cursor-not-allowed bg-shade-line/20' : ''
                                                )}
                                                placeholder="URL For IOS Device"
                                                maxLength={32}
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
                                                type="text"
                                                name="android"
                                                id="android"
                                                onChange={handleOnChange}
                                                className={cn(
                                                    'ml-7 w-full max-w-[20rem] p-5 rounded-md border-0 py-1.5 text-sm shadow-inner ring-1 ring-inset ring-shade-line placeholder:text-shade-disabled focus:ring-inset focus:ring-stratos-default ',
                                                    !isAndroidTargeting ? 'cursor-not-allowed bg-shade-line/20' : ''
                                                )}
                                                placeholder="URL For Android Device"
                                                maxLength={32}
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
                                        <AnimatePresence initial={enableGeoTargeting}></AnimatePresence>
                                    </motion.div>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <Modal
                showModel={isQrCode}
                setShowModal={setIsQrCode}
                showCloseIcon={true}
                useDrawer={true}
                onClose={() => handleQRCodeVisibility()}
                className="bg-white"
            >
                <LinkQrCodeForm
                    qrPayload={qrCodePayload}
                    url={''}
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
