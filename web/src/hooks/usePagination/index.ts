
'use client';
import { UsePaginationReturnType } from '@shtcut/types/pagination';
import { useMemo, useState } from 'react';

export const usePagination = (): UsePaginationReturnType => {
    const [page, setPage] = useState(0);
    const [perPage, setPerPage] = useState(10);

    const handlePageChange = (page: number, newPageSize: number) => {
        setPage(page - 1);
        if (pagination.perPage !== newPageSize) {
            paginationActions.setPerPage(newPageSize);
        }
    };

    const pagination = useMemo(
        () => ({
            page: page + 1,
            perPage
        }),
        [page, perPage]
    );

    const paginationActions = {
        setPage,
        setPerPage,
        handlePageChange
    };

    return {
        pagination,
        paginationActions
    };
};
