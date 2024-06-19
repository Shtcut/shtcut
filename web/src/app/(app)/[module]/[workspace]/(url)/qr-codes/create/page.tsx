'use client';

import { LayoutBody, LinkForm } from '@shtcut/components';
import { Button, Dict } from '@shtcut-ui/react';
import { useAuth } from '@shtcut/hooks';
import { useLink } from '@shtcut/hooks/link';
import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { QRCodeForm } from '@shtcut/components/form/qr-code';

const CreateQRCode = () => {
    const params = useParams();
    const router = useRouter();

    const { module, workspace } = params;

    const { authData } = useAuth();
    const workspaceObject = authData?.workspaces.find(({ slug }) => slug === workspace);

    const { createLink, createLinkResponse } = useLink({ callLinks: false });
    const { isLoading, isSuccess } = createLinkResponse;

    const handleSubmitForm = (value: Dict) => {
        const payload = {
            enableTracking: !!authData,
            workspace: workspaceObject?._id,
            user: authData?._id,
            ...value,
            tags: []
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

    if (isSuccess) {
        router.push(`/${module}/${workspace}/links`);
    }

    return (
        <LayoutBody className="container bg-white">
            <QRCodeForm />
        </LayoutBody>
    );
};

export default CreateQRCode;
