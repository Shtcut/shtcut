import { getString } from '@shtcut/_shared/constant';
import SingleLinkPreviewComponent from '@shtcut/components/dashboard/link/link-preview-component';
import StarLoader from '@shtcut/components/loader/star-loader';
import { useLink } from '@shtcut/hooks/link';
import { useParams } from 'next/navigation';
import React from 'react';

const SingleLinkPreviewContainer = () => {
    const { id } = useParams();
    const linkId = getString(id);
    const { linkAnalyticsLoading, linkAnalyticsData } = useLink({
        callLinks: true,
        all: true,
        id: linkId
    });

    if (linkAnalyticsLoading) {
        return (
            <div className="flex flex-1 h-[70vh] justify-center items-center">
                <StarLoader />
            </div>
        );
    }
    return <SingleLinkPreviewComponent linkAnalyticsData={linkAnalyticsData} />;
};

export default SingleLinkPreviewContainer;
