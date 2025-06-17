'use client';

import { getString } from '@shtcut/_shared/constant';
import StarLoader from '@shtcut/components/loader/star-loader';
import LinkBioAnalyticsComponent from '@shtcut/components/ui/shorten-er/link-bios/link-bio-analytics';
import { useLinkBios } from '@shtcut/hooks/link-bio';
import { useParams } from 'next/navigation';
import React from 'react';

const LinkBioAnalyticsContainer = () => {
    const { id } = useParams();
    const linkBioId = getString(id);
    const { linkBiosState } = useLinkBios({ id: linkBioId });

    if (linkBiosState?.linkBioAnalyticsLoading) {
        return (
            <div className="flex flex-1 h-[70vh] justify-center items-center">
                <StarLoader />
            </div>
        );
    }

    return <LinkBioAnalyticsComponent bioData={linkBiosState?.linkBioAnalyticsData} />;
};

export default LinkBioAnalyticsContainer;
