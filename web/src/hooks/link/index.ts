/* eslint-disable react-hooks/exhaustive-deps */
import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { Dict } from '@shtcut-ui/react';
import { Pagination } from '@shtcut/_shared/namespace';
import { usePagination } from '../usePagination';
import { useEffect } from 'react';
import { useAppSelector } from '@shtcut/redux/store';
import {
    useCreateLinkMutation,
    useDeleteLinkMutation,
    useLazyFindAllLinksQuery,
    useLazyGetLinkQuery,
    useUpdateLinkMutation
} from '@shtcut/services/link';
import { LinkNameSpace } from '@shtcut/_shared/namespace/link';
import { selectFindAllLinkData } from '@shtcut/redux/selectors/link';

interface UseLinkProps {
    id?: string;
    key?: string;
    callLinks?: boolean;
    search?: string;
    filter?: Dict;
}

interface UseLinkReturnsType {
    createLink: MutationTrigger<any>;
    deleteLink: MutationTrigger<any>;
    updateLink: MutationTrigger<any>;
    findAllLinks: any;
    isLoading: boolean;

    findAllLinksResponse: LinkNameSpace.Link[] | undefined;
    createLinkResponse: Dict;
    getLinkResponse: Dict;
    updateLinkResponse: Dict;
    deleteLinkResponse: Dict;
    pagination: Pagination;
}

export const useLink = (props: UseLinkProps): UseLinkReturnsType => {
    const { callLinks = false, search, filter, id } = props;

    const { paginate, pagination } = usePagination({ key: 'findAllLinks' });
    const [createLink, createLinkResponse] = useCreateLinkMutation();
    const [updateLink, updateLinkResponse] = useUpdateLinkMutation();
    const [deleteLink, deleteLinkResponse] = useDeleteLinkMutation();
    const [findAllLinks, { isLoading }] = useLazyFindAllLinksQuery();
    const [getLink, getLinkResponse] = useLazyGetLinkQuery();

    const params = {
        ...paginate,
        population: JSON.stringify([
            { path: 'user' },
            { path: 'domain', select: ['slug', 'name'] },
            { path: 'qrCode' }
        ]),
        search,
        ...filter
    };

    const findAllLinksResponse = useAppSelector((state) => selectFindAllLinkData(state, params));

    useEffect(() => {
        if (callLinks) {
            findAllLinks({
                ...params
            });
        }
    }, [callLinks]);

    useEffect(() => {
        if (id) {
            getLink({
                id,
                population: params.population
            });
        }
    }, [id]);

    return {
        isLoading,
        createLink,
        updateLink,
        deleteLink,
        findAllLinks,
        findAllLinksResponse,
        createLinkResponse,
        getLinkResponse,
        updateLinkResponse,
        deleteLinkResponse,
        pagination
    };
};
