'use client';

import { useEffect, useState } from 'react';
import { usePagination } from '../usePagination';
import {
    useCreateLinkBioMutation,
    useDeleteLinkBioMutation,
    useLazyFindAllLinkBioQuery,
    useLazyGetBioQuery,
    useLazyGetLinkBioQuery,
    useUpdateLinkBioMutation
} from '@shtcut/services/link-bios';
import { LinkBioActions, LinkBioDataPayload, LinkBioStateType, UseLinkBioProps } from '@shtcut/types/link-bio';
import { debounce } from 'lodash';

interface UseTagsReturnsType {
    linkBiosState: LinkBioStateType;
    linkBioActions: LinkBioActions;
}

export const useLinkBios = (props: UseLinkBioProps): UseTagsReturnsType => {
    const { callLinkbio = false, search = '', filter, all, id } = props;
    const { paginationActions, pagination } = usePagination();
    const [loaded, setLoaded] = useState(false);
    const [getLinkBio, { data: getLinkBioResponse, isLoading: getLinkBioLoading }] = useLazyGetLinkBioQuery();
    const [getBio, { data: getBioResponse, isLoading: getBioLoading }] = useLazyGetBioQuery();
    const [createLinkBioTrigger, { data }] = useCreateLinkBioMutation();
    const [findAllLinkBio, { isLoading: findLinkBioLoading, data: findAllLinkBioResponse }] =
        useLazyFindAllLinkBioQuery();
    const [updateLinkBio, updateLinkBioRes] = useUpdateLinkBioMutation();
    const [deleteLinkBio, deleteLinkBioResponse] = useDeleteLinkBioMutation();
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
    const handleSearchChange = debounce((newSearch: string) => {
        setDebouncedSearch(newSearch);
    }, 500);

    const createLinkBio = async (payload: LinkBioDataPayload): Promise<any> => {
        const result = await createLinkBioTrigger(payload).unwrap();
        return result;
    };
    const createLinkBioResponse = data?.data ?? undefined;
    const updateLinkBioResponse = updateLinkBioRes?.data?.data;
    const getLinkBioData = getLinkBioResponse?.data ?? undefined;

    useEffect(() => {
        if (callLinkbio) {
            findAllLinkBio({
                ...params
            });
            setLoaded(true);
        }
    }, [callLinkbio, debouncedSearch, findAllLinkBio, pagination, loaded]);

    useEffect(() => {
        if (id) {
            getBio({
                id,
                population: params.population
            });
        }
    }, [id]);

    const getSingleLinkBio = getBioResponse && getBioResponse?.data;

    return {
        linkBiosState: {
            isLoadingState,
            createLinkBioResponse,
            findAllLinkBioResponse,
            findLinkBioLoading,
            pagination,
            deleteLinkBioResponse,
            getLinkBioData,
            params,
            getLinkBioLoading,
            getSingleLinkBio,
            getBioLoading,
            updateLinkBioResponse
        },
        linkBioActions: {
            createLinkBio,
            setLoadingState,
            findAllLinkBio,
            paginationActions,
            deleteLinkBio,
            getLinkBio,
            handleSearchChange,
            updateLinkBio
        }
    };
};
