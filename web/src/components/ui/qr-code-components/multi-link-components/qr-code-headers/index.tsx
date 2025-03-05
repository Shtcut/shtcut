import { logos } from '@shtcut/_shared/data';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import SocialNetworksCard from '../../social-media-component';
import LinksSection from '../link-sections';
import useGeneralState from '@shtcut/hooks/general-state';
import { setDescription, setTitle } from '@shtcut/redux/slices/selects';
import LinkHeader from '../../../../dashboard/link-header';
import { UseLinksManagerActions, UseLinksManagerState } from '@shtcut/types/link';

const QrCodeHeadersComponent = ({
    actions,
    linkState,
    defaultLinks
}: {
    actions: UseLinksManagerActions;
    linkState: UseLinksManagerState;
    defaultLinks?: Record<string, string>;
}) => {
    const { title, description, profileImage } = useGeneralState();
    const dispatch = useDispatch();
    const [show, setShow] = useState({
        header: true,
        links: true,
        socialNetworks: true
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setTitle(event.target.value));
    };

    const toggleSection = (section: keyof typeof show) => {
        setShow((prev) => ({
            ...prev,
            [section]: !prev[section]
        }));
    };
    console.log('linkss::', linkState?.links);
    return (
        <div>
            <LinkHeader
                label="Header"
                description="Enter Title and description"
                isVisible={show.header}
                toggleVisibility={() => toggleSection('header')}
                titleValue={title as string}
                descriptionValue={description as string}
                handleTitleChange={handleInputChange}
                handleDescriptionChange={(e) => dispatch(setDescription(e.target.value))}
                selectedImage={profileImage ?? ''}
                handleImageChange={actions?.handleImageChange}
            />

            {/* Links Section */}
            {linkState?.links.map((link, index) => (
                <LinksSection
                    key={link.id}
                    index={index + 1}
                    isVisible={linkState?.showSections[link.id]}
                    toggleVisibility={() => actions?.toggleSection(link.id)}
                    linkImage={link.image}
                    handleImageChange={(e) => actions?.handleLinkImageChange(link.id, e)}
                    onUpdateLink={(field, value) => actions?.updateLink(link.id, field, value)}
                    onRemove={() => actions?.removeLink(link.id)}
                    addLinkSection={actions?.addLink}
                    link={link}
                />
            ))}

            <SocialNetworksCard
                logos={logos}
                showSection={show.socialNetworks}
                defaultLinks={defaultLinks ?? {}}
                toggleSection={() => toggleSection('socialNetworks')}
            />
        </div>
    );
};

export default QrCodeHeadersComponent;
