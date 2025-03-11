'use client';

import StarLoader from '@shtcut/components/loader/star-loader';
import LinkBioAnalyticsComponent from '@shtcut/components/ui/shorten-er/link-bios/link-bio-analytics';
import { useLinkBios } from '@shtcut/hooks/link-bio';
import { useParams } from 'next/navigation';
import React from 'react';

const LinkBioAnalyticsContainer = () => {
    const { slug } = useParams();
    const { linkBiosState } = useLinkBios({ callLinkbio: true });

    const findLinkBioId = linkBiosState?.findAllLinkBioResponse?.data?.find((bio) => bio.slug === slug)?._id;

    const { linkBiosState: bioData } = useLinkBios({ id: findLinkBioId });

    if (!bioData?.getSingleLinkBio || bioData?.getBioLoading || linkBiosState?.findLinkBioLoading) {
        return (
            <div className="flex flex-1 h-[70vh] justify-center items-center">
                <StarLoader />
            </div>
        );
    }

    return <LinkBioAnalyticsComponent bioData={bioData.getSingleLinkBio} />;
};

export default LinkBioAnalyticsContainer;
