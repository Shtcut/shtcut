'use client';

import { Button, Input, Label, cn } from '@shtcut-ui/react';
import { Logo } from '@shtcut/components';
import { LinkCheckBox } from '@shtcut/components/_shared/LinkCheckBox';
import { IconCopy } from '@tabler/icons-react';
import { QrCodeIcon } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { QRCode } from 'react-qrcode-logo';

export const LinkUtmForm = () => {
    return (
        <div className="flex justify-center p-6">
            <div className="bg-white rounded-lg max-w-sm w-full p-8">
                <h1 className="text-center text-xl font-semibold mb-2">UTM Builder.</h1>
                <p className="text-center text-sm text-gray-500 mb-6">
                    Make use of short URLs for efficient tracking of online marketing campaigns. Improve tracking
                    capabilities by integrating UTM tags to analyze traffic data in Google Analytics.
                </p>
                <div className="flex justify-center mb-4">
                    <div className=" mt-2 flex w-full flex-col space-y-4">
                        <div className="justify-center">
                            <Label className="">UTM Source</Label>
                            <Input
                                type="text"
                                name="source"
                                id="source"
                                className={cn(
                                    'mt-2 w-full max-w-[20rem] p-5 rounded-md border-0 py-1.5 text-sm shadow-inner ring-1 ring-inset ring-shade-line placeholder:text-shade-disabled focus:ring-inset focus:ring-stratos-default '
                                )}
                                placeholder="E.g. twitter, facebook"
                            />
                        </div>
                        <div>
                            <Label>UTM Medium</Label>
                            <Input
                                type="text"
                                name="medium"
                                id="medium"
                                className={cn(
                                    'mt-2 w-full max-w-[20rem] p-5 rounded-md border-0 py-1.5 text-sm shadow-inner ring-1 ring-inset ring-shade-line placeholder:text-shade-disabled focus:ring-inset focus:ring-stratos-default '
                                )}
                                placeholder="E.g. banner, email"
                                maxLength={32}
                            />
                        </div>
                        <div>
                            <Label>UTM Campaign</Label>
                            <Input
                                type="text"
                                name="campaign"
                                id="campaign"
                                className={cn(
                                    'mt-2 w-full max-w-[20rem] p-5 rounded-md border-0 py-1.5 text-sm shadow-inner ring-1 ring-inset ring-shade-line placeholder:text-shade-disabled focus:ring-inset focus:ring-stratos-default '
                                )}
                                placeholder="E.g. acme_campaign"
                                maxLength={32}
                            />
                        </div>
                        <div>
                            <Label>UTM Term</Label>
                            <Input
                                type="text"
                                name="term"
                                id="term"
                                className={cn(
                                    'mt-2 w-full max-w-[20rem] p-5 rounded-md border-0 py-1.5 text-sm shadow-inner ring-1 ring-inset ring-shade-line placeholder:text-shade-disabled focus:ring-inset focus:ring-stratos-default '
                                )}
                                placeholder="Identify the paid keywordsEnter password"
                                maxLength={32}
                            />
                        </div>
                        <div>
                            <Label>UTM Content</Label>
                            <Input
                                type="text"
                                name="content"
                                id="content"
                                className={cn(
                                    'mt-2 w-full max-w-[20rem] p-5 rounded-md border-0 py-1.5 text-sm shadow-inner ring-1 ring-inset ring-shade-line placeholder:text-shade-disabled focus:ring-inset focus:ring-stratos-default '
                                )}
                                placeholder="Use to differentiate ads"
                                maxLength={32}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mb-6">
                    <Button className="w-full">Continue</Button>
                </div>
            </div>
        </div>
    );
};
