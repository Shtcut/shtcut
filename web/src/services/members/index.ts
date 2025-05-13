import { api } from '@shtcut/_shared/api/app.api';
import { ACL, DELETE, POST } from '@shtcut/_shared/constant';
import { members } from '../tags';
import { WorkspaceNameSpace } from '@shtcut/_shared/namespace/workspace';
import { InviteResponse } from '@shtcut/types/workspace';
import { QueryArgs } from '@shtcut/_shared/namespace';
import { FetchArgs } from '@reduxjs/toolkit/query';

export const memberInviteApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createInvite: builder.mutation<InviteResponse, WorkspaceNameSpace.InvitePayload>({
            query: (payload) => {
                return {
                    url: ACL.invitation,
                    method: POST,
                    body: payload
                };
            },
            invalidatesTags: [members]
        }),
        findMembers: builder.query<any, QueryArgs>({
            query: (params: QueryArgs) =>
                ({
                    url: ACL.invitation,
                    params
                }) as unknown as FetchArgs,
            providesTags: [members]
        }),
        deleteMember: builder.mutation<any, { id: string }>({
            query: ({ id }) => ({
                url: `${ACL.invitation}/${id}`,
                method: DELETE
            }),
            invalidatesTags: [members]
        })
    })
});

export const {
    useCreateInviteMutation,
    useLazyFindMembersQuery,
    useDeleteMemberMutation,
    endpoints: { createInvite, findMembers, deleteMember }
} = memberInviteApi;
