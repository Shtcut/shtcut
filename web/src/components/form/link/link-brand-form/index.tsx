'use client';

import { Card, CardContent, Input, Modal, cn } from '@shtcut-ui/react';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LinkQrCodeForm } from '../link-qrcode-form';
import { LinkCheckBox } from '@shtcut/components/_shared/LinkCheckBox';

export const LinkBrandForm = () => {
    const [isEmailRequired, setIsEmailRequired] = useState<boolean>(false);
    const [isVerifyEmail, setIsVerifyEmail] = useState<boolean>(false);
    const [isPasswordRequired, setIsPasswordRequired] = useState<boolean>(false);
    const [isQrCode, setIsQrCode] = useState<boolean>(false);
    const [password, setPassword] = useState<string | null>('');

    return (
        <>
            <div className="space-y-4 overflow-y-auto overflow-scroll">
                <div className="space-y-4">
                    <Card>
                        <CardContent className="space-y-2 mt-5">
                            <form className="overflow-y-auto">
                                <div className="">
                                    <LinkCheckBox
                                        isChecked={isEmailRequired}
                                        setIsChecked={setIsEmailRequired}
                                        id={'required-email-checkbox'}
                                        name={'required-email-checkbox'}
                                        label={'Expiration Date'}
                                        disabled={false}
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
                                        initial={isEmailRequired}
                                        animate={isEmailRequired ? 'open' : 'closed'}
                                        variants={{
                                            open: { height: 'auto', opacity: 1 },
                                            closed: { height: 0, opacity: 0 }
                                        }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        style={{ overflow: 'hidden' }}
                                    >
                                        <AnimatePresence initial={isEmailRequired}>
                                            {
                                                <Input
                                                    type="text"
                                                    name="link_password"
                                                    id="link_password"
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className={cn(
                                                        'ml-7 w-full  mt-2 max-w-[20rem] p-5 rounded-md border-0 py-1.5 text-sm shadow-inner ring-1 ring-inset ring-shade-line placeholder:text-shade-disabled focus:ring-inset focus:ring-stratos-default ',
                                                        !isPasswordRequired ? 'cursor-not-allowed bg-shade-line/20' : ''
                                                    )}
                                                    placeholder="Enter password"
                                                    defaultValue={password ? password : undefined}
                                                    maxLength={32}
                                                    disabled={!isPasswordRequired}
                                                />
                                            }
                                        </AnimatePresence>
                                    </motion.div>
                                </div>
                                <div className="flex flex-col space-y-4 mt-5">
                                    <LinkCheckBox
                                        isChecked={isPasswordRequired}
                                        setIsChecked={setIsPasswordRequired}
                                        id={'password-required-checkbox'}
                                        name={'password-required-checkbox'}
                                        label={'UTM Builder'}
                                        disabled={false}
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
                                    <motion.div
                                        initial={isEmailRequired}
                                        animate={isEmailRequired ? 'open' : 'closed'}
                                        variants={{
                                            open: { height: 'auto', opacity: 1 },
                                            closed: { height: 0, opacity: 0 }
                                        }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        style={{ overflow: 'hidden' }}
                                    >
                                        <AnimatePresence initial={isEmailRequired}>
                                            {
                                                <div className="accordion-content ml-2 mt-2 flex w-full flex-col space-y-4">
                                                    <Input
                                                        type="text"
                                                        name="link_password"
                                                        id="link_password"
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        className={cn(
                                                            'ml-5 w-full max-w-[20rem] p-5 rounded-md border-0 py-1.5 text-sm shadow-inner ring-1 ring-inset ring-shade-line placeholder:text-shade-disabled focus:ring-inset focus:ring-stratos-default ',
                                                            !isPasswordRequired
                                                                ? 'cursor-not-allowed bg-shade-line/20'
                                                                : ''
                                                        )}
                                                        placeholder="Enter password"
                                                        defaultValue={password ? password : undefined}
                                                        maxLength={32}
                                                        disabled={!isPasswordRequired}
                                                    />
                                                    <Input
                                                        type="text"
                                                        name="link_password"
                                                        id="link_password"
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        className={cn(
                                                            'ml-5 w-full max-w-[20rem] p-5 rounded-md border-0 py-1.5 text-sm shadow-inner ring-1 ring-inset ring-shade-line placeholder:text-shade-disabled focus:ring-inset focus:ring-stratos-default ',
                                                            !isPasswordRequired
                                                                ? 'cursor-not-allowed bg-shade-line/20'
                                                                : ''
                                                        )}
                                                        placeholder="Enter password"
                                                        defaultValue={password ? password : undefined}
                                                        maxLength={32}
                                                        disabled={!isPasswordRequired}
                                                    />
                                                </div>
                                            }
                                        </AnimatePresence>
                                    </motion.div>
                                </div>
                                <div className="flex flex-col space-y-4 mt-5">
                                    <LinkCheckBox
                                        isChecked={isPasswordRequired}
                                        setIsChecked={setIsPasswordRequired}
                                        id={'password-required-checkbox'}
                                        name={'password-required-checkbox'}
                                        label={'Password Protection'}
                                        disabled={false}
                                        description={
                                            'Secure your shortened links by encrypting them with a password to restrict access.'
                                        }
                                    />
                                    <motion.div
                                        initial={isPasswordRequired}
                                        animate={isPasswordRequired ? 'open' : 'closed'}
                                        variants={{
                                            open: { height: 'auto', opacity: 1 },
                                            closed: { height: 0, opacity: 0 }
                                        }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        style={{ overflow: 'hidden' }}
                                    >
                                        <AnimatePresence initial={isPasswordRequired}>
                                            <Input
                                                type="text"
                                                name="link_password"
                                                id="link_password"
                                                onChange={(e) => setPassword(e.target.value)}
                                                className={cn(
                                                    'ml-7 w-full max-w-[20rem] p-5 rounded-md border-0 py-1.5 text-sm shadow-inner ring-1 ring-inset ring-shade-line placeholder:text-shade-disabled focus:ring-inset focus:ring-stratos-default ',
                                                    !isPasswordRequired ? 'cursor-not-allowed bg-shade-line/20' : ''
                                                )}
                                                placeholder="Enter password"
                                                defaultValue={password ? password : undefined}
                                                maxLength={32}
                                                disabled={!isPasswordRequired}
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
                                        disabled={false}
                                        description={
                                            'Utilize QR codes to promote your shortened URL on printed documents and marketing materials for easy access and engagement.'
                                        }
                                    />
                                </div>
                                <div className="flex flex-col space-y-4 mt-5">
                                    <LinkCheckBox
                                        isChecked={isPasswordRequired}
                                        setIsChecked={setIsPasswordRequired}
                                        id={'password-required-checkbox'}
                                        name={'password-required-checkbox'}
                                        label={'IOS Targeting'}
                                        disabled={false}
                                        description={
                                            'Direct your iOS users to an alternate link for optimal user experience.'
                                        }
                                    />
                                    <motion.div
                                        initial={isPasswordRequired}
                                        animate={isPasswordRequired ? 'open' : 'closed'}
                                        variants={{
                                            open: { height: 'auto', opacity: 1 },
                                            closed: { height: 0, opacity: 0 }
                                        }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        style={{ overflow: 'hidden' }}
                                    >
                                        <AnimatePresence initial={isPasswordRequired}>
                                            <Input
                                                type="text"
                                                name="link_password"
                                                id="link_password"
                                                onChange={(e) => setPassword(e.target.value)}
                                                className={cn(
                                                    'ml-7 w-full max-w-[20rem] p-5 rounded-md border-0 py-1.5 text-sm shadow-inner ring-1 ring-inset ring-shade-line placeholder:text-shade-disabled focus:ring-inset focus:ring-stratos-default ',
                                                    !isPasswordRequired ? 'cursor-not-allowed bg-shade-line/20' : ''
                                                )}
                                                placeholder="Enter password"
                                                defaultValue={password ? password : undefined}
                                                maxLength={32}
                                                disabled={!isPasswordRequired}
                                            />
                                        </AnimatePresence>
                                    </motion.div>
                                </div>
                                <div className="flex flex-col space-y-4 mt-5">
                                    <LinkCheckBox
                                        isChecked={isPasswordRequired}
                                        setIsChecked={setIsPasswordRequired}
                                        id={'password-required-checkbox'}
                                        name={'password-required-checkbox'}
                                        label={'Android Targeting'}
                                        disabled={false}
                                        description={
                                            'Send Android users to a separate link for a tailored browsing experience.'
                                        }
                                    />
                                    <motion.div
                                        initial={isPasswordRequired}
                                        animate={isPasswordRequired ? 'open' : 'closed'}
                                        variants={{
                                            open: { height: 'auto', opacity: 1 },
                                            closed: { height: 0, opacity: 0 }
                                        }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        style={{ overflow: 'hidden' }}
                                    >
                                        <AnimatePresence initial={isPasswordRequired}>
                                            <Input
                                                type="text"
                                                name="link_password"
                                                id="link_password"
                                                onChange={(e) => setPassword(e.target.value)}
                                                className={cn(
                                                    'ml-7 w-full max-w-[20rem] p-5 rounded-md border-0 py-1.5 text-sm shadow-inner ring-1 ring-inset ring-shade-line placeholder:text-shade-disabled focus:ring-inset focus:ring-stratos-default ',
                                                    !isPasswordRequired ? 'cursor-not-allowed bg-shade-line/20' : ''
                                                )}
                                                placeholder="Enter password"
                                                defaultValue={password ? password : undefined}
                                                maxLength={32}
                                                disabled={!isPasswordRequired}
                                            />
                                        </AnimatePresence>
                                    </motion.div>
                                </div>
                                <div className="flex flex-col space-y-4 mt-5">
                                    <LinkCheckBox
                                        isChecked={isPasswordRequired}
                                        setIsChecked={setIsPasswordRequired}
                                        id={'password-required-checkbox'}
                                        name={'password-required-checkbox'}
                                        label={'Geo Targeting'}
                                        disabled={false}
                                        description={
                                            'Direct users to distinct links depending on their geographic location for targeted content delivery.'
                                        }
                                    />
                                    <motion.div
                                        initial={isPasswordRequired}
                                        animate={isPasswordRequired ? 'open' : 'closed'}
                                        variants={{
                                            open: { height: 'auto', opacity: 1 },
                                            closed: { height: 0, opacity: 0 }
                                        }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        style={{ overflow: 'hidden' }}
                                    >
                                        <AnimatePresence initial={isPasswordRequired}>
                                            <Input
                                                type="text"
                                                name="link_password"
                                                id="link_password"
                                                onChange={(e) => setPassword(e.target.value)}
                                                className={cn(
                                                    'ml-7 w-full max-w-[20rem] p-5 rounded-md border-0 py-1.5 text-sm shadow-inner ring-1 ring-inset ring-shade-line placeholder:text-shade-disabled focus:ring-inset focus:ring-stratos-default ',
                                                    !isPasswordRequired ? 'cursor-not-allowed bg-shade-line/20' : ''
                                                )}
                                                placeholder="Enter password"
                                                defaultValue={password ? password : undefined}
                                                maxLength={32}
                                                disabled={!isPasswordRequired}
                                            />
                                        </AnimatePresence>
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
                onClose={() => setIsQrCode(false)}
                className="bg-white"
            >
                <LinkQrCodeForm />
            </Modal>
        </>
    );
};
