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
    const [, setShortLink] = useState<string>('');
    const [preview, setPreview] = useState<string | null>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [inputsGeo, setInputsGeo] = useState(['']);
    const [tags, setTags] = useState<string[]>([]);
    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(undefined);

    const handleDateChange = (date: Date | undefined) => {
        setSelectedDate(date);
    };

    const handleSelect = (value: string) => {
        setShortLink(value);
    };
    const handleInputChangeTitle = (event) => {
        setTitle(event.target.value);
    };
    const handleInputChangeDesc = (event) => {
        setDescription(event.target.value);
    };
    const handleNavigateEdit = () => {
        route.push(`${pathName}/1234`);
    };
    const form = useForm({
        defaultValues: {
            title: '',
            description: '',
            file1: '',
            link: '',
            shortLink: '',
            roleName: '',
            utmSource: '',
            utmMedium: '',
            password: '',
            expirationDate: '',
            iosURL: '',
            androidURL: ''
        }
    });
    const handleSubmit = (data: any) => {
        const payload = {
            ...data,
            tags,
            preview,
            inputsGeo,
            selectedDate
        };
        console.log('Form Data:', payload);
    };
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
                    <form onSubmit={form.handleSubmit(handleSubmit)} className=" h-screen">
                        <div className="flex h-full">
                            <div className="  h-full w-full ">
                                <h1 className="font-semibold px-14 py-6   border-b ">Create a new link</h1>
                                <div className=" w-full  h-full ">
                                    <div className=" overflow-y-auto h-[60%]">
                                        <CreateLinkForm
                                            handleSelect={handleSelect}
                                            form={form}
                                            preview={preview}
                                            title={title}
                                            description={description}
                                            setTags={setTags}
                                            tags={tags}
                                        />
                                    </div>
                                    <div className="px-14  border-t py-7">
                                        <Button className="text-xs h-8 bg-primary-0 rounded w-full">Create Link</Button>
                                    </div>
                                </div>
                            </div>
                            <Separator orientation="vertical" className="h-full" />
                            <div className=" h-full overflow-y-auto w-4/5">
                                <h1 className="font-semibold px-14 py-6   border-b  ">Advanced Options</h1>
                                <div className="px-14 py-6 pb-16 h-[75%] cursor-not-allowed overflow-y-auto flex flex-col gap-5">
                                    <CustomSocialMedia
                                        preview={preview}
                                        setPreview={setPreview}
                                        form={form}
                                        handleInputChangeTitle={handleInputChangeTitle}
                                        handleInputChangeDesc={handleInputChangeDesc}
                                    />
                                    <UTMbuilder />
                                    <PasswordProtection form={form} />
                                    <LinkExpire handleDateChange={handleDateChange} selectedDate={selectedDate} />
                                    <IosTarget />
                                    <AndroidTarget />
                                    <GeoTargeting setInputsGeo={setInputsGeo} inputsGeo={inputsGeo} />
                                    <CommentSection />
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
