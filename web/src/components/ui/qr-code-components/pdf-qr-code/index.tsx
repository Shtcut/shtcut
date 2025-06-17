import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Stepper from '@shtcut/components/stepper/horizontal-stepper';
import ActionQrCodeTab from '../website-component/actions-tab';
import QrCodeName from '../website-component/qr-code-name';
import PdfCardComponent from './pdf-upload-review';
import useGeneralState from '@shtcut/hooks/general-state';
import { setDescription, setTitle } from '@shtcut/redux/slices/selects';
import { linksTab } from '@shtcut/_shared/data';
import LinkHeader from '../../../dashboard/link-header';
import { UseLinksManagerActions } from '@shtcut/types/link';

const PdfQrCodeComponent = ({
    step,
    actions,
    isUploadingMainImage
}: {
    step: number;
    actions: UseLinksManagerActions;
    isUploadingMainImage: boolean;
}) => {
    const { title, description, profileImage } = useGeneralState();
    const dispatch = useDispatch();
    const [showSections, setShowSections] = useState({
        header: true,
        pdf: true,
        socialNetworks: true
    });
    const toggleSection = (section: keyof typeof showSections) => {
        setShowSections((prev) => ({
            ...prev,
            [section]: !prev[section]
        }));
    };
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setTitle(event.target.value));
    };

    return (
        <div>
            <section className="w-full h-24  bg-white rounded-[10px] shadow-sm border border-gray-100 ">
                <Stepper step={step} />
            </section>
            {step === 1 && (
                <section>
                    <LinkHeader
                        label="Header"
                        description="Enter Title and description"
                        isVisible={showSections.header}
                        toggleVisibility={() => toggleSection('header')}
                        titleValue={title as string}
                        descriptionValue={description as string}
                        handleTitleChange={handleInputChange}
                        handleDescriptionChange={(e) => dispatch(setDescription(e.target.value))}
                        selectedImage={profileImage?.preview ?? ''}
                        handleImageChange={actions?.handleImageChange}
                        isUploadingMainImage={isUploadingMainImage}
                    />
                    <PdfCardComponent toggleVisibility={() => toggleSection('pdf')} isVisible={showSections.pdf} />
                </section>
            )}

            {step === 2 && <ActionQrCodeTab initialTabs={linksTab} />}
            {step === 3 && (
                <section className=" mt-4 shadow-sm border border-gray-100  rounded-[10px] gap-2">
                    <QrCodeName />
                </section>
            )}
        </div>
    );
};

export default PdfQrCodeComponent;
