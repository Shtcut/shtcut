import { Button, Form, Modal, Separator } from '@shtcut-ui/react';
import React, { useState } from 'react';
import LinkListedComponent from '../link-listed-component';
import SearchFilterActions from '../search-filter-actions';
import { usePathname, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import {
    AndroidTarget,
    CommentSection,
    CreateLinkForm,
    CustomSocialMedia,
    GeoTargeting,
    IosTarget,
    LinkExpire,
    PasswordProtection,
    UTMbuilder
} from '../component';

const LinkComponent = () => {
    const [showModal, setShowModal] = useState(false);
    const pathName = usePathname();
    const route = useRouter();
    const [shortLink, setShortLink] = useState<string>('');
    const [preview, setPreview] = useState<string | null>(null);
    const handleSelect = (value: string) => {
        setShortLink(value);
    };
    const handleNavigateEdit = () => {
        route.push(`${pathName}/1234`);
    };
    const form = useForm({
        defaultValues: {
            link: ''
        }
    });
    return (
        <section className=" ">
            <div className="flex justify-between  items-center">
                <h1 className="font-semibold text-[#2B2829] text-xl">Link Shortener</h1>

                <Button className="bg-primary-0 text-xs h-8 rounded " onClick={() => setShowModal(true)}>
                    Create Link
                </Button>
            </div>
            <SearchFilterActions />
            <div className="flex flex-col gap-y-[14px] mt-8">
                {[1, 2, 3, 4, 5].map((data, index) => (
                    <div key={index}>
                        <LinkListedComponent data={data} onClickNavigate={handleNavigateEdit} />
                    </div>
                ))}
            </div>
            <Modal
                showModel={showModal}
                className="h-[80%] max-w-screen-lg"
                setShowModal={setShowModal}
                onClose={() => setShowModal(false)}
                showCloseIcon
            >
                <Form {...form}>
                    <form action="">
                        <div>
                            <div className="flex  h-screen">
                                <div className="  h-full w-full ">
                                    <h1 className="font-semibold px-8 py-6   border-b ">Create a new link</h1>
                                    <div className=" w-full  pb-16 h-[75%] cursor-not-allowed overflow-y-auto">
                                        <CreateLinkForm handleSelect={handleSelect} form={form} preview={preview} />
                                        <div className="px-8 my-6">
                                            <Button className="text-xs h-8 bg-primary-0 rounded w-full">
                                                Create Link
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                <Separator orientation="vertical" className="h-full" />
                                <div className=" h-full overflow-y-auto w-4/5">
                                    <h1 className="font-semibold px-8 py-6   border-b  ">Advanced Options</h1>
                                    <div className="px-8 py-6 pb-16 h-[75%] cursor-not-allowed overflow-y-auto flex flex-col gap-5">
                                        <CustomSocialMedia preview={preview} setPreview={setPreview} form={form} />
                                        <UTMbuilder />
                                        <PasswordProtection form={form} />
                                        <LinkExpire />
                                        <IosTarget />
                                        <AndroidTarget />
                                        <GeoTargeting />
                                        <CommentSection />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </Form>
            </Modal>
        </section>
    );
};

export default LinkComponent;
