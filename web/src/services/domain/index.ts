import { FetchArgs } from '@reduxjs/toolkit/query';
import { api } from '@shtcut/_shared/api/app.api';
import { DELETE, POST, PUT, SHTNER } from '@shtcut/_shared/constant';
import { domainTag } from '../tags';
import { Dict } from '@shtcut-ui/react';
import { ApiResponse, QueryArgs } from '@shtcut/_shared/namespace';
import { DomainNameSpace } from '@shtcut/_shared/namespace/domain';

export const domainApi = api.injectEndpoints({
    endpoints: (builder) => ({
        findAllDomains: builder.query<ApiResponse<DomainNameSpace.Domain[]>, QueryArgs>({
            query: (params: QueryArgs) =>
                ({
                    url: SHTNER.domains,
                    params
                }) as unknown as FetchArgs,
            providesTags: [domainTag]
        }),
        getDomain: builder.query<ApiResponse<DomainNameSpace.Domain>, Record<string, any>>({
            query: (params: Record<string, string>) =>
                ({
                    url: `${SHTNER.domains}/${params?.id}`,
                    params
                }) as unknown as FetchArgs,
            providesTags: [domainTag]
        }),
        createDomain: builder.mutation<ApiResponse<DomainNameSpace.Domain>, DomainNameSpace.DomainRequest>({
            query: ({ payload }) => {
                return {
                    url: SHTNER.domains,
                    method: POST,
                    body: payload
                };
            },
            invalidatesTags: [domainTag]
        }),
        updateDomain: builder.mutation<ApiResponse<DomainNameSpace.Domain>, DomainNameSpace.DomainRequest>({
            query: ({ payload }) => {
                return {
                    url: `${SHTNER.domains}/${payload?.id}`,
                    method: PUT,
                    body: payload
                };
            },
            invalidatesTags: [domainTag]
        }),
        deleteDomain: builder.mutation<Dict,  DomainNameSpace.DomainRequest>({
            query: ({ payload }) => {
                return {
                    url: `${SHTNER.domains}/${payload?.id}`,
                    method: DELETE
                };
            },
            invalidatesTags: [domainTag]
        })
    })
});

export const {
    useCreateDomainMutation,
    useLazyFindAllDomainsQuery,
    useLazyGetDomainQuery,
    useUpdateDomainMutation,
    useDeleteDomainMutation,
    endpoints: { createDomain, findAllDomains, getDomain, updateDomain, deleteDomain }
} = domainApi;
