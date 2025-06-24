import { api } from '@shtcut/_shared/api/app.api';
import { SHTNER } from '@shtcut/_shared/constant';

import { ApiResponse, QueryArgs } from '@shtcut/_shared/namespace';
import { linkBio, qrCodes } from '../tags';

export const getLinkQrCodeDataApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getLinkBio: builder.query<ApiResponse<any | undefined>, QueryArgs & { slug: string }>({
            query: ({ slug }) => ({
                url: `${SHTNER.linksBio}/search/one?slug=${slug}`,
                params: {
                    population: JSON.stringify([{ path: 'profileImage' }, { path: 'links.image' }, { path: 'file' }])
                }
            }),
            providesTags: [linkBio]
        }),

        getQRCodeLink: builder.query<ApiResponse<any | undefined>, QueryArgs & { slug: string }>({
            query: ({ slug }) => ({
                url: `${SHTNER.qrCode}/search/one?slug=${slug}`,
                params: {
                    population: JSON.stringify([{ path: 'profileImage' }, { path: 'links.image' }, { path: 'file' }])
                }
            }),
            providesTags: [qrCodes]
        })
    })
});

export const {
    useLazyGetLinkBioQuery,
    useLazyGetQRCodeLinkQuery,
    endpoints: { getLinkBio, getQRCodeLink }
} = getLinkQrCodeDataApi;
