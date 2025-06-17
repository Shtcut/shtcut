'use client';

import CreateLinkBioComponent from '@shtcut/components/ui/shorten-er/link-bios/create-link-bio';
import { useLinkBios } from '@shtcut/hooks/link-bio';
import useExtractId from '@shtcut/hooks/useExtractId';
import React from 'react';

const CreateLinkBioContainer = () => {
    const id = useExtractId();
    const { linkBioActions, linkBiosState } = useLinkBios({
        callLinkbio: true,
        id
    });

    return <CreateLinkBioComponent linkBiosState={linkBiosState} linkBioActions={linkBioActions} editId={id} />;
};

export default CreateLinkBioContainer;
