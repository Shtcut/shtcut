/* eslint-disable react-hooks/exhaustive-deps */
import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { Dict } from '@shtcut-ui/react';
import { Pagination } from '@shtcut/_shared/namespace';
import { usePagination } from '../usePagination';
import { useEffect } from 'react';
import { useAppSelector } from '@shtcut/redux/store';
import { useGetLoggedInUserQuery } from '@shtcut/services/user';
import {
    useCreateLinkMutation,
    useDeleteLinkMutation,
    useGetLinkQuery,
    useLazyFindAllLinksQuery,
    useUpdateLinkMutation
} from '@shtcut/services/link';
import { LinkNameSpace } from '@shtcut/_shared/namespace/link';
import { selectFindAllLinkData } from '@shtcut/redux/selectors/link';
import { useAuth } from '..';

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

    findAllLinksResponse: LinkNameSpace.Link[] | undefined;
    createLinkResponse: Dict;
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
    const [triggerLinks] = useLazyFindAllLinksQuery();
    // const [getLink, getLinkResponse] = useGetLinkQuery('');

    const { authData } = useAuth();

    const params = {
        ...paginate,
        population: JSON.stringify([{ path: 'user' }, { path: 'domain', select: ['slug', 'name'] }]),
        search,
        ...filter
    };

    const findAllLinksResponse = useAppSelector((state) => selectFindAllLinkData(state, params));

    useEffect(() => {
        if (callLinks) triggerLinks(params);
    }, [callLinks, triggerLinks]);

    return {
        createLink,
        updateLink,
        deleteLink,
        findAllLinksResponse,
        createLinkResponse,
        updateLinkResponse,
        deleteLinkResponse,
        pagination
    };
};
