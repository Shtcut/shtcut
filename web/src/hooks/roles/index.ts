'use client';

import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { Dict } from '@shtcut-ui/react';
import { usePagination } from '../usePagination';
import { useEffect, useState } from 'react';
import { debounce } from 'lodash';

import {
    useCreateRolesMutation,
    useUpdateRolesMutation,
    useDeleteRolesMutation,
    useLazyFindRolesQuery,
    useLazyGetRolesQuery
} from '@shtcut/services/roles';
import { WorkspaceNameSpace } from '@shtcut/_shared/namespace/workspace';
import { UsePaginationState } from '@shtcut/types/pagination';
import { UseProps } from '@shtcut/types/types';

interface UseRoleProps extends UseProps {
    callRoles?: boolean;
    workspace?: string;
}

interface UseRoleReturnsType {
    createRole: MutationTrigger<any>;
    updateRole: MutationTrigger<any>;
    deleteRole: MutationTrigger<any>;
    findRoles: any;
    getRole: any;
    isLoading: boolean;
    handleDeleteRole: (id: string) => void;
    findRolesResponse: WorkspaceNameSpace.RolesResponse | undefined;
    createRoleResponse: Dict;
    updateRoleResponse: Dict;
    deleteRoleResponse: Dict;
    getRoleResponse: Dict;
    pagination: UsePaginationState;
    isLoadingState: boolean;
    params: any;
    setLoadingState: (key: 'creating' | 'updating' | 'deleting' | 'finding', value: boolean) => void;
    handleSearchChange: any;
    handleRefreshRoles: () => void;
}

export const useRole = (props: UseRoleProps): UseRoleReturnsType => {
    const { callRoles = false, search, filter, id, workspace } = props;
    const { pagination } = usePagination();
    const [createRole, createRoleResponse] = useCreateRolesMutation();
    const [updateRole, updateRoleResponse] = useUpdateRolesMutation();
    const [deleteRole, deleteRoleResponse] = useDeleteRolesMutation();
    const [findRoles, { isLoading, data: findRolesResponse }] = useLazyFindRolesQuery();
    const [getRole, { data: getRoleResponse }] = useLazyGetRolesQuery();

    const [debouncedSearch, setDebouncedSearch] = useState(search);
    const [loading, setLoading] = useState({
        creating: false,
        updating: false,
        deleting: false,
        finding: false
    });

    const isLoadingState = Object.values(loading).some((state) => state);
    const setLoadingState = (key: keyof typeof loading, value: boolean) => {
        setLoading((prev) => ({ ...prev, [key]: value }));
    };

    const params = {
        ...pagination,
        search: debouncedSearch,
        ...filter,
        population: JSON.stringify([{ path: 'permissions' }]),
        ...(workspace ? { workspace } : {})
    };

    const handleSearchChange = debounce((newSearch) => {
        setDebouncedSearch(newSearch);
    }, 500);

    // useEffect(() => {
    //     if (callRoles && !loaded) {
    //         findRoles({
    //             ...params
    //         });
    //         setLoaded(true);
    //     }
    // }, [callRoles, debouncedSearch, filter, findRoles, loaded, workspace]);

    useEffect(() => {
        if (callRoles) {
            findRoles(params);
        }
    }, [callRoles, debouncedSearch, filter, pagination.page, pagination.perPage, workspace]);

    useEffect(() => {
        if (id) {
            getRole({
                id
            });
        }
    }, [id]);

    const handleDeleteRole = (id: string) => {
        deleteRole({ id }).unwrap();
    };

    const handleRefreshRoles = () => {
        findRoles(params);
    };

    return {
        isLoading,
        createRole,
        updateRole,
        deleteRole,
        findRoles,
        getRole,
        handleRefreshRoles,
        findRolesResponse,
        createRoleResponse,
        updateRoleResponse,
        deleteRoleResponse,
        getRoleResponse,
        pagination,
        handleDeleteRole,
        isLoadingState,
        setLoadingState,
        handleSearchChange,
        params
    };
};
