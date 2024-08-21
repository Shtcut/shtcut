import { Button, Input, Label, Modal } from '@shtcut-ui/react';
import Image from 'next/image';
import React, { useState } from 'react';
import ApiKeyDataTable from './api-key-table';
import { FormControl, FormField, FormItem, FormMessage } from '@shtcut-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import Tabs from '@shtcut/components/_shared/Tabs';
const ApiKeysScreen = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);
    const data = [1, 2, 3, 4, 5];
    const headers: string[] = ['Name', 'Key', 'Last Used', ''];
    const form = useForm({
        defaultValues: {
            apiKey: ''
        }
    });
    const handleTabClick = (index: number) => {
        setSelectedTabIndex(index);
    };
    const tabs = [
        { id: 'all', label: 'All' },
        { id: 'read-only', label: 'Read Only' },
        { id: 'api-keys', label: 'API Keys' }
    ];
    return (
        <div className="w-full ">
            <section className="flex justify-between gap-8 items-center w-full">
                <section className="h-12 flex items-center w-full px-4 border border-[#e3e3e3] bg-[#f7f7f7] rounded-[4px]">
                    <h3 className="font-semibold text-sm">API Keys</h3>
                </section>
                <Button onClick={() => setShowModal(true)} className="text-xs h-8 rounded bg-primary-0">
                    Create API Key
                </Button>
            </section>
            {data && data.length > 0 ? (
                <ApiKeyDataTable headers={headers} data={data} />
            ) : (
                <section className="h-[500px] mt-4 shadow-sm border border-gray-100 rounded-md flex flex-col items-center justify-center">
                    <Image src={'/images/no-data.png'} width={142} height={142} alt="" />
                    <h3 className="text-sm mt-4 font-bold py-1">No API Key Created</h3>
                    <p className="text-xs w-1/2 text-center">
                        Shtcut APIs can be used to integrate your data in shtcut with any external system. Create an API
                        key to get started
                    </p>
                </section>
            )}
            <Modal
                showModel={showModal}
                setShowModal={setShowModal}
                showCloseIcon
                onClose={() => setShowModal(false)}
                className="relative max-w-md h-fit py-2"
            >
                <div className="">
                    <section className="border-b p-3">
                        <h1 className="text-sm font-semibold">Create API Key</h1>
                        <p className="text-xs text-[#898384]">Use tags to organize your links</p>
                    </section>
                    <section className="py-4 px-10">
                        <FormProvider {...form}>
                            <div className="">
                                <FormField
                                    control={form.control}
                                    name="apiKey"
                                    render={({ field }) => (
                                        <FormItem className="space-y-1 w-full">
                                            <div className="flex mb-2 items-center justify-start">
                                                <Label className="text-xs"> Name</Label>
                                            </div>
                                            <FormControl>
                                                <FormControl>
                                                    <Input className="h-11" placeholder="Enter API name" />
                                                </FormControl>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <section className="w-2/3 mt-4">
                                    <p className='text-xs mb-1'>Permissions</p>
                                    <Tabs selectedTabIndex={selectedTabIndex} onTabClick={handleTabClick} tabs={tabs} />
                                </section>
                                <Button className="text-xs h-9 bg-primary-0 w-full mt-6">Create API Key</Button>
                            </div>
                        </FormProvider>
                    </section>
                </div>
            </Modal>
        </div>
    );
};

export default ApiKeysScreen;
