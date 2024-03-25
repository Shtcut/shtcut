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
    RadioGroup,
    RadioGroupItem,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Separator,
    Switch
} from '@shtcut-ui/react';
import { Logo } from '@shtcut/components';
import { FacebookIcon, FlagIcon, ImageIcon, InstagramIcon, LinkIcon, TwitterIcon, XIcon } from 'lucide-react';
import Link from 'next/link';

interface CreateLinkFormProps extends CommonProps {
    handleSubmitForm: (payload: Dict) => void;
}

export const LinkForm = (props: CreateLinkFormProps) => {
    return (
        <div className="mt-3 overflow-y-auto">
            <div className="text-center">
                <Logo width={150} className="mx-auto" />
            </div>

            <div className="flex flex-col lg:flex-row border rounded-md mt-5 gap-8 p-8 bg-white">
                <div className="flex flex-col space-y-6 border p-10 w-full lg:w-1/2">
                    <div className="flex items-center space-x-2">
                        <LinkIcon className="h-6 w-6 text-gray-600" />
                        <h2 className="text-xl font-semibold">Create a new link</h2>
                    </div>
                    <div className="flex flex-col space-y-4">
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1" htmlFor="destination-url">
                                Paste a destination URL
                            </label>
                            <Input id="destination-url" placeholder="Example: https://long-link.com/shorten-long-URL" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1" htmlFor="title">
                                Title (optional)
                            </label>
                            <Input id="title" placeholder="" />
                        </div>
                        <div className="flex items-center mb-4">
                            <Checkbox id="utm" />
                            <label className="ml-2 text-sm" htmlFor="utm">
                                Add UTMs to track web traffic in analytics tools
                            </label>
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
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex-1">
                                <label className="block text-sm font-medium mb-1" htmlFor="link-preview">
                                    Link Preview:
                                </label>
                                <Input id="link-preview" readOnly value="SHTCUT/wy7hTt" />
                            </div>
                            <Button className="ml-4" variant="secondary">
                                Copy link
                            </Button>
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
                        <div className="mt-4">
                            <RadioGroup defaultValue="utm-builders">
                                <div className="flex items-center mb-2">
                                    <RadioGroupItem id="utm-builders" value="utm-builders" />
                                    <Label htmlFor="utm-builders">UTM Builders</Label>
                                </div>
                                <div className="flex items-center mb-2">
                                    <RadioGroupItem id="password-protection" value="password-protection" />
                                    <Label htmlFor="password-protection">Password Protection</Label>
                                </div>
                                <div className="flex items-center mb-2">
                                    <RadioGroupItem id="expiration-date" value="expiration-date" />
                                    <Label htmlFor="expiration-date">Expiration Date</Label>
                                </div>
                                <div className="flex items-center mb-2">
                                    <RadioGroupItem id="ios-targeting" value="ios-targeting" />
                                    <Label htmlFor="ios-targeting">iOS Targeting</Label>
                                </div>
                                <div className="flex items-center">
                                    <RadioGroupItem id="android-targeting" value="android-targeting" />
                                    <Label htmlFor="android-targeting">Android Targeting</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                    <Button>Create link</Button>
                </div>
                <div className="flex flex-col space-y-4 w-full lg:w-1/2">
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
                    </div>
                </div>
            </div>
        </div>
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
