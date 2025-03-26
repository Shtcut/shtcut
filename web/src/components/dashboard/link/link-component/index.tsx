import { Button, Form, Separator, Modal as ShadModal, toast } from '@shtcut-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import SearchFilterActions from '../search-filter-actions';
import { usePathname, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import {
    AndroidTarget,
    CreateLinkForm,
    CustomSocialMedia,
    GeoTargeting,
    IosTarget,
    LinkExpire,
    PasswordProtection,
    UTMbuilder
} from '../component';
import StarLoader from '@shtcut/components/loader/star-loader';
import { LinkComponentType, LinkNameSpace } from '@shtcut/_shared/namespace/link';
import DeleteComponent from './delete-modal';
import DuplicateComponent from './duplicate-modal';
import QrCodeModal from './qrcode-modal';
import { LoadingButton } from '@shtcut/components/_shared/loading-button';
import ArchiveModal from './archive-component';
import LinkDataComponent from './link-data';
import { ModalType } from '@shtcut/types/types';
import ShareLinkModal from './share-link-modal';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@shtcut/redux/store';
import { setDropdownState, toggleDropdown } from '@shtcut/redux/slices/ui';
import { useTags } from '@shtcut/hooks/tags';
import { useCurrentWorkSpace } from '@shtcut/hooks/current-workspace';
import { useUpdateArchivedLinkMutation } from '@shtcut/services/link';
import { handleError } from '@shtcut/_shared';
import Modal from '@shtcut/components/modal';

const LinkComponent = ({
    findAllLinksResponse,
    deleteLink,
    isLoading,
    deleteLinkResponse,
    setLoadingState,
    isLoadingState,
    search,
    onSearchChange,
    duplicate,
    duplicateLinkResponse,
    findAllLinks,
    fetchMetaDataResponse,
    fetchMetadata,
    fetchMetaLoading,
    setUrl,
    findAllDomainsResponse,
    createLink,
    createLinkResponse,
    updateLink,
    updateLinkResponse,
    setSearch,
    pagination,
    paginationActions,
    handleCloseLoading,
    deleteManyLinks,
    params
}: LinkComponentType) => {
    const { findAllTagsResponse } = useTags({ call: true });
    const [updateLinksArchived] = useUpdateArchivedLinkMutation();
    const dispatch = useAppDispatch();
    const qrCodeRef = useRef(null);
    const [modalType, setModalType] = useState<ModalType>(null);
    const [randomAlias, setRandomAlias] = useState('');
    const [showSections, setShowSections] = useState(false);
    const [singleLink, setSingleLink] = useState<LinkNameSpace.Link | null>(null);
    const pathName = usePathname();
    const route = useRouter();
    const [domain, setDomain] = useState<string | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [countriesData, setCountriesData] = useState<{ countryCode: string; url: string }[]>([]);
    const [tags, setTags] = useState<string[]>([]);
    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(undefined);
    const currentWorkspace = useCurrentWorkSpace();
    const showDropdown = useSelector((state: RootState) => state.ui.showDropdown);
    const [ids, setIds] = useState<string[]>([]);
    const handleDateChange = (date: Date | undefined) => {
        setSelectedDate(date);
    };

    const handleSelect = (value: string) => {
        setDomain(value);
    };

    const handleNavigate = (alias: string) => {
        route.push(`${pathName}/analytics/${alias}`);
    };

    const toggleSection = (type?: ModalType, val?: LinkNameSpace.Link) => {
        if (
            (val && type === 'deleteModal') ||
            (val && type === 'duplicateModal') ||
            (val && type === 'qrCodeModal') ||
            (val && type === 'archiveModal') ||
            (val && type === 'shareModal')
        ) {
            setSingleLink(val);
        }
        setModalType(type || null);
        setShowSections(type !== null);
    };

    const form = useForm({
        defaultValues: {
            title: '',
            description: '',
            image: '',
            target: '',
            shortLink: '',
            roleName: '',
            password: '',
            expirationDate: '',
            ios: '',
            android: '',
            source: '',
            medium: '',
            campaign: '',
            term: '',
            content: '',
            alias: ''
        }
    });
    const { watch, setValue } = form;
    const watchLink = watch('target');
    const watchTitle = watch('title');
    const watchDescription = watch('description');

    const handleDeleteLink = async (id: string) => {
        try {
            setLoadingState('deleting', true);
            await deleteLink({
                payload: { id },
                options: {
                    successMessage: 'Link deleted successfully'
                }
            }).unwrap();
        } catch (error) {
            console.error('Failed to delete link:', error);
        } finally {
            setLoadingState('deleting', false);
        }
    };

    const handleDuplicateLink = async (linkId: string) => {
        setLoadingState('duplicating', true);
        duplicate({
            payload: { id: linkId },
            options: {
                successMessage: 'Link Duplicated successfully'
            }
        });
    };

    useEffect(() => {
        if (fetchMetaDataResponse?.data?.meta) {
            const { title, description } = fetchMetaDataResponse.data.meta;
            const image = fetchMetaDataResponse?.data?.og?.image || fetchMetaDataResponse?.data?.images[0]?.src;
            setValue('title', title);
            setValue('description', description);
            setPreview(image);
        }
    }, [fetchMetaDataResponse, setValue]);

    useEffect(() => {
        if (watchLink) {
            setUrl(watchLink);
        }
        if (singleLink?.createdAt) {
            setSelectedDate(new Date(singleLink.createdAt));
        }
    }, [watchLink, setUrl, singleLink]);

    const handleCloseModal = () => {
        setShowSections(false);
        setModalType(null);
        handleCloseLoading();
        setSingleLink(null);
    };
    const doFind = () => {
        findAllLinks({
            ...params
        });
    };

    const onSubmit = async (data: any) => {
        const isUpdating = Boolean(singleLink);
        setLoadingState(isUpdating ? 'updating' : 'creating', true);
        const geoObject = countriesData.reduce((acc, { countryCode, url }) => {
            acc[countryCode] = url;
            return acc;
        }, {});
        const aliasString = randomAlias ? randomAlias : data?.alias;
        const payload: Record<string, any> = {
            title: data?.title,
            target: data?.target,
            alias: aliasString,
            workspace: currentWorkspace?._id,
            domain: '66059257bcb47c8944881927',
            password: data?.password,
            enableTracking: true,
            expiryDate: selectedDate,
            devices: {
                android: data?.android,
                ios: data?.ios
            },
            geo: geoObject,
            tags,
            utmParams: {
                source: data?.source,
                medium: data?.medium,
                campaign: data?.campaign,
                term: data?.term,
                content: data?.content
            }
        };
        if (tags && tags.length > 0) {
            payload.tags = tags;
        }

        try {
            if (isUpdating) {
                await updateLink({
                    payload,
                    id: singleLink?._id,
                    options: {
                        successMessage: 'Link updated successfully'
                    }
                });
            } else {
                await createLink({
                    payload,
                    options: {
                        successMessage: 'Link created successfully'
                    }
                });
            }
            form.reset();
            setLoadingState(isUpdating ? 'updating' : 'creating', false);
            dispatch(toggleDropdown());
            doFind();
            setPreview(null);
        } catch (err) {
            handleError({ error: err });
            setLoadingState(isUpdating ? 'updating' : 'creating', false);
        } finally {
            route.refresh();
        }
    };

    const handleArchive = async () => {
        setLoadingState('updating', true);
        const id = singleLink?._id;
        if (id) {
            try {
                await updateLinksArchived({ id }).unwrap();
                setLoadingState('updating', false);
                handleCloseModal();
                toast({
                    variant: 'default',
                    title: 'Link Updated'
                });
                findAllLinks({ archived: false });
            } catch (err) {
                const errorMessage = (err as any)?.data?.message || 'Failed. Please try again.';
                setLoadingState('updating', false);
                toast({
                    variant: 'destructive',
                    title: 'Error!',
                    description: errorMessage
                });
            }
        }
    };

    const { isSuccess } = deleteLinkResponse;
    const { isSuccess: duplicateIsSuccess } = duplicateLinkResponse;
    const { isSuccess: createLinkSuccess } = createLinkResponse;
    const { isSuccess: updateLinkSuccess } = updateLinkResponse;

    useEffect(() => {
        if (isSuccess) {
            doFind();
            handleCloseModal();
        }
        if (duplicateIsSuccess) {
            handleCloseModal();
            doFind();
        }
        if (createLinkSuccess) {
            doFind();
            handleCloseModal();
        }
        if (updateLinkSuccess) {
            doFind();
        }
    }, [isSuccess, duplicateIsSuccess, createLinkSuccess, updateLinkSuccess, findAllLinks]);
    const handleDeleteMany = async () => {
        if (ids) {
            setLoadingState('deleting', true);
            try {
                await deleteManyLinks({
                    payload: ids,
                    options: {
                        successMessage: `Successfully deleted`
                    }
                });
                doFind();
                setIds([]);
            } catch (error) {
                handleError({ error });
            } finally {
                setLoadingState('deleting', false);
            }
        }
    };

    const handleUpdateLink = (data: LinkNameSpace.Link) => {
        dispatch(toggleDropdown());
        setSingleLink(data);
        if (data) {
            setValue('target', data?.target);
            setValue('title', data?.title);
            setValue('medium', data?.utmParams?.medium ?? '');
            setValue('source', data?.utmParams?.source ?? '');
            setValue('campaign', data?.utmParams?.campaign ?? '');
            setValue('term', data?.utmParams?.term ?? '');
            setValue('content', data?.utmParams?.content ?? '');
            setValue('ios', data?.devices?.ios ?? '');
            setValue('android', data?.devices?.android ?? '');
            setDomain(data?.domain?.slug);
            setPreview(data?.metadata?.image || data?.metadata?.images[0]?.src);
        }
    };

    const onCloseModal = () => {
        dispatch(setDropdownState(false));
        setSingleLink(null);
        setValue('target', '');
        setPreview(null);
        handleCloseLoading();
    };

    return (
        <section className=" ">
            <div className="flex justify-between  items-center">
                <h1 className="font-semibold text-[#2B2829] text-xl">Link </h1>

                <Button
                    className="bg-primary-0 text-xs h-8 rounded "
                    onClick={() => {
                        dispatch(toggleDropdown());
                        setSingleLink(null);
                    }}
                >
                    Create Link
                </Button>
            </div>
            <section>
                <SearchFilterActions search={search} onSearchChange={onSearchChange} />
            </section>

            <LinkDataComponent
                isLoading={isLoading || isLoadingState}
                findAllLinksResponse={findAllLinksResponse}
                handleNavigate={handleNavigate}
                toggleSection={toggleSection}
                handleUpdateLink={handleUpdateLink}
                search={search}
                pagination={pagination}
                paginationActions={paginationActions}
                setSelectedIds={setIds}
                selectedIds={ids}
                handleDeleteMany={handleDeleteMany}
            />
            <ShadModal
                showModel={showDropdown}
                setShowModal={onCloseModal}
                className="h-[80%] max-w-screen-lg"
                onClose={onCloseModal}
                showCloseIcon
            >
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className=" h-screen relative">
                        {fetchMetaLoading && (
                            <div className="absolute left-0 right-0 bg-opacity-75 bg-white flex justify-center items-center h-full z-10">
                                <div className="relative bottom-20">
                                    <StarLoader />
                                </div>
                            </div>
                        )}
                        <div className="flex h-full">
                            <div className="  h-full w-full ">
                                <h1 className="font-semibold px-14 py-6   border-b ">
                                    {singleLink ? 'Edit Link' : 'Create a new link'}
                                </h1>
                                <div className=" w-full  h-full ">
                                    <div className=" overflow-y-auto h-[60%]">
                                        <CreateLinkForm
                                            handleSelect={handleSelect}
                                            form={form}
                                            preview={preview}
                                            title={watchTitle}
                                            description={watchDescription}
                                            setTags={setTags}
                                            tags={findAllTagsResponse?.data}
                                            watchLink={watchLink}
                                            findAllDomainsResponse={findAllDomainsResponse}
                                            singleLink={singleLink ?? undefined}
                                            setRandomAlias={setRandomAlias}
                                            randomAlias={randomAlias}
                                        />
                                    </div>
                                    <div className="px-14  border-t py-7">
                                        <LoadingButton
                                            type="submit"
                                            className="text-xs h-8 bg-primary-0 rounded w-full"
                                            loading={isLoadingState}
                                            disabled={!watchLink}
                                        >
                                            {singleLink ? 'Update Link' : '    Create Link'}
                                        </LoadingButton>
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
                                        watchLink={watchLink}
                                    />
                                    <UTMbuilder watchLink={watchLink} form={form} />
                                    <PasswordProtection form={form} watchLink={watchLink} />
                                    <LinkExpire
                                        handleDateChange={handleDateChange}
                                        selectedDate={selectedDate}
                                        watchLink={watchLink}
                                    />
                                    <IosTarget form={form} watchLink={watchLink} />
                                    <AndroidTarget form={form} watchLink={watchLink} />
                                    <GeoTargeting
                                        setCountriesData={setCountriesData}
                                        countriesData={countriesData}
                                        watchLink={watchLink}
                                        initialGeo={singleLink?.geo}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </Form>
            </ShadModal>
            <Modal onClose={handleCloseModal} isOpen={showSections} closeIcon={false} className="w-96 p-0 py-0">
                {modalType === 'deleteModal' && singleLink && (
                    <DeleteComponent
                        isLoadingState={isLoadingState}
                        handleDelete={() => handleDeleteLink(singleLink._id)}
                        handleClose={handleCloseModal}
                        description="Deleting this link will redirect it to the shtcut erro page and can not be undone."
                        title="link"
                    />
                )}
                {modalType === 'duplicateModal' && singleLink && (
                    <DuplicateComponent
                        isLoadingState={isLoadingState}
                        handleClose={handleCloseModal}
                        handleDuplicate={() => handleDuplicateLink(singleLink?._id)}
                    />
                )}
                {modalType === 'qrCodeModal' && singleLink && <QrCodeModal data={singleLink} qrCodeRef={qrCodeRef} />}
                {modalType === 'archiveModal' && singleLink && (
                    <ArchiveModal
                        data={singleLink}
                        handleArchive={handleArchive}
                        isLoadingState={isLoadingState}
                        handleClose={handleCloseModal}
                    />
                )}
                {modalType === 'shareModal' && singleLink && <ShareLinkModal data={singleLink} />}
            </Modal>
        </section>
    );
};

export default LinkComponent;
