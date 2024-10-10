import { Button, Form, Modal, Separator } from '@shtcut-ui/react';
import React from 'react';
import DomainsCard from './domains-card';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DomainsTypes } from '@shtcut/types/types';
import { useForm } from 'react-hook-form';
import AddDomainsForm from './add-domain-form';
import Tabs from '@shtcut/components/_shared/Tabs';
import { ConfigurationInfo } from './component';
import { dummyData } from '@shtcut/_shared/data';

const DomainsComponent = ({
    handleModalShow,
    showModal,
    setShowModal,
    handleModalCn,
    cnModal,
    setCnModal,
    handleTabClick,
    selectedTabIndex
}: DomainsTypes) => {
    const pathName = usePathname();

    const tabs = [
        { id: 'record', label: 'A Record' },
        { id: 'c-name', label: 'CNAME Record' }
    ];
    const form = useForm({
        defaultValues: {
            domainName: ''
        }
    });
    const handleFormSubmit = (values: any) => {
        console.log('values::', values);
    };
    return (
        <div>
            <div className="flex items-center justify-between">
                <h1 className="font-semibold text-xl">Domain</h1>
                <Button className="text-xs h-8 rounded bg-primary-0" onClick={() => handleModalShow(true)}>
                    Add Domain
                </Button>
            </div>
            <div className=" mt-6 flex flex-col gap-3">
                {dummyData.length > 0 ? (
                    dummyData.map((id) => (
                        <div key={id} className="">
                            <DomainsCard handleModalCn={handleModalCn} />
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center rounded-[10px] bg-white h-[500px]  justify-center gap-4 mt-10">
                        <Image src="/images/qrcode-data.png" width={232} height={172} alt="No Data" />
                        <p className="text-center  text-lg font-medium ">No Domain found for this workspace</p>
                        <Link href={`${pathName}/create`}>
                            <Button className="bg-primary-0 text-xs h-8 rounded ">Add Domain</Button>
                        </Link>
                    </div>
                )}
            </div>
            <Modal
                showModel={showModal}
                setShowModal={setShowModal}
                showCloseIcon
                onClose={() => handleModalShow(false)}
                className="bg-white relative px-8 py-6  max-w-[436px] h-fit"
            >
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleFormSubmit)}>
                        <div className="px-6 py-3">
                            <h1 className=" font-semibold">Add Domain</h1>
                            <p className="text-xs text-[#898384]">
                                Provide your existing domain to use it for short links
                            </p>
                            <Separator className="mt-2" orientation="horizontal" />
                            <div className="w-full mt-5">
                                <AddDomainsForm form={form} />
                                <Button
                                    className="text-xs h-8 rounded bg-primary-0 mt-8 w-full"
                                    onClick={() => handleModalShow(false)}
                                >
                                    Add Domain
                                </Button>
                            </div>
                        </div>
                    </form>
                </Form>
            </Modal>
            <Modal
                showModel={cnModal}
                setShowModal={setCnModal}
                showCloseIcon={true}
                onClose={() => handleModalCn(false)}
                className="bg-white relative max-w-[436px] h-fit"
            >
                <div className="px-6 py-3">
                    <h1 className=" font-semibold">Configuration</h1>
                    <p className="text-xs mt-1 text-[#898384]">
                        To configure your domain, set the records on your DNS provider
                    </p>
                    <Tabs
                        classNames="mt-4"
                        tabs={tabs}
                        selectedTabIndex={selectedTabIndex}
                        onTabClick={handleTabClick}
                    />
                    <ConfigurationInfo />
                </div>
            </Modal>
        </div>
    );
};

export default DomainsComponent;
