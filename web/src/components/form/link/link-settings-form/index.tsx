'use client';

import { Card, CardContent, Dict, Input, Label, Modal, cn } from '@shtcut-ui/react';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LinkQrCodeForm } from '../link-qrcode-form';
import { LinkCheckBox } from '@shtcut/components/_shared/LinkCheckBox';
import { LinkType } from '@shtcut/types';
import { LinkUtmForm } from '../link-utm-form';

interface LinkSettingsFormProps {
    linkProps: LinkType;
    handleOnSubmit: (payload: Dict) => void;
}

export const LinkSettingsForm = (props: LinkSettingsFormProps) => {
    const {
        linkProps: {
            url,
            isPasswordProtection = false,
            isIOSTargeting = false,
            isAndroidTargeting = false,
            isExpirationDate = false,
            isGeoTargeting = false,
            qrCode,
            isUTMBuilder = false
        },
        handleOnSubmit
    } = props;
    const [enableExpirationDate, setEnableExpirationDate] = useState<boolean>(isExpirationDate);
    const [enablePasswordProtection, setEnablePasswordProtection] = useState<boolean>(isPasswordProtection);
    const [enableIOSTargeting, setEnableIOSTargeting] = useState<boolean>(isIOSTargeting);
    const [enableAndroidTargeting, setAndroidTargeting] = useState<boolean>(isAndroidTargeting);
    const [enableGeoTargeting, setEnableGeoTargeting] = useState<boolean>(isGeoTargeting);
    const [isQrCode, setIsQrCode] = useState<boolean>(false);
    const [isUtmBuilderEnabled, setIsUtmBuilderEnabled] = useState<boolean>(false);

    const handleQRCodeVisibility = (open: boolean) => {};

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
                                                <Input
                                                    type="text"
                                                    name="link_password"
                                                    id="link_password"
                                                    className={cn(
                                                        'ml-7 w-full  mt-2 max-w-[20rem] p-5 rounded-md border-0 py-1.5 text-sm shadow-inner ring-1 ring-inset ring-shade-line placeholder:text-shade-disabled focus:ring-inset focus:ring-stratos-default ',
                                                        !isExpirationDate ? 'cursor-not-allowed bg-shade-line/20' : ''
                                                    )}
                                                    placeholder="Enter password"
                                                    maxLength={32}
                                                    disabled={!isExpirationDate}
                                                />
                                            }
                                        </AnimatePresence>
                                    </motion.div>
                                </div>
                                <div className="flex flex-col space-y-4 mt-5">
                                    <LinkCheckBox
                                        isChecked={isUtmBuilderEnabled}
                                        setIsChecked={setIsUtmBuilderEnabled}
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
                                        isChecked={isQrCode}
                                        setIsChecked={setIsQrCode}
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
                                                name="iosTargeting"
                                                id="iosTargeting"
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
                                        id={'password-required-checkbox'}
                                        name={'password-required-checkbox'}
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
                                                name="link_password"
                                                id="link_password"
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
                                        disabled={false}
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
                onClose={() => handleQRCodeVisibility(false)}
                className="bg-white"
            >
                <LinkQrCodeForm />
            </Modal>
            <Modal
                showModel={isUtmBuilderEnabled}
                setShowModal={setIsUtmBuilderEnabled}
                showCloseIcon={true}
                useDrawer={true}
                onClose={() => setIsUtmBuilderEnabled(false)}
                className="bg-white"
            >
                <LinkUtmForm />
            </Modal>
        </>
    );
};
