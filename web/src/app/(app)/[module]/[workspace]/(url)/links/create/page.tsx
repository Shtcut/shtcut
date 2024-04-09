'use client';

import { LayoutBody, LinkForm } from '@shtcut/components';
import { Button, Dict } from '@shtcut-ui/react';
import { useAuth } from '@shtcut/hooks';
import { useLink } from '@shtcut/hooks/link';
import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

const CreateLink = () => {
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
            tags: [],
        };
        console.log('payload::', payload);
        if (value) {
            createLink({
                payload,
                options: {
                    successMessage: 'Link created successfully'
                }
            });
        }
    };

    // if (isSuccess) {
    //     router.push(`/${module}/${workspace}/links`);
    // }

    // useEffect(() => {
    //     if (isSuccess) {
    //         router.push(`/${module}/${workspace}/links`);
    //     }
    // }, [isSuccess, module, router, workspace]);

    return (
        <LayoutBody className="container bg-white">
            <div className="flex items-center justify-between space-y-2">
                <h1 className="text-2xl font-bold tracking-light md:text-3xl">Create Link</h1>
                {/* <div className="flex items-center space-x-2">
                    <Button>LinkBio</Button>
                </div> */}
            </div>
            <LinkForm linkProps={{}} isLoading={false} handleSubmitForm={handleSubmitForm} />
        </LayoutBody>
    );
};

export default CreateLink;
