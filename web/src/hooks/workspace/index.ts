/* eslint-disable react-hooks/exhaustive-deps */
import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';
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
import { useAppSelector } from '@shtcut/redux/store';
import { selectFindAllWorkspaceData, selectWorkspaceData } from '@shtcut/redux/selectors/workspace';

interface UseWorkspaceProps {
    key?: string;
    callWorkspaces?: boolean;
    callSearchOneWorkspace?: boolean;
    search?: string;
    filter?: Dict;
}

interface UseWorkspaceReturnsType {
    createWorkspace: MutationTrigger<any>;
    deleteWorkspace: MutationTrigger<any>;
    updateWorkspace: MutationTrigger<any>;

    findAllWorkspacesResponse: WorkspaceNameSpace.Workspace[] | undefined;
    createWorkspaceResponse: Dict;
    searchOneWorkspaceResponse: WorkspaceNameSpace.Workspace | undefined;
    updateWorkspaceResponse: Dict;
    deleteWorkspaceResponse: Dict;
    pagination: Pagination;
}

export const useWorkspace = (props: UseWorkspaceProps): UseWorkspaceReturnsType => {
    const { callWorkspaces = false, callSearchOneWorkspace = false, search, filter } = props;

    const { paginate, pagination } = usePagination({ key: 'findAllWorkspaces' });
    const [createWorkspace, createWorkspaceResponse] = useCreateWorkspaceMutation();
    const [updateWorkspace, updateWorkspaceResponse] = useUpdateWorkspaceMutation();
    const [deleteWorkspace, deleteWorkspaceResponse] = useDeleteWorkspaceMutation();
    const [triggerWorkspaces] = useLazyFindAllWorkspacesQuery();
    const [triggerSearchOneWorkspace] = useLazySearchOneWorkspaceQuery();

    const params = {
        ...paginate,
        population: JSON.stringify(['user']),
        search,
        ...filter
    };

    const searchOneWorkspaceResponse = useAppSelector((state) => selectWorkspaceData(state, params));
    const findAllWorkspacesResponse = useAppSelector((state) => selectFindAllWorkspaceData(state, params));

    useEffect(() => {
        if (callWorkspaces) triggerWorkspaces(params);
    }, [callWorkspaces, triggerWorkspaces]);

    useEffect(() => {
        if (callSearchOneWorkspace) triggerSearchOneWorkspace(params);
    }, [callSearchOneWorkspace, triggerSearchOneWorkspace]);

    return {
        createWorkspace,
        updateWorkspace,
        deleteWorkspace,

        createWorkspaceResponse,
        updateWorkspaceResponse,
        searchOneWorkspaceResponse,
        deleteWorkspaceResponse,
        findAllWorkspacesResponse,

        pagination
    };
};
