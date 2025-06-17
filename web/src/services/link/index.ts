import { FetchArgs } from '@reduxjs/toolkit/query';
import { api } from '@shtcut/_shared/api/app.api';
import { DELETE, GET, POST, PUT, SHTNER } from '@shtcut/_shared/constant';
import { linkTag } from '../tags';
import { Dict } from '@shtcut-ui/react';
import { LinkNameSpace, MetadataResponse } from '@shtcut/_shared/namespace/link';
import { ApiResponse, QueryArgs } from '@shtcut/_shared/namespace';

export const linkApi = api.injectEndpoints({
    endpoints: (builder) => ({
        findAllLinks: builder.query<ApiResponse<LinkNameSpace.Link[]>, QueryArgs>({
            query: (params) => ({
                url: SHTNER.links,
                params
            }),

            providesTags: (result) =>
                result?.data
                    ? [
                          // Tag for each individual link
                          ...result.data.map(({ id }) => ({ type: 'Link', id })),
                          // Tag for the entire list
                          { type: 'Link', id: 'LIST' }
                      ]
                    : // Fallback if no data
                      [{ type: 'Link', id: 'LIST' }]
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
        updateLink: builder.mutation<
            ApiResponse<LinkNameSpace.Link>,
            { payload?: LinkNameSpace.LinkRequest; id: string }
        >({
            query: ({ payload, id }) => {
                return {
                    url: `${SHTNER.links}/${id}`,
                    method: PUT,
                    body: payload
                };
            },
            invalidatesTags: [linkTag]
        }),
        updateArchivedLink: builder.mutation<ApiResponse<LinkNameSpace.Link>, { id: string }>({
            query: ({ id }) => {
                return {
                    url: `${SHTNER.links}/${id}`,
                    method: PUT,
                    body: { archived: true }
                };
            },
            invalidatesTags: [linkTag]
        }),
        deleteLink: builder.mutation<Dict, { payload: { id: string } }>({
            query: ({ payload }) => ({
                url: `${SHTNER.links}/${payload.id}`,
                method: DELETE
            }),
            // Invalidates both the deleted item and the full list
            invalidatesTags: (result, error, { payload }) => [
                { type: 'Link', id: payload.id }, // Specific deleted item
                { type: 'Link', id: 'LIST' }
            ]
        }),
        deleteManyLinks: builder.mutation<Dict, { payload: { ids: string[] } }>({
            query: ({ payload }) => ({
                url: `${SHTNER.links}/delete/many`,
                method: DELETE,
                body: {
                    ids: payload
                }
            }),
            invalidatesTags: [linkTag]
        }),
        archivedManyLinks: builder.mutation<Dict, { payload: { ids: string[] } }>({
            query: ({ payload }) => ({
                url: `${SHTNER.links}/toggle-archive/many`,
                method: POST,
                body: {
                    ids: payload
                }
            }),
            invalidatesTags: [linkTag]
        }),
        duplicateLink: builder.query<Dict, { payload: { id: string } }>({
            query: ({ payload }) => ({
                url: `${SHTNER.links}/${payload.id}/duplicate`,
                method: GET
            }),
            providesTags: [linkTag]
        }),
        fetchMetadata: builder.query<MetadataResponse, { url: string }>({
            query: ({ url }) => ({
                url: `${SHTNER.links}/metadata`,
                method: GET,
                params: {
                    url,
                    apiKey: SHTNER.metaKey
                }
            }),
            providesTags: [linkTag]
        }),
        visitLink: builder.query<Dict, { domain: string; alias: string }>({
            query: ({ domain, alias }) => ({
                url: `${SHTNER.links}/visit/${domain}/${alias}`,
                method: GET
            }),
            providesTags: [linkTag]
        }),
        submitLinkPassword: builder.mutation<ApiResponse<LinkNameSpace.Link>, { alias: string; password: string }>({
            query: ({ alias, password }) => ({
                url: `${SHTNER.links}/${alias}/password`,
                method: POST,
                body: { password }
            }),
            invalidatesTags: [linkTag]
        }),
        getLinkAnalytics: builder.query<any, { id: string; population?: string }>({
            query: (params) =>
                ({
                    url: `${SHTNER.links}/${params.id}/analytics`,
                    params
                }) as unknown as FetchArgs,
            providesTags: [linkTag]
        })
    })
});

export const {
    useCreateLinkMutation,
    useLazyFindAllLinksQuery,
    useLazyGetLinkQuery,
    useUpdateLinkMutation,
    useDeleteLinkMutation,
    useDeleteManyLinksMutation,
    useLazyDuplicateLinkQuery,
    useLazyFetchMetadataQuery,
    useGetLinkQuery,
    useUpdateArchivedLinkMutation,
    useSubmitLinkPasswordMutation,
    useArchivedManyLinksMutation,
    useLazyGetLinkAnalyticsQuery,
    endpoints: {
        createLink,
        findAllLinks,
        getLink,
        updateLink,
        deleteLink,
        deleteManyLinks,
        duplicateLink,
        fetchMetadata,
        visitLink,
        updateArchivedLink,
        submitLinkPassword,
        archivedManyLinks,
        getLinkAnalytics
    }
} = linkApi;
