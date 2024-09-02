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
import MultiTagsInput from '@shtcut/components/form/multi-tag-input';

const CreateLinkForm = ({
    form,
    handleSelect,
    preview,
    title,
    description,
    tags,
    setTags
}: {
    form: any;
    handleSelect: (val: string) => void;
    preview: string | null;
    title: string;
    description: string;
    tags: string[];
    setTags: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
    const handleTagsChange = (newTags: string[]) => {
        setTags(newTags);
        console.log('Selected Tags:', newTags);
    };
    const predefinedTags = ['JavaScript', 'React', 'CSS', 'TypeScript', 'HTML'];

    return (
        <div className="w-full py-6">
            <div className="flex flex-col px-14 gap-4">
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
                            name="shortLink"
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

                <div>
                    <MultiTagsInput
                        initialTags={tags}
                        onTagsChange={handleTagsChange}
                        placeholder="Type a tag and press enter"
                        className=""
                        label="Select Tag"
                        selectOptions={predefinedTags}
                    />
                    {/* <div className="mt-4">
                        {tags.length > 0 ? (
                            <ul className="list-disc pl-5">
                                {tags.map((tag, index) => (
                                    <li key={index}>{tag}</li>
                                ))}
                            </ul>
                        ) : null}
                    </div> */}
                </div>
            </div>
            {/* <Separator orientation="horizontal" className="mt-6" /> */}
            <div>
                <h1 className="font-semibold px-14 py-3">Social media preview</h1>
                <div className="px-14  ">
                    {preview ? (
                        <div className="border rounded-md shadow-sm">
                            <Image
                                src={preview}
                                alt="Preview"
                                className=" w-full  rounded-t-md h-40 object-cover"
                                height={0}
                                width={0}
                            />
                            <div className="p-4 bg-gray-50">
                                <h1 className=" font-semibold">{title}</h1>
                                <p className="text-xs text-[#726C6C] w-96 mt-2">{description}</p>
                            </div>
                        </div>
                    ) : (
                        <Card className="bg-[#FCFCFC] cursor-pointer flex flex-col gap-y-2 items-center justify-center shadow-none border-gray-100 h-28 w-full">
                            <ImageIcon color="#726C6C" />
                            <p className="text-[#726C6C] text-xs">Enter a link to generate preview</p>
                        </Card>
                    )}
                </div>
                {/* <Separator orientation="horizontal" className="mt-8" /> */}
            </div>
        </div>
    );
};

export default CreateLinkForm;
