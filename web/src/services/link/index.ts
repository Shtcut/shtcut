import { FetchArgs } from '@reduxjs/toolkit/query';
import { api } from '@shtcut/_shared/api/app.api';
import { DELETE, POST, PUT, SHTNER } from '@shtcut/_shared/constant';
import { linkTag } from '../tags';
import { Dict } from '@shtcut-ui/react';
import { LinkNameSpace } from '@shtcut/_shared/namespace/link';
import { ApiResponse, QueryArgs } from '@shtcut/_shared/namespace';
import { findAllWorkspaces } from '../workspace';

export const linkApi = api.injectEndpoints({
    endpoints: (builder) => ({
        findAllLinks: builder.query<ApiResponse<LinkNameSpace.Link[]>, QueryArgs>({
            query: (params: QueryArgs) =>
                ({
                    url: SHTNER.links,
                    params
                }) as unknown as FetchArgs,
            providesTags: [linkTag]
        }),
        getLink: builder.query<ApiResponse<LinkNameSpace.Link>, Record<string, any>>({
            query: (params: Record<string, string>) =>
                ({
                    url: `${SHTNER.links}/${params?.id}`,
                    params
                }) as unknown as FetchArgs,
            providesTags: [linkTag]
        }),
        createLink: builder.mutation<ApiResponse<LinkNameSpace.Link>, LinkNameSpace.LinkRequest>({
            query: ({ payload }) => {
                return {
                    url: SHTNER.links,
                    method: POST,
                    body: payload
                };
            },
            invalidatesTags: [linkTag]
        }),
        updateLink: builder.mutation<ApiResponse<LinkNameSpace.Link>, LinkNameSpace.LinkRequest>({
            query: ({ payload }) => {
                return {
                    url: `${SHTNER.links}/${payload?.id}`,
                    method: PUT,
                    body: payload
                };
            },
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data) {
                        const { workspace } = data.data;
                        dispatch(
                            findAllWorkspaces.initiate({
                                workspace,
                                population: JSON.stringify([
                                    { path: 'user' },
                                    { path: 'domain', select: ['slug', 'name'] },
                                    { path: 'qrCode' }
                                ])
                            })
                        );
                    }
                } catch (_) {}
            },
            invalidatesTags: [linkTag]
        }),
        deleteLink: builder.mutation<Dict, LinkNameSpace.LinkRequest>({
            query: ({ payload }) => {
                return {
                    url: `${SHTNER.links}/${payload?.id}`,
                    method: DELETE
                };
            },
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data) {
                        const { workspace } = data.data;
                        dispatch(
                            findAllWorkspaces.initiate({
                                workspace,
                                population: JSON.stringify([
                                    { path: 'user' },
                                    { path: 'domain', select: ['slug', 'name'] },
                                    { path: 'qrCode' }
                                ])
                            })
                        );
                    }
                } catch (_) {}
            },
            invalidatesTags: [linkTag]
        })
    })
});

export const {
    useCreateLinkMutation,
    useLazyFindAllLinksQuery,
    useLazyGetLinkQuery,
    useUpdateLinkMutation,
    useDeleteLinkMutation,
    endpoints: { createLink, findAllLinks, getLink, updateLink, deleteLink }
} = linkApi;
