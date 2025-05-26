'use client';

import { useLazyGetLinkBioQuery, useLazyGetQRCodeLinkQuery } from '@shtcut/services/get-links';
import { useCallback, useMemo } from 'react';

interface UseTagsReturnsType {
    linkState: {
        isLoading: boolean;
        getLinkData: any;
        getQrcodeLink: any;
        qrCodeLoading: boolean;
    };
    linkActions: {
        getLinkQrCode: (args: { slug: string }) => void;
        getLinkBio: (args: { slug: string }) => void;
    };
}

export const useGetLink = (): UseTagsReturnsType => {
    const [triggerLinkBio, { data: getLinkResponse, isLoading }] = useLazyGetLinkBioQuery();
    const [triggerLinkQrCode, { data: getLinkQrcodeResponse, isLoading: qrCodeLoading }] = useLazyGetQRCodeLinkQuery();

    const getLinkData = getLinkResponse?.data ?? undefined;
    const getQrcodeLink = getLinkQrcodeResponse?.data ?? undefined;

    // Memoized actions so reference doesn't change on every render
    const getLinkBio = useCallback(({ slug }: { slug: string }) => triggerLinkBio({ slug }), [triggerLinkBio]);

    const getLinkQrCode = useCallback(({ slug }: { slug: string }) => triggerLinkQrCode({ slug }), [triggerLinkQrCode]);

    return {
        linkState: useMemo(
            () => ({
                isLoading,
                getLinkData,
                getQrcodeLink,
                qrCodeLoading
            }),
            [isLoading, getLinkData, getQrcodeLink, qrCodeLoading]
        ),

        linkActions: useMemo(
            () => ({
                getLinkBio,
                getLinkQrCode
            }),
            [getLinkBio, getLinkQrCode]
        )
    };
};
