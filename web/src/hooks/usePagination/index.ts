import { Pagination } from '@shtcut/_shared/namespace';
import { useAppSelector } from '@shtcut/redux/store';
import { Dispatch, SetStateAction, useState } from 'react';

interface UsePaginationReturnType {
    paginate: Record<'page' | 'perPage', any>;
    setPaginate?: Dispatch<SetStateAction<Record<'page' | 'perPage', any>>>;
    pagination: Pagination;
}

interface UsePaginationProps {
    key: string;
}

export const usePagination = ({ key }: UsePaginationProps): UsePaginationReturnType => {
    const [paginate, setPaginate] = useState({
        page: 1,
        perPage: 10
    });

    const { pagination: _pagination } = useAppSelector((state) => state.ui);

    const handlePageChange = (page: number, pageSize: number) => {
        setPaginate({ page, perPage: pageSize });
    };

    const pagination = {
        showSizeChanger: true,
        onChange: handlePageChange,
        current: _pagination?.[key]?.current,
        pageSize: _pagination?.[key]?.perPage,
        total: _pagination?.[key]?.totalCount
    };
    return {
        paginate,
        pagination
    };
};
