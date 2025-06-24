'use client';

import React, { useEffect } from 'react';
import { useParams, usePathname } from 'next/navigation';
import LinkBioDynamicComponent from '@shtcut/components/ui/shorten-er/link-bios/dynamic-link-bio';
import { useGetLink } from '@shtcut/hooks/get-link';

const LinkBioDynamicContainer = () => {
    const { linkActions, linkState } = useGetLink();
    const { slug } = useParams() as { slug: string };
    const pathname = usePathname();

    useEffect(() => {
        if (!slug) return;

        if (pathname.includes('/link-bio')) {
            linkActions.getLinkBio({ slug });
        } else if (pathname.includes('/qr-code')) {
            linkActions.getLinkQrCode({ slug });
        }
    }, [slug, pathname, linkActions]);

    const data = pathname.includes('/link-bio') ? linkState.getLinkData : linkState.getQrcodeLink;

    const isLoading = linkState.isLoading || linkState?.qrCodeLoading;

    console.log('data', data);

    return <LinkBioDynamicComponent isLoading={isLoading} linkData={data} />;
};

export default LinkBioDynamicContainer;
