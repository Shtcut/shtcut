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
                                        isExpirationDate: false,
                                        isAndroidTargeting: true,
                                        isUTMBuilder: false,
                                        qrCode: {
                                            enableQrCode: false,
                                            showLogo: false
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
                        <div className="flex flex-col space-y-4">
                            <Card className="w-full">
                                <CardHeader>
                                    <CardTitle>Twitter</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex justify-center items-center h-32 border-dashed border-2 border-gray-300 rounded-md">
                                        <CameraIcon className="h-8 w-8 text-gray-400" />
                                    </div>
                                    <p className="text-center text-sm text-gray-500 mt-2">
                                        Enter a link to generate a preview.
                                    </p>
                                </CardContent>
                            </Card>
                            <Card className="w-full">
                                <CardHeader>
                                    <CardTitle>Facebook</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex justify-center items-center h-32 border-dashed border-2 border-gray-300 rounded-md">
                                        <CameraIcon className="h-8 w-8 text-gray-400" />
                                    </div>
                                    <p className="text-center text-sm text-gray-500 mt-2">
                                        Enter a link to generate a preview.
                                    </p>
                                </CardContent>
                            </Card>
                            <Card className="w-full">
                                <CardHeader>
                                    <CardTitle>Facebook</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex justify-center items-center h-32 border-dashed border-2 border-gray-300 rounded-md">
                                        <CameraIcon className="h-8 w-8 text-gray-400" />
                                    </div>
                                    <p className="text-center text-sm text-gray-500 mt-2">
                                        Enter a link to generate a preview.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

function CameraIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
            <circle cx="12" cy="13" r="3" />
        </svg>
    );
}
