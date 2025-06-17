'use client';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import QrCodeCompanyInfo from '../qr-code-company-info';
import { logos } from '@shtcut/_shared/data';
import SocialNetworksCard from '../../social-media-component';
import useGeneralState from '@shtcut/hooks/general-state';
import { setDescription, setTitle } from '@shtcut/redux/slices/selects';
import LinkHeader from '../../../../dashboard/link-header';
import { useLinksManager } from '@shtcut/hooks/use-links-manager';
import ContactInfo from '../../../../dashboard/contact-info';
const PersonalInfoVCard = ({ defaultLinks }: { defaultLinks?: Record<string, string> }) => {
    const { title, description, profileImage } = useGeneralState();
    const dispatch = useDispatch();
    const [showSections, setShowSections] = useState({
        header: true,
        contact: true,
        company: true,
        socialNetworks: true
    });
    const { state, actions } = useLinksManager();

    const toggleSection = (section: keyof typeof showSections) => {
        setShowSections((prev) => ({
            ...prev,
            [section]: !prev[section]
        }));
    };
    return (
        <div>
            <LinkHeader
                label="Basic Information"
                description="Enter Name and title"
                isVisible={state?.showSections[0]}
                toggleVisibility={() => actions?.toggleSection(0)}
                titleValue={title as string}
                descriptionValue={description as string}
                handleTitleChange={(e) => dispatch(setTitle(e.target.value))}
                handleDescriptionChange={(e) => dispatch(setDescription(e.target.value))}
                selectedImage={profileImage.preview as string}
                handleImageChange={actions?.handleImageChange}
                isUploadingMainImage={state?.isUploadingMainImage}
            />
            <ContactInfo isVisible={showSections.contact} toggleVisibility={() => toggleSection('contact')} />
            <QrCodeCompanyInfo isVisible={showSections.company} toggleVisibility={() => toggleSection('company')} />
            <SocialNetworksCard
                logos={logos}
                showSection={showSections.socialNetworks}
                toggleSection={() => toggleSection('socialNetworks')}
                defaultLinks={defaultLinks ?? {}}
            />
        </div>
    );
};

export default PersonalInfoVCard;
