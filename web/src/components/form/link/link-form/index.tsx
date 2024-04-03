'use client';

import {
    Button,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Checkbox,
    CommonProps,
    Dict,
    Input,
    Label,
    Modal,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Switch,
    cn
} from '@shtcut-ui/react';
import { LinkIcon } from 'lucide-react';
import { useState } from 'react';
import { LinkSettingsForm } from '../link-settings-form';
import { Logo } from '@shtcut/components';
import { LinkType } from '@shtcut/types';
import { LinkPreview } from '@shtcut/components/_shared/LinkPreview';
import { IconBrandTwitter, IconLink } from '@tabler/icons-react';

interface LinkFormProps extends CommonProps {
    linkProps: LinkType;
    handleSubmitForm: (payload: Dict) => void;
}

export const LinkForm = (props: LinkFormProps) => {
    const [openLinkBrandForm, setOpenLinkBrandForm] = useState(false);

    const handleVisibility = (open: boolean) => {
        setOpenLinkBrandForm(open);
    };

    return (
        <>
            <div className="overflow-y-auto">
                {/* <div className="text-center">
                    <Logo width={150} className="mx-auto" />
                </div> */}

                <div className="flex flex-col lg:flex-row mt-5 gap-8 p-8  rounded-md ">
                    <div className="flex flex-col space-y-6 border bg-white rounded-md p-10 overflow-scroll w-full lg:w-1/2">
                        <div className="sticky top-0 flex items-center space-x-2">
                            <LinkIcon className="h-6 w-6 text-gray-600" />
                            <h2 className="text-xl font-semibold">Create a new link</h2>
                        </div>
                        <div className="flex flex-col space-y-4">
                            <div className="mb-2">
                                <label className="block text-sm font-medium mb-1" htmlFor="destination-url">
                                    Paste a destination URL
                                </label>
                                <Input
                                    id="destination-url"
                                    placeholder="Example: https://long-link.com/shorten-long-URL"
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block text-sm font-medium mb-1" htmlFor="title">
                                    Title (optional)
                                </label>
                                <Input id="title" placeholder="" />
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <Select>
                                    <SelectTrigger id="short-link">
                                        <SelectValue placeholder="SHTC.UT" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectItem value="SHTC.UT">SHTC.UT</SelectItem>
                                        <SelectItem value="LNK.CUT">LNK.CUT</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Input placeholder="Unique back-half (optional)" />
                            </div>
                            <Select>
                                <SelectTrigger id="tag">
                                    <SelectValue placeholder="Choose a tag" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    <SelectItem value="marketing">Marketing</SelectItem>
                                    <SelectItem value="sales">Sales</SelectItem>
                                </SelectContent>
                            </Select>
                            <div className="relative my-5">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-background px-2 text-black font-normal">Link Settings</span>
                                </div>
                            </div>
                            <div className="mt-4">
                                <LinkSettingsForm
                                    linkProps={{
                                        url: '',
                                        isExpirationDate: true,
                                        isAndroidTargeting: true,
                                        isUTMBuilder: true,
                                        qrCode: {
                                            enableQrCode: true,
                                            removeLogo: false,
                                            enableBrandLogo: false,
                                        }
                                    }}
                                    handleOnSubmit={(payload) => console.log(payload)}
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
            </div>
        </>
    );
};
