'use client';

import { LayoutBody, LinkForm } from '@shtcut/components';
import { DndContext } from '@dnd-kit/core';
import { LinkContainer } from '@shtcut/containers';
import { Dict } from '@shtcut-ui/react';
import { useAuth } from '@shtcut/hooks';
import { useLink } from '@shtcut/hooks/link';
import { useParams, useRouter } from 'next/navigation';

const EditLink = () => {
    const params = useParams();
    const router = useRouter();

    const { id, module, workspace } = params;

    const { updateLinkResponse, updateLink, getLinkResponse } = useLink({ id: id as string });
    const { isLoading: isUpdating, isSuccess } = updateLinkResponse;

    const { data, isLoading: isFetching } = getLinkResponse;

    const { data: link } = data || {};

    const { authData } = useAuth();

    const handleSubmitForm = (value: Dict) => {
        const payload = {
            id,
            enableTracking: !!authData,
            ...value
        };
        console.log('payload::', payload);
        if (value) {
            updateLink({
                payload,
                options: {
                    successMessage: 'Update created successfully'
                }
            });
        }
    };

    if (isSuccess) {
        router.push(`/${module}/${workspace}/links`);
    }

    return (
        <LayoutBody className="container">
            <LinkForm
                id={id as string}
                linkProps={{}}
                isLoading={isUpdating || isFetching}
                handleSubmitForm={handleSubmitForm}
                initialValues={link}
            />
        </LayoutBody>
    );
};

export default EditLink;
