import { FetchArgs } from '@reduxjs/toolkit/query';
import { api } from '@shtcut/_shared/api/app.api';
import { ACL, DELETE, POST, PUT } from '@shtcut/_shared/constant';
import { workspaceTag } from '../tags';
import { Dict } from '@shtcut-ui/react';
import { WorkspaceNameSpace } from '@shtcut/_shared/namespace/workspace';
import { QueryArgs } from '@shtcut/_shared/namespace';

export const workspaceApi = api.injectEndpoints({
    endpoints: (builder) => ({
        findAllWorkspace: builder.query({
            query: (params: Dict) => ACL.workspace as unknown as FetchArgs,
            providesTags: [workspaceTag]
        }),
        searchOneWorkspace: builder.query({
            query: (params: QueryArgs) =>
                ({
                    url: `${ACL.workspace}/search/one`,
                    params
                }) as unknown as FetchArgs,
            providesTags: [workspaceTag]
        }),
        getWorkspace: builder.query({
            query: (id: string) => `${ACL.workspace}/${id}` as unknown as FetchArgs,
            providesTags: [workspaceTag]
        }),
        createWorkspace: builder.mutation<Dict, WorkspaceNameSpace.WorkspaceRequest>({
            query: ({ payload }) => {
                return {
                    url: ACL.workspace,
                    method: POST,
                    body: payload
                };
            },
            invalidatesTags: [workspaceTag]
        }),
        updateWorkspace: builder.mutation<Dict, WorkspaceNameSpace.WorkspaceRequest>({
            query: ({ payload }) => {
                return {
                    url: `${ACL.workspace}/${payload?.id}`,
                    method: PUT,
                    body: payload
                };
            },
            invalidatesTags: [workspaceTag]
        }),
        deleteWorkspace: builder.mutation<Dict, WorkspaceNameSpace.WorkspaceRequest>({
            query: ({ payload }) => {
                return {
                    url: `${ACL.workspace}/${payload?.id}`,
                    method: DELETE
                };
            },
            invalidatesTags: [workspaceTag]
        })
    })
});

export const {
    useCreateWorkspaceMutation,
    useLazyFindAllWorkspaceQuery,
    useSearchOneWorkspaceQuery,
    useGetWorkspaceQuery,
    useUpdateWorkspaceMutation,
    useDeleteWorkspaceMutation,
    endpoints: { createWorkspace, findAllWorkspace, searchOneWorkspace, updateWorkspace, deleteWorkspace }
} = workspaceApi;
