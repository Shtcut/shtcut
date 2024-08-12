import { FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Label, Switch } from '@shtcut-ui/react';
import { X } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import { WiCloudUp } from 'react-icons/wi';

const CustomSocialMedia = ({
    form,
    setPreview,
    preview
}: {
    form: any;
    setPreview: (value: string | null) => void;
    preview: string | null;
}) => {
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const handleSwitchChange = (checked: boolean) => {
        setIsSwitchOn(checked);
    };
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setPreview(previewUrl);
        } else {
            setPreview(null);
        }
    };
    const handleEmptyImage = () => {
        setPreview(null);
    };

    return (
        <div>
            <div className="flex justify-between items-center gap-4">
                <div className="w-full lg:w-5/6">
                    <h2 className="text-sm font-medium">Custom Social Media Cards</h2>
                    <p className="text-xs mt-1 text-[#4d4d4d]">Customize appearance when shared on social media</p>
                </div>
                <Switch checked={isSwitchOn} onCheckedChange={handleSwitchChange} />
            </div>

            {isSwitchOn && (
                <>
                    {preview ? (
                        <>
                            <div className="relative">
                                <Image
                                    src={preview}
                                    alt="Preview"
                                    className="mt-4 object-cover w-full h-[200px]  rounded-md"
                                    height={0}
                                    width={100}
                                />
                                <div
                                    onClick={handleEmptyImage}
                                    className="absolute top-1 cursor-pointer right-1 bg-white w-5 h-5 rounded-full flex justify-center items-center"
                                >
                                    <X size={14} />
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            {' '}
                            <div className="flex flex-col gap-4 mb-4 mt-6">
                                <FormField
                                    control={form.control}
                                    name="file1"
                                    render={({ field: { value, onChange, ...fieldProps } }) => (
                                        <FormItem className="flex flex-col items-center justify-center">
                                            <FormLabel className="flex cursor-pointer  items-center gap-1 rounded-lg flex-col justify-center w-full  h-24  border ">
                                                <WiCloudUp size={20} />
                                                <p className="text-xs text-center ">
                                                    Drag and drop or click to upload{' '}
                                                </p>
                                                <p className="text-[#726C6C]  text-[10px] text-center">
                                                    Recommended: 1200 x 630 pixels
                                                </p>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...fieldProps}
                                                    placeholder="Picture"
                                                    type="file"
                                                    className="border-none mx-auto hidden"
                                                    accept="image/*, application/pdf"
                                                    onChange={handleFileChange}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <div className="flex justify-between  items-center">
                                                <Label className="text-xs">Title</Label>
                                                <Label className="text-xs text-[#433E3F]">7/100</Label>
                                            </div>
                                            <FormControl>
                                                <Input
                                                    placeholder="Shtcut- Open source link management"
                                                    className="h-10"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <div className="flex justify-between  items-center">
                                                <Label className="text-xs">Description</Label>
                                                <Label className="text-xs text-[#433E3F]">7/100</Label>
                                            </div>
                                            <FormControl>
                                                <Input
                                                    placeholder="Shtcut- Open source link management"
                                                    className="h-10"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default CustomSocialMedia;
