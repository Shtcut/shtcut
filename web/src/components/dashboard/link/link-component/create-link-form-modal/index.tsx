import {
    Card,
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
    SelectValue,
    Separator
} from '@shtcut-ui/react';
import React from 'react';
import { Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

const CreateLinkForm = ({
    form,
    handleSelect,
    preview
}: {
    form: any;
    handleSelect: (val: string) => void;
    preview: string | null;
}) => {
    return (
        <div className="w-full py-6">
            <div className="flex flex-col px-8 gap-4">
                <FormField
                    control={form.control}
                    name="link"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <Label className="text-sm">Original Link</Label>
                            <FormControl>
                                <Input placeholder="https://" className="h-10" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div>
                    <Label className="text-sm ">Short Link</Label>
                    <div className="flex items-center mt-2 rounded-md border h-10">
                        <Select onValueChange={handleSelect}>
                            <SelectTrigger
                                id="select-short-link"
                                className=" text-sm text-[#2B3034]  shadow-none  border-none  w-1/3 "
                            >
                                <SelectValue placeholder="short link" />
                            </SelectTrigger>
                            <SelectContent>
                                {[1, 2, 3, 4, 5].map((links) => (
                                    <SelectItem key={links} value={''} className="text-sm text-[#2B3034]">
                                        Shtcut.sh
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Separator orientation="vertical" />
                        <FormField
                            control={form.control}
                            name="short-link"
                            render={({ field }) => (
                                <FormItem className=" border-none   w-full">
                                    <FormControl>
                                        <Input
                                            placeholder="link "
                                            className="h-10 border-none focus-visible:ring-0  shadow-none  w-full"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <Select onValueChange={handleSelect}>
                    <Label>Select Tag</Label>
                    <SelectTrigger id="select-tag" className=" text-xs text-[#2B3034]  shadow-none h-10  ">
                        <SelectValue placeholder="select tag" />
                    </SelectTrigger>
                    <SelectContent>
                        {[1, 2, 3, 4, 5].map((links) => (
                            <SelectItem key={links} value={''} className="text-sm text-[#2B3034]">
                                tag
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <Separator orientation="horizontal" className="mt-6" />
            <div>
                <h1 className="font-semibold px-8 py-6    ">Social media preview</h1>
                <div className="px-8 ">
                    {preview ? (
                        <Image
                            src={preview}
                            alt="Preview"
                            className="mt-4 w-full  rounded-md object-cover"
                            height={112}
                            width={200}
                        />
                    ) : (
                        <Card className="bg-[#FCFCFC] cursor-pointer flex flex-col gap-y-2 items-center justify-center shadow-none border-gray-100 h-28 w-full">
                            <ImageIcon color="#726C6C" />
                            <p className="text-[#726C6C] text-xs">Enter a link to generate preview</p>
                        </Card>
                    )}
                </div>
                <Separator orientation="horizontal" className="mt-8" />
            </div>
        </div>
    );
};

export default CreateLinkForm;
