import { useCreateInviteMutation, useDeleteMemberMutation, useLazyFindMembersQuery } from '@shtcut/services/members';
import { useEffect, useState } from 'react';
import { usePagination } from '../usePagination';
import { debounce } from 'lodash';
import { Dict } from '@shtcut-ui/react';
import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { UsePaginationState } from '@shtcut/types/pagination';
interface UseMembersProps {
    id?: string;
    callMembers?: boolean;
    search?: string;
    filter?: Dict;
}

interface UseMembersReturnType {
    createInvite: MutationTrigger<any>;
    createInviteResponse: Dict;
    deleteMembers: MutationTrigger<any>;
    deleteRoleResponse: Dict;
    findMembers: any;
    findMembersResponse: any;
    isLoading: boolean;
    handleDeleteMember: (id: string) => void;
    pagination: UsePaginationState;
    isLoadingState: boolean;
    setLoadingState: (key: 'creating' | 'updating' | 'deleting' | 'finding', value: boolean) => void;
    handleSearchChange: (newSearch: string) => void;
    handleRefreshMembers: () => void;
}

export const useMembers = (props: UseMembersProps): UseMembersReturnType => {
    const { callMembers = false, search, filter, id } = props;
    const { pagination } = usePagination();
    const [createInvite, createInviteResponse] = useCreateInviteMutation();
    const [deleteMembers, deleteRoleResponse] = useDeleteMemberMutation();
    const [findMembers, { isLoading, data: findMembersResponse }] = useLazyFindMembersQuery();

    const [debouncedSearch, setDebouncedSearch] = useState(search);
    const [loading, setLoading] = useState({
        creating: false,
        updating: false,
        deleting: false,
        finding: false
    });
    const [loaded, setLoaded] = useState(false);
    const isLoadingState = Object.values(loading).some((state) => state);
    const setLoadingState = (key: keyof typeof loading, value: boolean) => {
        setLoading((prev) => ({ ...prev, [key]: value }));
    };
    const params = {
        population: JSON.stringify([{ path: 'id' }]),
        ...pagination,
        search: debouncedSearch,
        ...filter
    };

    const handleSearchChange = debounce((newSearch) => {
        setDebouncedSearch(newSearch);
    }, 500);
    useEffect(() => {
        if (callMembers && !loaded) {
            findMembers({
                ...params
            });
            setLoaded(true);
        }
    }, [callMembers, debouncedSearch, filter, findMembers, loaded]);

    const handleDeleteMember = (id: string) => {
        deleteMembers({ id });
    };

    const handleRefreshMembers = () => {
        const updatedParams = {
            population: JSON.stringify([{ path: 'id' }]),
            ...pagination,
            search: debouncedSearch,
            ...filter
        };
        findMembers(updatedParams);
    };

    return {
        isLoading,
        deleteMembers,
        findMembers,
        findMembersResponse,
        createInvite,
        createInviteResponse,
        deleteRoleResponse,
        pagination,
        handleDeleteMember,
        isLoadingState,
        setLoadingState,
        handleSearchChange,
        handleRefreshMembers
    };
};
