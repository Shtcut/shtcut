'use client';

/* eslint-disable react-hooks/exhaustive-deps */
import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { Dict } from '@shtcut-ui/react';
import { usePagination } from '../usePagination';
import { useEffect, useState } from 'react';
import {
    useArchivedManyLinksMutation,
    useCreateLinkMutation,
    useDeleteLinkMutation,
    useDeleteManyLinksMutation,
    useLazyDuplicateLinkQuery,
    useLazyFetchMetadataQuery,
    useLazyFindAllLinksQuery,
    useLazyGetLinkQuery,
    useSubmitLinkPasswordMutation,
    useUpdateLinkMutation
} from '@shtcut/services/link';
import { FindAllLinkResresponseType, MetadataResponse } from '@shtcut/_shared/namespace/link';
import { debounce } from 'lodash';
import { UsePaginationActions, UsePaginationState } from '@shtcut/types/pagination';

interface UseLinkProps {
    id?: string;
    key?: string;
    callLinks?: boolean;
    search?: string;
    filter?: Dict;
    url?: string;
    all?: boolean;
}

export interface LinkParams {
    population?: string;
    search?: string;
    all?: boolean;
    filter?: Dict;
    page?: number;
    pageSize?: number;
}

interface UseLinkReturnsType {
    createLink: MutationTrigger<any>;
    deleteLink: MutationTrigger<any>;
    updateLink: MutationTrigger<any>;
    submitPassword: MutationTrigger<any>;
    deleteManyLinks: MutationTrigger<any>;
    archivedManyLinks: MutationTrigger<any>;
    fetchMetadata: Dict;
    findAllLinks: any;
    isLoading: boolean;
    findAllLinksResponse: FindAllLinkResresponseType | any;
    fetchMetaDataResponse: MetadataResponse | undefined;
    fetchMetaLoading: boolean;
    createLinkResponse: Dict;
    getLinkResponse: Dict;
    updateLinkResponse: Dict;
    duplicateLinkResponse: Dict;
    submitPasswordResponse: Dict;
    duplicate: any;
    deleteLinkResponse: Dict;
    deleteManyLinksResponse: Dict;
    archivedManyLinksResponse: Dict;
    pagination: UsePaginationState;
    isLoadingState: boolean;
    handleCloseLoading: () => void;
    setLoadingState: (key: 'duplicating' | 'updating' | 'deleting' | 'finding' | 'creating', value: boolean) => void;
    handleSearchChange: any;
    paginationActions: UsePaginationActions;
    params: LinkParams;
}

export const useLink = (props: UseLinkProps): UseLinkReturnsType => {
    const { callLinks = false, search, filter, id, url, all } = props;
    const { paginationActions, pagination } = usePagination();
    const [createLink, createLinkResponse] = useCreateLinkMutation();
    const [submitPassword, submitPasswordResponse] = useSubmitLinkPasswordMutation();
    const [updateLink, updateLinkResponse] = useUpdateLinkMutation();
    const [deleteLink, deleteLinkResponse] = useDeleteLinkMutation();
    const [deleteManyLinks, deleteManyLinksResponse] = useDeleteManyLinksMutation();
    const [archivedManyLinks, archivedManyLinksResponse] = useArchivedManyLinksMutation();
    const [findAllLinks, { isLoading, data: findAllLinksResponse }] = useLazyFindAllLinksQuery();
    const [duplicate, duplicateLinkResponse] = useLazyDuplicateLinkQuery();
    const [getLink, getLinkResponse] = useLazyGetLinkQuery();
    const [fetchMetadata, { data: fetchMetaDataResponse, isLoading: fetchMetaLoading }] = useLazyFetchMetadataQuery();
    const [debouncedSearch, setDebouncedSearch] = useState(search);

    const [loading, setLoading] = useState({
        duplicating: false,
        updating: false,
        deleting: false,
        finding: false,
        creating: false
    });
    const isLoadingState = Object.values(loading).some((state) => state);
    const setLoadingState = (key: keyof typeof loading, value: boolean) => {
        setLoading((prev) => ({ ...prev, [key]: value }));
    };

    const handleCloseLoading = () => {
        setLoading({
            duplicating: false,
            updating: false,
            deleting: false,
            finding: false,
            creating: false
        });
    };

    const params = {
        ...pagination,
        population: JSON.stringify([
            { path: 'user' },
            { path: 'domain', select: ['slug', 'name'] },
            { path: 'qrCode' },
            { path: 'tags' }
        ]),
        search: debouncedSearch,
        all,
        ...filter
    };
    const handleSearchChange = debounce((newSearch: string) => {
        setDebouncedSearch(newSearch);
    }, 500);

    useEffect(() => {
        if (callLinks) {
            findAllLinks({
                ...params
            });
        }
    }, [callLinks, debouncedSearch, findAllLinks, pagination, filter]);

    useEffect(() => {
        if (id) {
            getLink({
                id,
                population: params.population
            });
        }
    }, [id]);

    useEffect(() => {
        if (url) {
            fetchMetadata({
                url
            });
        }
    }, [url]);

    return {
        isLoading,
        createLink,
        updateLink,
        deleteManyLinks,
        deleteLink,
        findAllLinks,
        duplicate,
        submitPassword,
        archivedManyLinks,
        findAllLinksResponse,
        createLinkResponse,
        getLinkResponse,
        updateLinkResponse,
        duplicateLinkResponse,
        deleteLinkResponse,
        submitPasswordResponse,
        pagination,
        handleCloseLoading,
        isLoadingState,
        setLoadingState,
        handleSearchChange,
        fetchMetadata,
        fetchMetaDataResponse,
        deleteManyLinksResponse,
        archivedManyLinksResponse,
        fetchMetaLoading,
        paginationActions,

        params
    };
};
