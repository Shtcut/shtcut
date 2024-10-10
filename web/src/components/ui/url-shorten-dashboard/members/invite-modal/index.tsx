import { Button, Form, FormControl, FormField, FormItem, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@shtcut-ui/react';
import { InviteList } from '@shtcut/_shared/data';
import { Plus, Minus } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const InviteModal = () => {
    const [showInvite, setShowInvite] = useState(false);
    const [inputs, setInputs] = useState(['', '', '']);

    const addInput = () => {
        if (inputs.length < 10) {
            setInputs([...inputs, '']);
        }
    };

    const removeInput = () => {
        setInputs(inputs.slice(0, -1));
    };
    const shouldApplyMaxHeight = inputs.length > 4;

    const form = useForm({
        defaultValues: {
            email: ''
        }
    });
    const handleFormSubmit = (values: any) => {
        console.log(values);
    };
    return (
        <div className="pt-6">
            <section className="border-b  flex items-center flex-col pb-4">
                <h1 className="text-sm font-semibold">Invite people to collaborate</h1>
                <p className="text-xs text-[#898384]">Invite members to work on your workspace</p>
            </section>
            <section className="p-4 pt-8">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleFormSubmit)}>
                        <section className="flex flex-col gap-1">
                            {inputs.map((value, index) => (
                                <div key={index} className="relative">
                                    <div className="flex items-center gap-2">
                                        <FormField
                                            key={index}
                                            control={form.control}
                                            name={`email`}
                                            render={({ field }) => (
                                                <FormItem className="w-full">
                                                    <FormControl>
                                                        <Input placeholder="user@email.com" className="" {...field} />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <div className="w-40">
                                            <Select>
                                                <SelectTrigger
                                                    id="select-month"
                                                    className=" text-[10px] text-[#2B3034]  shadow-none "
                                                >
                                                    <SelectValue placeholder="month" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {InviteList.map((list) => (
                                                        <SelectItem
                                                            key={list.value}
                                                            value={list.value}
                                                            className="text-xs text-[#2B3034]"
                                                        >
                                                            {list.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="flex gap-x-3 mt-3 relative top-2 items-center">
                                        {index === inputs.length - 1 && inputs.length < 10 && (
                                            <div
                                                onClick={addInput}
                                                className="cursor-pointer text-primary-0 gap-3 text-xs  flex justify-end"
                                            >
                                                <Plus size={18} /> Add more
                                            </div>
                                        )}
                                        {index === inputs.length - 1 && index >= 3 && (
                                            <div onClick={removeInput} className="cursor-pointer   ">
                                                <Minus className="text-red-500 text-sm" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </section>
                        <div className="flex items-center gap-3 mt-6 w-full">
                            <Button className="w-full text-xs" variant={'outline'}>
                                Cancel
                            </Button>
                            <Button className="w-full bg-primary-0 text-xs">Send Invitation</Button>
                        </div>
                    </form>
                </Form>
            </section>
        </div>
    );
};

export default InviteModal;
