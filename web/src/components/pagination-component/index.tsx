/** @format */
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@shtcut-ui/react';
import React, { useState } from 'react';

interface PaginationActionsProps {
    totalItems: number;
    initialPage?: number;
    initialPageSize?: number;
    pageSizeOptions?: number[];
    onPageChange: (page: number, pageSize: number) => void;
}

const PaginationActions: React.FC<PaginationActionsProps> = ({
    totalItems,
    initialPage = 1,
    initialPageSize = 10,
    pageSizeOptions = [5, 10, 20, 50],
    onPageChange
}) => {
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [pageSize, setPageSize] = useState(initialPageSize);

    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

    const handlePageChange = (page: number) => {
        const validPage = Math.max(1, Math.min(page, totalPages));
        setCurrentPage(validPage);
        onPageChange(validPage, pageSize);
    };

    const handlePageSizeChange = (size: number) => {
        const newSize = Math.max(1, size);
        const newTotalPages = Math.max(1, Math.ceil(totalItems / newSize));
        const newCurrentPage = Math.min(currentPage, newTotalPages);

        setPageSize(newSize);
        setCurrentPage(newCurrentPage);
        onPageChange(newCurrentPage, newSize);
    };

    const renderPageNumbers = () => {
        const pages: React.ReactNode[] = [];
        const maxVisiblePages = 5;
        let startPage = 1;
        let endPage = totalPages;

        if (totalPages > maxVisiblePages) {
            const half = Math.floor(maxVisiblePages / 2);
            startPage = Math.max(currentPage - half, 1);
            endPage = Math.min(currentPage + half, totalPages);

            if (currentPage <= half + 1) {
                endPage = maxVisiblePages;
            } else if (currentPage >= totalPages - half) {
                startPage = totalPages - maxVisiblePages + 1;
            }
        }

        if (startPage > 1) {
            pages.push(
                <button
                    key={1}
                    onClick={() => handlePageChange(1)}
                    className={`px-3 py-1 rounded ${
                        1 === currentPage ? 'bg-primary-0 text-white' : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                >
                    1
                </button>
            );
            if (startPage > 2) {
                pages.push(
                    <span key="start-ellipsis" className="px-2">
                        ...
                    </span>
                );
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`px-3 py-1 rounded ${
                        i === currentPage ? 'bg-primary-0  text-white' : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                >
                    {i}
                </button>
            );
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pages.push(
                    <span key="end-ellipsis" className="px-2">
                        ...
                    </span>
                );
            }
            pages.push(
                <button
                    key={totalPages}
                    onClick={() => handlePageChange(totalPages)}
                    className={`px-3 py-1 rounded ${
                        totalPages === currentPage ? 'bg-primary-0  text-white' : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                >
                    {totalPages}
                </button>
            );
        }

        return pages;
    };

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4  rounded-lg ">
            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Items per page:</span>
                <Select value={pageSize.toString()} onValueChange={(value) => handlePageSizeChange(Number(value))}>
                    <SelectTrigger className="text-xs w-16 text-black font-light border border-[#EDEFF3] h-10">
                        <SelectValue placeholder={`${pageSize}`} />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                        {pageSizeOptions.map((size) => (
                            <SelectItem key={size} value={size.toString()} className="text-sm cursor-pointer">
                                {size}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="flex items-center gap-1">
                <button
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded disabled:opacity-50 disabled:cursor-not-allowed bg-gray-200 hover:bg-gray-300"
                >
                    «
                </button>
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded disabled:opacity-50 disabled:cursor-not-allowed bg-gray-200 hover:bg-gray-300"
                >
                    ‹
                </button>

                {renderPageNumbers()}

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded disabled:opacity-50 disabled:cursor-not-allowed bg-gray-200 hover:bg-gray-300"
                >
                    ›
                </button>
                <button
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded disabled:opacity-50 disabled:cursor-not-allowed bg-gray-200 hover:bg-gray-300"
                >
                    »
                </button>
            </div>

            <div className="text-sm text-gray-600">
                {totalItems > 0
                    ? `Showing ${(currentPage - 1) * pageSize + 1}-${Math.min(
                          currentPage * pageSize,
                          totalItems
                      )} of ${totalItems} items`
                    : 'No items to display'}
            </div>
        </div>
    );
};

export default PaginationActions;
