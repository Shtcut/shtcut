import { FetchArgs } from '@reduxjs/toolkit/query';
import { api } from '@shtcut/_shared/api/app.api';
import { ACL, POST } from '@shtcut/_shared/constant';
import { loggedInUserTag } from '../tags';
import { Dict } from '@shtcut-ui/react';

export const workspaceApi = api.injectEndpoints({
    endpoints: (builder) => ({
        findWorkspace: builder.query({
            query: () => ACL.loggedInUserUrl as unknown as FetchArgs,
            providesTags: [loggedInUserTag]
        }),
        createWorkspace: builder.mutation<Record<'data', any>, Dict>({
            query: ({ payload }) => {
                return {
                    url: ACL.loggedInUserUrl,
                    method: POST,
                    body: payload
                };
            },
            invalidatesTags: [loggedInUserTag]
        })
    })
});

export const {} = workspaceApi;
