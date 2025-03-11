import { Tabs, TabsContent, TabsList, TabsTrigger, toast } from '@shtcut-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { QrCodeInterface } from '@shtcut/types/types';
import {
    selectQrCodeStyle,
    setEyeRadius,
    setQrCodeLogo,
    setQrCodePresetColor,
    setQrTitle,
    setSelectedFrame
} from '@shtcut/redux/slices/qr-code';
import MultiLinksComponent from '../multi-link-components';
import PdfQrCodeComponent from '../pdf-qr-code';
import VCardComponent from '../vcard-component';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import WebsiteComponent from '../website-component';
import PreviewPhone from '../../../dashboard/preview-phone';
import { useForm } from 'react-hook-form';
import useGeneralState from '@shtcut/hooks/general-state';
import useQrCodeState from '@shtcut/hooks/qrcode/index.';
import {
    setBgColor,
    setBorderColor,
    setBtnColor,
    setCompany,
    setContactInfo,
    setDescription,
    setPresetColor,
    setSelectedTemplate,
    setTitle,
    setUrl
} from '@shtcut/redux/slices/selects';
import { useLinksManager } from '@shtcut/hooks/use-links-manager';
import { useAppDispatch } from '@shtcut/redux/store';
import { useQrCode } from '@shtcut/hooks/qr-code';
import { handleError, handleSuccess } from '@shtcut/_shared';
import { tabData } from '@shtcut/_shared/data/mockdata';
import QrCodeSuccessModal from './components/success-modal';
import StarLoader from '@shtcut/components/loader/star-loader';
import { NEXT_PUBLIC_URL } from '@shtcut/_shared/constant';
import BtnActions from '@shtcut/components/btn-actions';

const QRCodeCreateComponent = ({
    saveModal,
    setSaveModal,
    editId,
    getQrCodeData,
    isLoadingGetQrCode
}: QrCodeInterface) => {
    const params = useParams();
    const dispatch = useAppDispatch();
    const {
        step,
        bgColor,
        borderColor,
        presetColor,
        btnColor,
        handleNextStep,
        handlePrevStep,
        title,
        selectedTab,
        description,
        profileImage,
        activeTemplateString,
        socialMediaLinks,
        companyInfo,
        contactInfo,
        fileInfo,
        urlScan
    } = useGeneralState();
    const { state: linkState, actions } = useLinksManager(getQrCodeData?.links);
    const { state, action } = useQrCodeState();
    const router = useRouter();
    const getParams = useSearchParams();
    const tabParams = getParams.get('tabs');
    const initialTab = tabParams ? (tabParams as string) : 'website';
    const [switchTab, setSwitchTab] = useState<string>(initialTab);
    const qrCodeRef = useRef(null);
    const { qrActions, qrState } = useQrCode({ call: true });
    const { workspace } = params;
    const { register, handleSubmit, watch, setValue } = useForm({
        mode: 'onChange',
        defaultValues: {
            url: ''
        }
    });

    const urlValue = watch('url');
    const handleTabChange = (tabs: string) => {
        if (editId) {
            return;
        } else {
            setSwitchTab(tabs);
            action.generalReset();
        }
    };
    const handleClose = () => {
        setSaveModal(false);
        action.generalReset();
        router.push(`/url/${workspace}/qr-codes`);
    };

    const handleSave = async () => {
        const commonQrCodeData = {
            colors: {
                presetColor,
                borderColor: borderColor,
                background: bgColor
            },
            frame: state?.selectedFrame,
            qrStyle: state?.qrStyle,
            eyeRadius: state?.eyeRadius,
            logo: state?.logo,
            name: state?.title
        };
        const webPayload = {
            type: 'website',
            bgColor,
            url: urlValue,
            qrCode: commonQrCodeData,
            title: state?.title
        };
        const multiLinkPayload = {
            type: 'multi-link',
            title,
            description,
            profileImage,
            links: linkState?.links,
            bgColor,
            socialMedia: socialMediaLinks,
            template: {
                template: activeTemplateString,
                presetColor,
                btnColor
            },
            qrCode: commonQrCodeData
        };
        const vCardPayload = {
            type: 'vcard',
            title,
            description,
            profileImage,
            contacts: {
                phone: contactInfo.phoneNumber,
                email: contactInfo.email,
                website: contactInfo.websiteUrl
            },
            address: {
                street: contactInfo.streetAddress,
                country: contactInfo.country,
                city: contactInfo.city,
                zipCode: contactInfo.zipCode,
                state: contactInfo.state
            },
            company: companyInfo,
            socialMedia: socialMediaLinks,
            bgColor,
            qrCode: commonQrCodeData,
            template: {
                template: activeTemplateString,
                presetColor,
                btnColor
            }
        };
        const pdfPayload = {
            type: 'pdf',
            title,
            description,
            profileImage,
            file: 'id',
            bgColor,
            qrCode: commonQrCodeData
        };
        let payload;

        switch (switchTab) {
            case 'website':
                payload = webPayload;
                break;
            case 'multi-link':
                payload = multiLinkPayload;
                break;
            case 'vcard':
                payload = vCardPayload;
                break;
            case 'pdf':
                payload = pdfPayload;
                break;
            default:
                return;
        }
        if (step === 1) {
            if (switchTab === 'website' && !urlValue) {
                return toast({
                    variant: 'destructive',
                    title: 'Missing URL',
                    description: 'Please provide a URL before proceeding.'
                });
            }

            if (switchTab !== 'website' && !title) {
                return toast({
                    variant: 'destructive',
                    title: 'Missing Title',
                    description: 'Please provide a title before proceeding.'
                });
            }

            if (switchTab === 'multi-link') {
                const hasValidLink = linkState?.links?.every(
                    (link) => link.label.trim() !== '' && link.url.trim() !== ''
                );
                if (!hasValidLink) {
                    return toast({
                        variant: 'destructive',
                        title: 'Invalid Links',
                        description: 'Please ensure all links have a title and URL filled in.'
                    });
                }
            }

            if (switchTab === 'pdf' && !fileInfo) {
                return toast({
                    variant: 'destructive',
                    title: 'No File',
                    description: 'Please upload a file before proceeding.'
                });
            }
            handleNextStep();
            return;
        }
        if (step === 2) {
            handleNextStep();
            return;
        }
        if (step === 3) {
            if (!state?.title)
                return toast({
                    variant: 'destructive',
                    title: 'Missing Title',
                    description: 'Please provide a Qr code title before proceeding.'
                });
            qrActions.setLoadingState('creating', true);
            try {
                let res;
                if (editId) {
                    res = await qrActions.updateQrCode({ payload, id: editId });
                } else {
                    res = await qrActions.createqrCode(payload);
                }
                handleSuccess({
                    response: res
                });

                const newUrl =
                    switchTab === 'website'
                        ? urlValue
                        : `${NEXT_PUBLIC_URL}/qr-code/${res?.data?.data?.slug || res?.data?.slug}`;
                dispatch(setUrl(newUrl));
                setSaveModal(true);
            } catch (error) {
                handleError({ error });
            } finally {
                qrActions.setLoadingState('creating', false);
            }
        }
    };

    useEffect(() => {
        if (editId && getQrCodeData) {
            const newTab = getQrCodeData?.type;
            setSwitchTab(newTab);
            handleTabChange(newTab);
        }
    }, [editId, getQrCodeData?.type]);

    useEffect(() => {
        if (switchTab) {
            router.push(`?tabs=${switchTab}`, {
                shallow: true
            } as any);
        }
    }, [switchTab]);

    useEffect(() => {
        if (editId && getQrCodeData) {
            const addressData = getQrCodeData.address || {};
            const companyData = getQrCodeData.company || {};
            const contactData = getQrCodeData.contacts || {};
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
            dispatch(
                setCompany({
                    name: companyData.name || '',
                    department: companyData.department || ''
                })
            );
            dispatch(setQrTitle(getQrCodeData?.qrCode?.name || getQrCodeData?.title));
            dispatch(setTitle(getQrCodeData?.title));
            dispatch(setBgColor(getQrCodeData?.bgColor));
            dispatch(setBorderColor(getQrCodeData?.borderColor || getQrCodeData?.qrCode?.colors?.borderColor));
            dispatch(setDescription(getQrCodeData?.description));
            dispatch(setBtnColor(getQrCodeData?.template?.btnColor));
            dispatch(
                setPresetColor(getQrCodeData?.qrCode?.colors?.presetColor || getQrCodeData?.template?.presetColor)
            );
            dispatch(
                setQrCodePresetColor(
                    (getQrCodeData?.qrCode?.colors?.presetColor || getQrCodeData?.template?.presetColor) ?? ''
                )
            );
            dispatch(setQrCodeLogo(getQrCodeData?.qrCode?.logo ?? ''));
            dispatch(setSelectedTemplate(getQrCodeData?.template?.template));
            dispatch(setEyeRadius(getQrCodeData?.qrCode?.eyeRadius));
            dispatch(setSelectedFrame(getQrCodeData?.qrCode?.frame));
            dispatch(selectQrCodeStyle(getQrCodeData?.qrCode?.qrStyle));
            setValue('url', getQrCodeData?.url);
        }
    }, [editId, getQrCodeData, dispatch, setValue, getQrCodeData?.url]);

    const onSubmit = (data: { url: string }) => {
        console.log('Title:', data.url);
    };
    if (isLoadingGetQrCode)
        return (
            <div className="flex justify-center items-center h-screen">
                <StarLoader />
            </div>
        );

    const handleReset = (value: string) => {
        if (editId) {
            return;
        } else {
            setSwitchTab(value);
        }
    };

    return (
        <div className=" ">
            <BtnActions
                handlePrevStep={handlePrevStep}
                isLoading={qrState.isLoadingState}
                step={step}
                handleSave={handleSave}
                handleClose={handleClose}
                title="Create QR"
            />
            <div className="flex mt-[22px] gap-7">
                <div className="w-full">
                    <Tabs
                        defaultValue={getQrCodeData && getQrCodeData?.type ? getQrCodeData?.type : switchTab}
                        className="w-full"
                        onValueChange={(value) => handleReset(value)}
                    >
                        <TabsList className="block border-none bg-transparent gap-0 m-0 p-0">
                            <section className="bg-white shadow-sm border border-gray-100 rounded-[10px] p-[23px]">
                                <h2 className="font-medium mb-[22px] text-[#151314]">Select QR Code Type</h2>
                                <section className="w-full gap-x-[10px] flex flex-1">
                                    {tabData.map((tab) => (
                                        <TabsTrigger
                                            key={tab.value}
                                            className="border shadow-none text-black/60 h-9 w-32 data-[state=active]:text-primary-0 data-[state=active]:border-primary-0 text-xs flex items-center justify-center gap-x-2 data-[state=active]:shadow-none"
                                            value={tab.value}
                                            onClick={() => handleTabChange(tab.value)}
                                            disabled={editId ? tab.value !== getQrCodeData?.type : undefined}
                                        >
                                            {tab.icon}
                                            {tab.label}
                                        </TabsTrigger>
                                    ))}
                                </section>
                            </section>
                        </TabsList>
                        <form className="mt-32" onSubmit={handleSubmit(onSubmit)}>
                            <TabsContent value="website">
                                <WebsiteComponent step={Number(step)} switchTab={switchTab} register={register} />
                            </TabsContent>
                            <TabsContent value="multi-link">
                                <MultiLinksComponent
                                    step={step as number}
                                    actions={actions}
                                    linkState={linkState}
                                    defaultLinks={getQrCodeData?.socialMedia}
                                />
                            </TabsContent>
                            <TabsContent value="pdf">
                                <PdfQrCodeComponent step={Number(step)} actions={actions} />
                            </TabsContent>
                            <TabsContent value="vcard">
                                <VCardComponent step={Number(step)} defaultLinks={getQrCodeData?.socialMedia} />
                            </TabsContent>
                        </form>
                    </Tabs>
                </div>
                <div className="bg-white w-1/2 sticky top-40 shadow-sm border border-gray-100 rounded-[10px] h-[640px] flex flex-col  justify-center">
                    <h2 className=" px-6 font-semibold ">Preview</h2>
                    <PreviewPhone switchTab={switchTab} links={linkState?.links} selectedTab={Number(selectedTab)} />
                </div>
            </div>
            <QrCodeSuccessModal
                handleClose={handleClose}
                saveModal={saveModal ?? false}
                state={state}
                qrCodeRef={qrCodeRef}
                urlScan={urlScan}
            />
        </div>
    );
};

export default QRCodeCreateComponent;
