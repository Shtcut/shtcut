'use client';

import { Dict } from '@shtcut-ui/react';
import {
    useCreateTagsMutation,
    useDeleteTagsMutation,
    useLazyFindAllTagsQuery,
    useUpdateTagsMutation
} from '@shtcut/services/tags/index';
import { CreateTagPayload, TagsApiResponse, TagsApiResponseObject } from '@shtcut/types/tags';
import { useEffect, useState } from 'react';
import { usePagination } from '../usePagination';
import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { UseProps } from '@shtcut/types/types';
import { UsePaginationActions, UsePaginationState } from '@shtcut/types/pagination';

interface UseTagsReturnsType {
    createTags: (payload: CreateTagPayload) => Promise<TagsApiResponseObject>;
    updateTags: any;
    findAllTags: any;
    isLoading: boolean;
    findAllTagsResponse: TagsApiResponse | undefined;
    deleteTag: MutationTrigger<any>;
    createTagsResponse: TagsApiResponseObject | undefined;
    isLoadingState: boolean;
    setLoadingState: (key: 'creating' | 'deleting' | 'updating', value: boolean) => void;
    deleteTagResponse: Dict;
    updateTagsResponse: TagsApiResponse | undefined;
    paginationActions: UsePaginationActions;
    pagination: UsePaginationState;
}

export const useTags = (props: UseProps): UseTagsReturnsType => {
    const { call = false, search = '', filter, all } = props;
    const { paginationActions, pagination } = usePagination();
    const [createTagsTrigger, { data: createTagsResponse }] = useCreateTagsMutation();
    const [findAllTags, { isLoading, data: findAllTagsResponse }] = useLazyFindAllTagsQuery();
    const [deleteTag, deleteTagResponse] = useDeleteTagsMutation();
    const [updateTagsTrigger, { data: updateTagsResponse }] = useUpdateTagsMutation();

    const [debouncedSearch, setDebouncedSearch] = useState(search);
    const [loading, setLoading] = useState({
        creating: false,
        deleting: false,
        updating: false
    });
    const isLoadingState = Object.values(loading).some((state) => state);
    const setLoadingState = (key: keyof typeof loading, value: boolean) => {
        setLoading((prev) => ({ ...prev, [key]: value }));
    };
    const params = {
        ...pagination,
        search: debouncedSearch,
        all,
        ...filter
    };
    const createTags = async (payload: CreateTagPayload): Promise<TagsApiResponseObject> => {
        const result = await createTagsTrigger(payload).unwrap();
        return result;
    };

    const updateTags = async (id: string, payload: Partial<CreateTagPayload>): Promise<TagsApiResponse> => {
        const result = await updateTagsTrigger({ id, payload }).unwrap();
        return result;
    };

    useEffect(() => {
        if (call) {
            findAllTags({
                ...params
            });
        }
    }, [call, debouncedSearch, filter, findAllTags, pagination]);

    return {
        isLoading,
        findAllTagsResponse,
        createTags,
        updateTags,
        createTagsResponse,
        updateTagsResponse,
        isLoadingState,
        setLoadingState,
        findAllTags,
        deleteTag,
        deleteTagResponse,
        paginationActions,
        pagination
    };
};
