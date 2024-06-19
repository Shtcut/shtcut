import { FetchArgs } from '@reduxjs/toolkit/query';
import { api } from '@shtcut/_shared/api/app.api';
import { ACL, DELETE, POST, PUT } from '@shtcut/_shared/constant';
import { workspaceTag } from '../tags';
import { Dict } from '@shtcut-ui/react';
import { WorkspaceNameSpace } from '@shtcut/_shared/namespace/workspace';
import { ApiResponse, QueryArgs } from '@shtcut/_shared/namespace';

export const workspaceApi = api.injectEndpoints({
    endpoints: (builder) => ({
        findAllWorkspaces: builder.query<ApiResponse<WorkspaceNameSpace.Workspace[]>, QueryArgs>({
            query: (params: QueryArgs) =>
                ({
                    url: ACL.workspace,
                    params
                }) as unknown as FetchArgs,
            providesTags: [workspaceTag]
        }),
        searchOneWorkspace: builder.query<ApiResponse<WorkspaceNameSpace.Workspace>, QueryArgs>({
            query: (params: QueryArgs) =>
                ({
                    url: `${ACL.workspace}/search/one`,
                    params
                }) as unknown as FetchArgs,
            providesTags: [workspaceTag]
        }),
        getWorkspace: builder.query<ApiResponse<WorkspaceNameSpace.Workspace>, string>({
            query: (id: string) => `${ACL.workspace}/${id}` as unknown as FetchArgs,
            providesTags: [workspaceTag]
        }),
        createWorkspace: builder.mutation<
            ApiResponse<WorkspaceNameSpace.Workspace>,
            WorkspaceNameSpace.WorkspaceRequest
        >({
            query: ({ payload }) => {
                return {
                    url: ACL.workspace,
                    method: POST,
                    body: payload
                };
            },
            invalidatesTags: [workspaceTag]
        }),
        updateWorkspace: builder.mutation<
            ApiResponse<WorkspaceNameSpace.Workspace>,
            WorkspaceNameSpace.WorkspaceRequest
        >({
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
    useLazyFindAllWorkspacesQuery,
    useLazySearchOneWorkspaceQuery,
    useGetWorkspaceQuery,
    useUpdateWorkspaceMutation,
    useDeleteWorkspaceMutation,
    endpoints: { createWorkspace, findAllWorkspaces, searchOneWorkspace, getWorkspace, updateWorkspace, deleteWorkspace }
} = workspaceApi;
