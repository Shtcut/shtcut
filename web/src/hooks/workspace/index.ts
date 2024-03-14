import { MutationHooks, MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { Dict } from '@shtcut-ui/react';
import { Pagination } from '@shtcut/_shared/namespace';
import { WorkspaceNameSpace } from '@shtcut/_shared/namespace/workspace';
import { usePagination } from '../usePagination';
import {
    useCreateWorkspaceMutation,
    useDeleteWorkspaceMutation,
    useLazyFindAllWorkspacesQuery,
    useLazySearchOneWorkspaceQuery,
    useUpdateWorkspaceMutation
} from '@shtcut/services/workspace';
import { useEffect } from 'react';

interface UseWorkspaceProps {
    key?: string;
    callWorkspaces?: boolean;
    callGetWorkspace?: boolean;
    search?: string;
    filter?: Dict;
}

interface UseWorkspaceReturnsType {
    createWorkspace: MutationTrigger<any>;
    deleteWorkspace: MutationTrigger<any>;
    updateWorkspace: MutationTrigger<any>;

    // findAllWorkspacesResponse: WorkspaceNameSpace.Workspace[];
    // createWorkspaceResponse: WorkspaceNameSpace.Workspace;
    // searchOneWorkspaceResponse: WorkspaceNameSpace.Workspace;
    // updateWorkspaceResponse: WorkspaceNameSpace.Workspace;
    // deleteWorkspaceResponse: Dict;
    // pagination: Pagination;
}

export const useWorkspace = (props: UseWorkspaceProps): UseWorkspaceReturnsType => {
    const { callWorkspaces = false, callGetWorkspace = false, search, filter } = props;

    const { paginate, pagination } = usePagination({ key: 'findAllWorkspaces' });
    const [createWorkspace, createWorkspaceResponse] = useCreateWorkspaceMutation<MutationHooks<any>>();
    const [updateWorkspace, updateWorkspaceResponse] = useUpdateWorkspaceMutation<MutationHooks<any>>();
    const [deleteWorkspace, deleteWorkspaceResponse] = useDeleteWorkspaceMutation<MutationHooks<any>>();
    const [triggerWorkspace, findAllWorkspaces] = useLazyFindAllWorkspacesQuery();
    const [triggerSearchOneWorkspace, searchOneWorkspace] = useLazySearchOneWorkspaceQuery();

    const params = {
        ...paginate,
        population: JSON.stringify(['user']),
        search,
        ...filter
    };

    useEffect(() => {
        if (callWorkspaces) triggerWorkspace(params);
    }, [callWorkspaces, triggerWorkspace]);

    useEffect(() => {
        if (callGetWorkspace) triggerSearchOneWorkspace(params);
    }, [callGetWorkspace, triggerSearchOneWorkspace]);

    return {
        createWorkspace,
        updateWorkspace,
        deleteWorkspace
    };
};
