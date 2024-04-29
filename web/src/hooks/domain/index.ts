/* eslint-disable react-hooks/exhaustive-deps */

import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { Dict } from '@shtcut-ui/react';
import { Pagination } from '@shtcut/_shared/namespace';
import { usePagination } from '../usePagination';
import { useEffect } from 'react';
import { useAppSelector } from '@shtcut/redux/store';
import { DomainNameSpace } from '@shtcut/_shared/namespace/domain';
import {
    useCreateDomainMutation,
    useDeleteDomainMutation,
    useLazyFindAllDomainsQuery,
    useLazyGetDomainQuery,
    useUpdateDomainMutation
} from '@shtcut/services/domain';
import { selectFindAllDomainData } from '@shtcut/redux/selectors/domain';

interface UseDomainProps {
    id?: string;
    key?: string;
    callLinks?: boolean;
    search?: string;
    filter?: Dict;
}

interface UseDomainReturnsType {
    createDomain: MutationTrigger<any>;
    deleteDomain: MutationTrigger<any>;
    updateDomain: MutationTrigger<any>;
    findAllDomains: any;
    isLoading: boolean;

    findAllDomainsResponse: DomainNameSpace.Domain[] | undefined;
    createDomainResponse: Dict;
    getDomainResponse: Dict;
    updateDomainResponse: Dict;
    deleteDomainResponse: Dict;
    pagination: Pagination;
}

export const useDomain = (props: UseDomainProps): UseDomainReturnsType => {
    const { callLinks = false, search, filter, id } = props;

    const { paginate, pagination } = usePagination({ key: 'findAllDomains' });
    const [createDomain, createDomainResponse] = useCreateDomainMutation();
    const [updateDomain, updateDomainResponse] = useUpdateDomainMutation();
    const [deleteDomain, deleteDomainResponse] = useDeleteDomainMutation();
    const [findAllDomains, { data: domains, isLoading }] = useLazyFindAllDomainsQuery();
    const [getDomain, getDomainResponse] = useLazyGetDomainQuery();

    const params = {
        ...paginate,
        population: JSON.stringify([{ path: 'user' }, { path: 'qrCode' }]),
        search,
        ...filter
    };

    const findAllDomainsResponse = useAppSelector((state) => selectFindAllDomainData(state, params));

    useEffect(() => {
        if (callLinks) {
            findAllDomains({
                ...params
            });
        }
    }, [callLinks]);

    useEffect(() => {
        if (id) {
            getDomain({
                id,
                population: params.population
            });
        }
    }, [id]);

    return {
        isLoading,
        createDomain,
        updateDomain,
        deleteDomain,
        findAllDomains,

        findAllDomainsResponse,
        createDomainResponse,
        getDomainResponse,
        updateDomainResponse,
        deleteDomainResponse,
        pagination
    };
};
