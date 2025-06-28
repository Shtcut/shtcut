'use client';

import LinkComponent from '@shtcut/components/dashboard/link/link-component';
import { useDomain } from '@shtcut/hooks/domain';
import { useLink } from '@shtcut/hooks/link';
import { useLinkFilters } from '@shtcut/hooks/link/use-filter-hook';
import { useMemo, useState } from 'react';

const LinkContainer = () => {
    const [url, setUrl] = useState('');
    const [search, setSearch] = useState('');
    const { filters, updateFilter, filterOptions } = useLinkFilters();
    const filter = useMemo(
        () => ({
            archived: false,
            ...(filters.isCustomAlias !== null && { isCustomAlias: filters.isCustomAlias }),
            ...(filters.withTags !== null && { withTags: filters.withTags }),
            ...(filters.creator && { creator: filters.creator })
        }),
        [filters]
    );

    const {
        findAllLinksResponse,
        isLoading,
        deleteLink,
        deleteLinkResponse,
        isLoadingState,
        setLoadingState,
        createLink,
        createLinkResponse,
        handleSearchChange,
        duplicate,
        duplicateLinkResponse,
        findAllLinks,
        fetchMetaDataResponse,
        fetchMetaLoading,
        updateLink,
        updateLinkResponse,
        handleCloseLoading,
        pagination,
        paginationActions,
        params,
        deleteManyLinks,
        fetchLinkMetadata
    } = useLink({
        callLinks: true,
        search,
        filter,
        url
    });

    const { findAllDomainsResponse } = useDomain({ callDomain: true });

    const onSearchChange = (value: string) => {
        setSearch(value);
        handleSearchChange(value);
    };

    return (
        <LinkComponent
            findAllLinksResponse={findAllLinksResponse}
            findAllDomainsResponse={findAllDomainsResponse ?? []}
            deleteLink={deleteLink}
            updateLink={updateLink}
            updateLinkResponse={updateLinkResponse}
            isLoading={isLoading}
            deleteLinkResponse={deleteLinkResponse}
            isLoadingState={isLoadingState}
            setLoadingState={setLoadingState}
            createLink={createLink}
            createLinkResponse={createLinkResponse}
            onSearchChange={onSearchChange}
            search={search}
            duplicate={duplicate}
            duplicateLinkResponse={duplicateLinkResponse}
            findAllLinks={findAllLinks}
            fetchLinkMetadata={fetchLinkMetadata}
            fetchMetaDataResponse={fetchMetaDataResponse}
            fetchMetaLoading={fetchMetaLoading}
            setUrl={setUrl}
            setSearch={setSearch}
            handleCloseLoading={handleCloseLoading}
            pagination={pagination}
            paginationActions={paginationActions}
            params={params}
            deleteManyLinks={deleteManyLinks}
            filters={filters}
            updateFilter={updateFilter}
            filterOptions={filterOptions}
        />
    );
};

export default LinkContainer;
