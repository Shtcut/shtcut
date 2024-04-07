'use client';

import { LayoutBody, LinkForm } from '@shtcut/components';
import { DndContext } from '@dnd-kit/core';
import { LinkContainer } from '@shtcut/containers';
import { Dict } from '@shtcut-ui/react';
import { useAuth } from '@shtcut/hooks';
import { useLink } from '@shtcut/hooks/link';

const EditLink = () => {
    const { findAllLinksResponse: links, createLink, createLinkResponse } = useLink({ callLinks: true });
    const { isLoading, error, isSuccess } = createLinkResponse;
    const { authData } = useAuth();

    const handleSubmitForm = (value: Dict) => {
        const payload = {
            enableTracking: !!authData,
            ...value
        };
        if (value) {
            createLink({
                payload,
                options: {
                    successMessage: 'Link created successfully'
                }
            });
        }
    };
    return (
        <LayoutBody className="container">
            <LinkForm linkProps={{}} isLoading={isLoading} handleSubmitForm={handleSubmitForm} />
        </LayoutBody>
    );
};

export default EditLink;
