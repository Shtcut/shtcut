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
    Separator,
    Tooltip,
    TooltipContent,
    TooltipTrigger
} from '@shtcut-ui/react';
import React from 'react';
import { Image as ImageIcon, Repeat } from 'lucide-react';
import Image from 'next/image';
import MultiTagsInput from '@shtcut/components/form/multi-tag-input';
import { DomainNameSpace } from '@shtcut/_shared/namespace/domain';
import { LinkNameSpace } from '@shtcut/_shared/namespace/link';
import { TagResponse } from '@shtcut/types/tags';
import { TooltipProvider } from '@radix-ui/react-tooltip';

const CreateLinkForm = ({
    form,
    handleSelect,
    preview,
    title,
    description,
    tags,
    setTags,
    watchLink,
    findAllDomainsResponse,
    singleLink,
    randomAlias,
    setRandomAlias
}: {
    form: any;
    handleSelect: (val: string) => void;
    preview: string | null;
    title: string;
    description: string;
    tags: TagResponse[] | undefined;
    setTags: React.Dispatch<React.SetStateAction<string[]>>;
    watchLink: string;
    findAllDomainsResponse: DomainNameSpace.Domain[];
    singleLink: LinkNameSpace.Link | undefined;
    randomAlias: string;
    setRandomAlias: React.Dispatch<React.SetStateAction<string>>;
}) => {
    const generateRandomAlias = () => {
        if (watchLink) {
            const alias = Math.random().toString(36).substring(2, 10);
            setRandomAlias(alias);
        }
    };
    const handleTagsChange = (newTags: string[]) => {
        setTags(newTags);
    };

    return (
        <div className="w-full py-6">
            <div className="flex flex-col px-14 gap-4">
                <FormField
                    control={form.control}
                    name="target"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <Label className="text-sm">Original Link</Label>
                            <FormControl>
                                <Input placeholder="https://" className="h-10" {...field} type="url" required />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div>
                    <section className="flex items-center justify-between">
                        <Label className="text-sm ">Short Link</Label>
                        <TooltipProvider>
                            <Tooltip delayDuration={0}>
                                <TooltipTrigger asChild>
                                    <Repeat
                                        size={16}
                                        onClick={generateRandomAlias}
                                        className={`${watchLink ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                                        color="#4d4d4d"
                                    />
                                </TooltipTrigger>
                                <TooltipContent side="right" className="flex items-center gap-4 text-xs">
                                    Generate an alias by clicking
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </section>
                    <div className="flex items-center mt-2 rounded-md border h-10">
                        <Select onValueChange={handleSelect}>
                            <SelectTrigger
                                disabled={!watchLink}
                                id="select-short-link"
                                className=" text-sm text-[#2B3034]  shadow-none  border-none  w-1/3 "
                            >
                                {singleLink ? (
                                    <p>{singleLink?.domain?.slug}</p>
                                ) : (
                                    <SelectValue placeholder="shtcut.co" defaultValue={'shtcut.co'} />
                                )}
                            </SelectTrigger>
                            <SelectContent>
                                {findAllDomainsResponse &&
                                    findAllDomainsResponse?.map((domain) => (
                                        <SelectItem
                                            key={domain?._id}
                                            value={domain?._id}
                                            disabled
                                            className="text-sm text-[#2B3034]"
                                        >
                                            {domain?.slug}
                                        </SelectItem>
                                    ))}
                            </SelectContent>
                        </Select>
                        <Separator orientation="vertical" />
                        <FormField
                            control={form.control}
                            name="alias"
                            render={({ field }) => (
                                <FormItem className="border-none w-full">
                                    <FormControl>
                                        <Input
                                            placeholder={singleLink ? singleLink?.alias : ''}
                                            className="h-10 border-none focus-visible:ring-0 shadow-none w-full"
                                            {...field}
                                            onChange={(e) => {
                                                setRandomAlias('');
                                                field.onChange(e);
                                            }}
                                            disabled={!watchLink || Boolean(singleLink)}
                                            value={randomAlias || field.value}
                                            defaultValue={singleLink ? singleLink?.alias : ''}
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
                        watchLink={watchLink}
                        singleLink={singleLink}
                    />
                </div>
            </div>
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
                                unoptimized
                                priority
                            />
                            <div className="p-4 bg-gray-50">
                                <h1 className=" font-semibold text-black">{title} </h1>
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
