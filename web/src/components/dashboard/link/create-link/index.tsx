'use client';
import { Button, Card, Input, Label, Separator } from '@shtcut-ui/react';
import React, { useState } from 'react';
import MultiTagsSelectInput from '@shtcut/components/form/multiple-select-input';
import BreadCrumb from '@shtcut/components/bread-crumb';

const options = [
    { label: 'Link', value: 'link' },
    { label: 'Dashboard', value: 'dashboard' },
    { label: 'Landing', value: 'landing' }
];

const CreateLinkComponent = () => {
    const [tags, setTags] = useState<string[]>([]);

    const handleTagsChange = (newTags: string[]) => {
        setTags(newTags);
    };

    return (
        <div className="">
            <BreadCrumb currentRoute="Create new link" />
            <div className="flex justify-between items-center">
                <h1 className="font-semibold  text-[#2B2829] text-2xl">Create a new link</h1>
                <Button className="bg-primary-0 flex justify-center items-center gap-x-2">
                    Create Link <div className="border border-white w-2 h-2 font-semibold rounded-full" />
                </Button>
            </div>
            <Card className="mt-6 py-10 rounded-[10px] px-16  ">
                <section className="flex flex-col gap-y-4 ">
                    <div className="border-b pb-4">
                        <Label className="text-base font-medium">Destination URL:</Label>
                        <Input
                            placeholder=" https://dribble.com/shots/1971969600-justadmin-Finance-SaaS-Hero"
                            className="mt-1"
                        />
                    </div>
                    <div className="">
                        <Label className="text-base font-medium">Short Link</Label>
                        <Input placeholder=" shrt/howto" className="mt-1" />
                    </div>
                    <div className="flex items-center gap-x-3 mt-2">
                        <Separator className="flex-grow w-[45%]" />
                        <span className="text-sm text-[#9F9C9C]">Optional</span>
                        <Separator className="flex-grow w-[45%]" />
                    </div>

                    <div>
                        <MultiTagsSelectInput
                            initialTags={tags}
                            onTagsChange={handleTagsChange}
                            options={options}
                            placeholder="Select tags...."
                            className="mt-1"
                        />
                    </div>
                </section>
            </Card>
        </div>
    );
};

export default CreateLinkComponent;
