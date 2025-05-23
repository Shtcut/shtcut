import React from 'react';
import { Button, Form, FormControl, FormItem, FormMessage, Input } from '@shtcut-ui/react';
import { Minus, Plus } from 'lucide-react';
import { Controller } from 'react-hook-form';
import { LoadingButton } from '@shtcut/components/_shared/loading-button';
const InviteModal = ({
    form,
    emailsInput,
    addInput,
    handleFormSubmit,
    removeInput,
    isLoading,
    handleClose
}: {
    form: any;
    emailsInput: string[];
    addInput: () => void;
    handleFormSubmit: (val: any) => void;
    removeInput: () => void;
    isLoading: boolean;
    handleClose: () => void;
}) => {
    return (
        <section className="">
            <section className="border-b px-3 pb-4 flex items-center flex-col">
                <h1 className="text-sm font-semibold">Invite people to collaborate</h1>
                <p className="text-xs text-[#898384]">Invite members to work on your workspace</p>
            </section>
            <section className="p-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleFormSubmit)}>
                        <section className="flex flex-col gap-1">
                            {form.watch('emails')?.map((_, index) => (
                                <div key={index} className="relative">
                                    <div className="flex items-center gap-2">
                                        <FormItem className="w-full">
                                            <Controller
                                                name={`emails.${index}`}
                                                control={form.control}
                                                render={({ field }) => (
                                                    <FormControl>
                                                        <Input {...field} placeholder="user@email.com" />
                                                    </FormControl>
                                                )}
                                            />
                                            {form.formState.errors.emails?.[index] && (
                                                <FormMessage className="text-red-500 text-xs mt-1">
                                                    {form.formState.errors.emails[index]?.message}
                                                </FormMessage>
                                            )}
                                        </FormItem>
                                    </div>
                                    <div className="flex gap-x-3 mt-3 relative top-2 items-center">
                                        {index === emailsInput.length - 1 && emailsInput.length < 10 && (
                                            <div
                                                onClick={addInput}
                                                className="cursor-pointer text-primary-0 gap-3 text-xs  flex justify-end"
                                            >
                                                <Plus size={18} /> Add more
                                            </div>
                                        )}
                                        {index === emailsInput.length - 1 && index >= 3 && (
                                            <div onClick={removeInput} className="cursor-pointer   ">
                                                <Minus className="text-red-500 text-sm" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </section>
                        <div className="flex items-center gap-3 mt-6 w-full">
                            <Button onClick={handleClose} className="w-full text-xs" variant={'outline'}>
                                Cancel
                            </Button>
                            <LoadingButton type="submit" loading={isLoading} className="w-full bg-primary-0 text-xs">
                                Send Invitation
                            </LoadingButton>
                        </div>
                    </form>
                </Form>
            </section>
        </section>
    );
};

export default InviteModal;
