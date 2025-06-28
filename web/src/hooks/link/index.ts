'use client';

/* eslint-disable react-hooks/exhaustive-deps */
import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { Dict } from '@shtcut-ui/react';
import { usePagination } from '../usePagination';
import { useEffect, useMemo, useState } from 'react';
import {
    useArchivedManyLinksMutation,
    useCreateLinkMutation,
    useDeleteLinkMutation,
    useDeleteManyLinksMutation,
    useLazyDuplicateLinkQuery,
    useLazyFetchLinkMetadataQuery,
    useLazyFindAllLinksQuery,
    useLazyGetLinkAnalyticsQuery,
    useLazyGetLinkQuery,
    useSubmitLinkPasswordMutation,
    useUpdateLinkMutation
} from '@shtcut/services/link';
import {
    FindAllLinkAnalyticsResresponseType,
    FindAllLinkResresponseType,
    MetadataResponse
} from '@shtcut/_shared/namespace/link';
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
    fetchLinkMetadata: any;
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
    linkAnalyticsLoading: boolean;
    linkAnalyticsData: FindAllLinkAnalyticsResresponseType;
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
    const [getLinkAnalytics, { data: linkAnalyticsData, isLoading: linkAnalyticsLoading }] =
        useLazyGetLinkAnalyticsQuery();
    const [fetchLinkMetadata, { data: fetchMetaDataResponse, isLoading: fetchMetaLoading }] =
        useLazyFetchLinkMetadataQuery();
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

    const params = useMemo(
        () => ({
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
        }),
        [pagination.page, pagination.perPage, debouncedSearch, all, JSON.stringify(filter)]
    );

    const handleSearchChange = debounce((newSearch: string) => {
        setDebouncedSearch(newSearch);
    }, 500);

    useEffect(() => {
        if (callLinks) {
            findAllLinks(params);
        }
    }, [callLinks, params, findAllLinks]);

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
            fetchLinkMetadata({
                apiKey: 'ShtcutAppKey',
                url: encodeURIComponent(url)
            });
        }
    }, [url]);

    useEffect(() => {
        if (id) {
            getLinkAnalytics({
                id
            });
        }
    }, [id]);

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
        fetchLinkMetadata,
        fetchMetaDataResponse,
        deleteManyLinksResponse,
        archivedManyLinksResponse,
        fetchMetaLoading,
        paginationActions,
        linkAnalyticsLoading,
        linkAnalyticsData,
        params
    };
};
