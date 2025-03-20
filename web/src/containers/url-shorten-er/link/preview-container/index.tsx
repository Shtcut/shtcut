import SingleLinkPreviewComponent from '@shtcut/components/dashboard/link/link-preview-component';
import StarLoader from '@shtcut/components/loader/star-loader';
import { useLink } from '@shtcut/hooks/link';
import { useParams } from 'next/navigation';
import React from 'react';

const SingleLinkPreviewContainer = () => {
    const { alias } = useParams();
    const { findAllLinksResponse, isLoading } = useLink({
        callLinks: true,
        all: true
    });

    const findLinkByIdData =
        findAllLinksResponse && findAllLinksResponse?.data?.find((link_alias) => link_alias.alias === alias)?._id;

    const { getLinkResponse } = useLink({ id: findLinkByIdData });

    if (isLoading) {
        return (
            <div className="flex flex-1 h-[70vh] justify-center items-center">
                <StarLoader />
            </div>
        );
    }
    return <SingleLinkPreviewComponent getLinkResponse={getLinkResponse?.currentData?.data} />;
};

export default SingleLinkPreviewContainer;
