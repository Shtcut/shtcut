import React from 'react';
import PdfFrameComponent from '../../ui/qr-code-components/pdf-qr-code/pdf-frame-step-1';
import FrameComponents from '../../ui/qr-code-components/frames-component';
import GeneralTemplate from '../../general-template';
import useGeneralState from '@shtcut/hooks/general-state';

interface ComponentType {
    switchTab?: string;
    links?: any;
    selectedTab?: number;
    isUploadingMainImage?: boolean;
}

const PreviewPhone = ({ switchTab, links, selectedTab, isUploadingMainImage }: ComponentType) => {
    const { step, bgColor } = useGeneralState();

    return (
        <div className="border w-[250px] h-[550px] border-[#A6A6A4] p-[1px]   mx-auto rounded-[37px]">
            <div
                style={{ backgroundColor: bgColor }}
                className={`flex  border-4 relative border-black flex-col   w-full h-full justify-center  items-center rounded-[37px] `}
            >
                <div className="bg-black absolute top-0 w-12 h-4 flex justify-end items-center px-2 mt-2 rounded-full">
                    <div className="w-1 h-1 bg-slate-500 rounded-full" />
                </div>

                <div className="flex-1 w-full h-full">
                    {/* Website Tab */}
                    {switchTab === 'website' && (
                        <div className="p-4 w-full h-full flex justify-center items-center">
                            <FrameComponents />
                        </div>
                    )}

                    {/* Multi Tab */}
                    {switchTab === 'multi-link' && (
                        <div
                            className={`w-full h-full ${selectedTab && selectedTab > 0 ? ' flex justify-center items-center' : ''} `}
                        >
                            {step === 1 && <GeneralTemplate links={links ?? []} />}
                            {step === 2 && selectedTab === 0 && <GeneralTemplate links={links ?? []} />}
                            {typeof step === 'number' && step > 1 && (
                                <div className="flex justify-center items-center h-full">
                                    <FrameComponents />
                                </div>
                            )}
                        </div>
                    )}

                    {/* PDF Tab */}
                    {switchTab === 'pdf' && (
                        <div className={`w-full h-full ${step === 1 ? 'p-4' : 'flex justify-center'}`}>
                            {step === 1 && <PdfFrameComponent />}
                            {typeof step === 'number' && step > 1 && <FrameComponents />}
                        </div>
                    )}

                    {/* VCard Tab */}
                    {switchTab === 'vcard' && (
                        <div
                            className={`w-full h-full ${selectedTab && selectedTab > 0 ? 'flex justify-center items-center' : ''}`}
                        >
                            {step === 1 && <GeneralTemplate />}
                            {step === 2 && selectedTab === 0 && <GeneralTemplate />}
                            {typeof step === 'number' && step > 1 && (
                                <div className="flex justify-center items-center h-full">
                                    <FrameComponents />
                                </div>
                            )}
                        </div>
                    )}

                    {/* Edit Link Tab */}
                    {switchTab === 'edit-link' && (
                        <div className="w-full h-full">
                            {/* {step === 1 && <LinkBioFrameComponent linksBio={linksBio ?? []} />} */}
                            <GeneralTemplate links={links ?? []} isUploadingMainImage={isUploadingMainImage} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PreviewPhone;
