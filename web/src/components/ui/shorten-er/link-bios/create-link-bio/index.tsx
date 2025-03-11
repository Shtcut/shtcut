'use client';

import { Card, Input, Modal, toast } from '@shtcut-ui/react';
import Tabs from '@shtcut/components/_shared/Tabs';
import Stepper from '@shtcut/components/stepper/horizontal-stepper';
import LinksSection from '@shtcut/components/ui/qr-code-components/multi-link-components/link-sections';
import ColorsQrCode from '@shtcut/components/ui/qr-code-components/website-component/actions-tab/colors-component';
import useGeneralState from '@shtcut/hooks/general-state';
import {
    setBgColor,
    setBtnColor,
    setContactInfo,
    setDescription,
    setPresetColor,
    setSelectedTemplate,
    setTitle
} from '@shtcut/redux/slices/selects';
import React, { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import UrlLink from '../components/url-link';
import QRCode from '../components/qr-code';
import { LoadingButton } from '@shtcut/components/_shared/loading-button';
import { useForm } from 'react-hook-form';
import { useParams, useRouter } from 'next/navigation';
import PreviewPhone from '@shtcut/components/dashboard/preview-phone';
import LinkHeader from '@shtcut/components/dashboard/link-header';
import { useLinksManager } from '@shtcut/hooks/use-links-manager';
import QrCodeName from '@shtcut/components/ui/qr-code-components/website-component/qr-code-name';
import { useCurrentWorkSpace } from '@shtcut/hooks/current-workspace';
import { getImagePreview, handleError, handleSuccess } from '@shtcut/_shared';
import { LinkBioActions, LinkBioStateType } from '@shtcut/types/link-bio';
import { setQrTitle } from '@shtcut/redux/slices/qr-code';
import BtnActions from '@shtcut/components/btn-actions';
import useQrCodeState from '@shtcut/hooks/qrcode/index.';

const CreateLinkBioComponent = ({
    linkBioActions,
    linkBiosState,
    editId
}: {
    linkBioActions: LinkBioActions;
    linkBiosState: LinkBioStateType;
    editId?: string;
}) => {
    const router = useRouter();
    const currentWorkspace = useCurrentWorkSpace();
    const { state, actions } = useLinksManager(linkBiosState?.getSingleLinkBio?.links);
    const params = useParams();
    const { state: qrCodeState, action: qrcodeAction } = useQrCodeState();
    const { workspace } = params;

    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [showInputModal, setShowInputModal] = useState(false);
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);
    const {
        title,
        description,
        activeTemplateString,
        profileImage,
        step,
        bgColor,
        btnColor,
        presetColor,
        contactInfo,
        handleNextStep,
        handlePrevStep
    } = useGeneralState();

    const {
        register,
        handleSubmit: onSubmit,
        formState: { errors, isValid },
        watch
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            uniqueName: ''
        }
    });
    const uniqueNameValue = watch('uniqueName');
    const handleTabClick = (index: number) => {
        setSelectedTabIndex(index);
    };

    const handleSubmit = async () => {
        const payload = {
            workspace: currentWorkspace?._id,
            name: title,
            title,
            description,
            template: activeTemplateString,
            colors: {
                presetColor,
                btnColor,
                background: bgColor
            },
            links: state?.links,
            profileImage: profileImage,
            contacts: {
                phone: contactInfo.phoneNumber,
                email: contactInfo.email,
                website: contactInfo.websiteUrl
            },
            address: {
                street: contactInfo.streetAddress,
                country: contactInfo.country,
                city: contactInfo.city,
                zipCode: Number(contactInfo.zipCode),
                state: contactInfo.state
            }
        };

        if (step === 1) {
            if (!title) {
                toast({
                    variant: 'destructive',
                    title: 'Missing Title',
                    description: 'Please provide a title before proceeding.'
                });
                return;
            }
            if (state?.imgError) {
                toast({
                    variant: 'destructive',
                    title: 'Large Image',
                    description: state?.imgError
                });
                return;
            }
            const hasValidLink = state?.links?.every((link) => link.label.trim() !== '' && link.url.trim() !== '');
            if (!hasValidLink) {
                toast({
                    variant: 'destructive',
                    title: 'Invalid Links',
                    description: 'Please ensure all links have a title and URL filled in.'
                });
                return;
            }
            handleNextStep();
            return;
        }
        if (step === 2) {
            handleNextStep();
            return;
        }
        if (step === 3) {
            linkBioActions.setLoadingState('creating', true);
            try {
                let res;
                if (editId) {
                    res = await linkBioActions?.updateLinkBio({ payload, id: editId });
                } else {
                    res = await linkBioActions?.createLinkBio({ payload });
                }
                handleSuccess({
                    response: res,
                    defaultMessage: editId ? 'Link-bio updated' : 'Link-bio created'
                });
                setShowModal(true);
                qrcodeAction.generalReset();
            } catch (err) {
                handleError({ error: err });
            } finally {
                linkBioActions.setLoadingState('creating', false);
            }
        }
    };

    const onSubmitTitle = (data: { uniqueName: string }) => {
        console.log('Title:', data.uniqueName);
        // setShowInputModal(false);
    };

    const handleCloseCreateLinkBio = () => {
        setShowModal(false);
        router.back();
    };

    const tabs = [
        { id: 'url', label: 'URL' },
        { id: 'qr-code', label: 'QR Code' }
    ];

    useEffect(() => {
        if (editId && linkBiosState?.getSingleLinkBio) {
            const getLinkBio = linkBiosState?.getSingleLinkBio;
            const addressData = getLinkBio.address || {};
            const contactData = getLinkBio.contacts || {};
            dispatch(
                setContactInfo({
                    phoneNumber: contactData.phone || '',
                    email: contactData.email || '',
                    websiteUrl: contactData.website || '',
                    streetAddress: addressData.street || '',
                    country: addressData.country || '',
                    state: addressData.state || '',
                    zipCode: addressData.zipCode || '',
                    city: addressData.city || ''
                })
            );
            dispatch(setTitle(getLinkBio?.title));
            dispatch(setDescription(getLinkBio?.description));
            dispatch(setSelectedTemplate(getLinkBio?.template));
            dispatch(setBgColor(getLinkBio?.colors?.background ?? ''));
            dispatch(setPresetColor(getLinkBio?.colors?.presetColor ?? ''));
            dispatch(setBtnColor(getLinkBio?.colors?.btnColor ?? ''));
            dispatch(setQrTitle(getLinkBio?.name));
        }
    }, [editId, linkBiosState?.getSingleLinkBio, dispatch]);

    const handleClose = () => {
        setShowModal(false);
        qrcodeAction.generalReset();
        router.push(`/url/${workspace}/link-bios`);
    };

    const urlLink = editId ? linkBiosState?.updateLinkBioResponse?.slug : linkBiosState?.createLinkBioResponse?.slug;
    const idLink = editId ? linkBiosState?.updateLinkBioResponse?.id : linkBiosState?.createLinkBioResponse?.id;

    return (
        <section>
            <BtnActions
                handlePrevStep={handlePrevStep}
                isLoading={linkBiosState?.isLoadingState}
                step={step}
                handleSave={handleSubmit}
                handleClose={handleClose}
                title="Create Link Bio"
            />
            <section className="flex mt-[22px] gap-7">
                <section className="w-[90%]">
                    <section className="w-full h-[90px] bg-white rounded-[10px] shadow-sm border border-gray-100">
                        <Stepper step={Number(step)} />
                    </section>
                    {step === 1 && (
                        <section>
                            <LinkHeader
                                label="Title"
                                description="Enter Title and description"
                                isVisible={state?.showSections[0]}
                                toggleVisibility={() => actions?.toggleSection(0)}
                                titleValue={title as string}
                                descriptionValue={description as string}
                                handleTitleChange={(e) => dispatch(setTitle(e.target.value))}
                                handleDescriptionChange={(e) => dispatch(setDescription(e.target.value))}
                                selectedImage={profileImage as string}
                                handleImageChange={actions?.handleImageChange}
                                showAddress={true}
                            />
                            {state?.links.map((link, index) => (
                                <LinksSection
                                    key={link.id}
                                    index={index + 1}
                                    isVisible={state?.showSections[link.id]}
                                    toggleVisibility={() => actions?.toggleSection(link.id)}
                                    linkImage={getImagePreview(link?.image)}
                                    handleImageChange={(e) => actions?.handleLinkImageChange(link.id, e)}
                                    onUpdateLink={(field, value) => actions?.updateLink(link.id, field, value)}
                                    onRemove={() => actions?.removeLink(link.id)}
                                    addLinkSection={actions?.addLink}
                                    link={link}
                                />
                            ))}
                        </section>
                    )}
                    {step === 2 && (
                        <Card className="shadow-sm mt-4 py-4 px-6 border border-gray-100">
                            <ColorsQrCode />
                        </Card>
                    )}
                    {step === 3 && (
                        <section className="mt-4  shadow-sm border border-gray-100  rounded-[10px] gap-2">
                            <QrCodeName />
                        </section>
                    )}
                </section>
                <div className="bg-white sticky top-0 shadow-sm border border-gray-100 rounded-[10px] h-[640px] p-[23px]">
                    <h2 className="font-semibold">Preview</h2>
                    <PreviewPhone switchTab="edit-link" links={state?.links} />
                </div>
            </section>
            <Modal showModel={showModal} setShowModal={setShowModal} onClose={handleCloseCreateLinkBio}>
                <section className="">
                    <section className="flex p-4 border-b items-center justify-between">
                        <h1 className="font-medium">Share your Link</h1>
                        <MdClose className="cursor-pointer " onClick={handleCloseCreateLinkBio} />
                    </section>
                    <section className="px-6 pb-4">
                        <Tabs
                            selectedTabIndex={selectedTabIndex}
                            onTabClick={(index) => handleTabClick(index)}
                            tabs={tabs}
                            classNames="mt-4"
                        />
                        {selectedTabIndex === 0 && (
                            <UrlLink
                                uniqueName={uniqueNameValue}
                                url={`${process.env.NEXT_PUBLIC_URL}/link-bio/${urlLink}`}
                            />
                        )}
                        {selectedTabIndex === 1 && (
                            <QRCode
                                uniqueName={uniqueNameValue}
                                url={`${process.env.NEXT_PUBLIC_URL}/${urlLink}`}
                                id={idLink ?? ''}
                            />
                        )}
                    </section>
                </section>
            </Modal>
            <Modal
                showModel={showInputModal}
                setShowModal={setShowInputModal}
                onClose={() => {
                    setShowInputModal(true);
                    router.back();
                }}
            >
                <section className="py-4 px-6 flex flex-col gap-4">
                    <h1 className="font-medium">Create a new Link</h1>
                    <form onSubmit={onSubmit(onSubmitTitle)}>
                        <Input
                            placeholder="unique name"
                            {...register('uniqueName', {
                                required: 'Unique link bio is required',
                                maxLength: {
                                    value: 50,
                                    message: 'Unique link bio cannot exceed 50 characters'
                                }
                            })}
                            className="border"
                        />
                        {errors.uniqueName && <p className="text-red-500 text-xs mt-1">{errors.uniqueName.message}</p>}
                        <LoadingButton disabled={!isValid} className="mt-6">
                            Create Link ⚡️
                        </LoadingButton>
                    </form>
                </section>
            </Modal>
        </section>
    );
};

export default CreateLinkBioComponent;
