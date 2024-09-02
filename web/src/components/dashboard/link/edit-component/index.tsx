'use client';
import { Button, Input, Label } from '@shtcut-ui/react';
import React, { useState } from 'react';
import { Link,Tag } from 'lucide-react';
import { PiCopyFill } from 'react-icons/pi';
import MultiTagsInput from '@shtcut/components/form/multi-tag-input';
import BreadCrumb from '@shtcut/components/bread-crumb';

const EditComponent = ({ form }: { form: any }) => {
    const [tags, setTags] = useState<string[]>([]);

    const handleTagsChange = (newTags: string[]) => {
        setTags(newTags);
    };

    return (
        <div className="my-[38px]">
            <BreadCrumb currentRoute="Edit link" />
            <div className="flex justify-between items-center">
                <h1 className="font-semibold  text-[#2B2829] text-2xl">Edit Link</h1>
                <Button className="bg-primary-0  ">Save Changes</Button>
            </div>
            <div className="mt-6 px-16 py-5 shadow border border-gray-50 bg-white">
                <p className="text-2xl font-medium">Figma Components</p>
                <span className="text-sm text-tertiary-500">
                    October 15, 2024 22:00 <span className="text-primary-0">by Emmet Bekin</span>
                </span>
                <section className="flex flex-col gap-y-4 mt-6">
                    <div className="border-b relative pb-4">
                        <div className="absolute inset-y-0 left-0 bottom-4 flex items-center pl-3 pointer-events-none">
                            <Link size={16} className=" text-tertiary-700" />
                        </div>
                        <Input placeholder="shtcut/amazonkeyboard" className="pl-10" />
                        <div className="absolute inset-y-0 right-0 bottom-4 flex items-center pr-3 cursor-pointer">
                            <PiCopyFill size={16} className="text-primary-0" />
                        </div>
                    </div>
                    <div className="border-b pb-4">
                        <Label className="text-base font-medium">Destination URL:</Label>
                        <Input
                            placeholder=" https://dribble.com/shots/1971969600-justadmin-Finance-SaaS-Hero"
                            className="mt-1"
                        />
                    </div>
                    <div>
                        <Label className="text-base flex items-center gap-x-2 font-medium ">
                            <Tag size={16} /> Add tags
                        </Label>
                        <MultiTagsInput
                            initialTags={tags}
                            onTagsChange={handleTagsChange}
                            placeholder=" Select tags...."
                            className="mt-1"
                        />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default EditComponent;
