'use client';
import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { Dict } from '@shtcut-ui/react';
import { WorkspaceNameSpace } from '@shtcut/_shared/namespace/workspace';
import { usePagination } from '../usePagination';
import {
    useCreateWorkspaceMutation,
    useDeleteWorkspaceMutation,
    useLazyFindAllWorkspacesQuery,
    useLazyGetWorkspaceQuery,
    useLazySearchOneWorkspaceQuery,
    useLazySwitchWorkspaceQuery,
    useUpdateWorkspaceMutation
} from '@shtcut/services/workspace';
import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@shtcut/redux/store';
import { selectFindAllWorkspaceData, selectWorkspaceData } from '@shtcut/redux/selectors/workspace';
import { UsePaginationActions, UsePaginationState } from '@shtcut/types/pagination';
import { setActiveWorkspace } from '@shtcut/redux/slices/workspace';
import { ApiResponse } from '@shtcut/_shared/namespace';
import { getString } from '@shtcut/_shared/constant';

interface UseWorkspaceProps {
    key?: string;
    callWorkspaces?: boolean;
    callSearchOneWorkspace?: boolean;
    callSwitchWorkspace?: boolean;
    search?: string;
    filter?: Dict;
    switchWorkspaceId?: string;
    switchWorkspaceLoading?: boolean;
    id?: string;
}

interface UseWorkspaceReturnsType {
    createWorkspace: MutationTrigger<any>;
    deleteWorkspace: MutationTrigger<any>;
    updateWorkspace: MutationTrigger<any>;
    triggerSwitchWorkspace: (id: string) => void;
    triggerWorkspaces: any;
    // findAllWorkspacesResponse: WorkspaceNameSpace.Workspace[] | undefined;
    findAllWorkspacesResponse: ApiResponse<any> | undefined;
    createWorkspaceResponse: Dict;
    searchOneWorkspaceResponse: WorkspaceNameSpace.Workspace | undefined;
    switchWorkspaceResponse: Dict | undefined;
    switchWorkspaceLoading: boolean;
    updateWorkspaceResponse: Dict;
    deleteWorkspaceResponse: Dict;
    pagination: UsePaginationState;
    paginationActions: UsePaginationActions;
    findAllWorkspacesLoading: boolean;
    getWorkspaceLoading: boolean;
    getWorkSpaceData: any;
}

export const useWorkspace = (props: UseWorkspaceProps): UseWorkspaceReturnsType => {
    const {
        callWorkspaces = false,
        callSearchOneWorkspace = false,
        search,
        filter,
        switchWorkspaceId,
        callSwitchWorkspace = false,
        id
    } = props;
    const dispatch = useAppDispatch();
    const [showLoading, setShowLoading] = useState(false);
    const { pagination, paginationActions } = usePagination();
    const [createWorkspace, createWorkspaceResponse] = useCreateWorkspaceMutation();
    const [updateWorkspace, updateWorkspaceResponse] = useUpdateWorkspaceMutation();
    const [deleteWorkspace, deleteWorkspaceResponse] = useDeleteWorkspaceMutation();
    const [triggerWorkspaces, { isLoading: findAllWorkspacesLoading }] = useLazyFindAllWorkspacesQuery();
    const [triggerSearchOneWorkspace] = useLazySearchOneWorkspaceQuery();
    const [triggerSwitchWorkspace, { data: switchWorkspaceResponse, isLoading: switchWorkspaceLoading }] =
        useLazySwitchWorkspaceQuery();
    const [getWorkspaceByIdTrigger, { data: getWorkSpaceData, isLoading: getWorkspaceLoading }] =
        useLazyGetWorkspaceQuery();
    const params = useMemo(
        () => ({
            ...pagination,
            population: JSON.stringify([{ path: 'user' }, { path: 'members' }]),
            search,
            ...filter
        }),
        [pagination, search, filter]
    );

    const searchOneWorkspaceResponse = useAppSelector((state) => selectWorkspaceData(state, params));

    const findAllWorkspacesResponse = useAppSelector((state) => selectFindAllWorkspaceData(state, params));

    useEffect(() => {
        if (callWorkspaces) triggerWorkspaces(params);
    }, [callWorkspaces, triggerWorkspaces, JSON.stringify(params)]);

    useEffect(() => {
        if (callSearchOneWorkspace) triggerSearchOneWorkspace(params);
    }, [callSearchOneWorkspace, triggerSearchOneWorkspace]);

    useEffect(() => {
        if (callSwitchWorkspace && switchWorkspaceId) {
            triggerSwitchWorkspace(switchWorkspaceId);
        }
    }, [callSwitchWorkspace, switchWorkspaceId, triggerSwitchWorkspace]);

    useEffect(() => {
        if (id) {
            const idString = getString(id);
            getWorkspaceByIdTrigger({
                id: idString,
                population: JSON.stringify([{ path: 'members' }])
            });
        }
    }, [id]);

    useEffect(() => {
        if (switchWorkspaceResponse?.meta?.success) {
            triggerWorkspaces({ ...params });
            dispatch(setActiveWorkspace(switchWorkspaceResponse?.data));
            setShowLoading(true);
            sessionStorage.setItem('pendingWorkspace', switchWorkspaceResponse?.data?.slug);
            window.location.href = `/url/${switchWorkspaceResponse?.data?.slug}/links`;
        }
    }, [switchWorkspaceResponse?.meta?.success]);

    useEffect(() => {
        const pendingWorkspace = sessionStorage.getItem('pendingWorkspace');
        if (pendingWorkspace) {
            setShowLoading(true);
            sessionStorage.removeItem('pendingWorkspace');
        }

        const handleLoad = () => {
            requestAnimationFrame(() => {
                setShowLoading(false);
            });
        };

        if (document.readyState === 'complete') {
            handleLoad();
        } else {
            window.addEventListener('load', handleLoad);
            return () => window.removeEventListener('load', handleLoad);
        }
    }, []);

    return {
        createWorkspace,
        updateWorkspace,
        deleteWorkspace,
        triggerSwitchWorkspace,
        triggerWorkspaces,
        createWorkspaceResponse,
        updateWorkspaceResponse,
        searchOneWorkspaceResponse,
        switchWorkspaceResponse,
        deleteWorkspaceResponse,
        findAllWorkspacesResponse,
        switchWorkspaceLoading: showLoading || switchWorkspaceLoading,
        pagination,
        paginationActions,
        findAllWorkspacesLoading,
        getWorkspaceLoading,
        getWorkSpaceData
    };
};
