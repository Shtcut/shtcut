import React, { Dispatch, SetStateAction } from 'react';
import LinkListedComponent from '../../link-listed-component';
import { FindAllLinkResresponseType, LinkNameSpace } from '@shtcut/_shared/namespace/link';
import { ModalType } from '@shtcut/types/types';
import PaginationTable from '@shtcut/components/pagination';
import { UsePaginationActions, UsePaginationState } from '@shtcut/types/pagination';
import { skeletonRows } from '@shtcut/components/card-skeleton';
import { LoadingButton } from '@shtcut/components/_shared/loading-button';
import PaginationActions from '@shtcut/components/pagination-component';

interface LinkDataComponentProps {
    isLoading: boolean;
    findAllLinksResponse: FindAllLinkResresponseType | undefined;
    handleAnalyticsNavigate: (id: string) => void;
    toggleSection: (modalType: ModalType, data: LinkNameSpace.Link) => void;
    handleUpdateLink: (data: LinkNameSpace.Link) => void;
    search: string;
    pagination: UsePaginationState;
    paginationActions: UsePaginationActions;
    setSelectedIds: Dispatch<SetStateAction<string[]>>;
    selectedIds: string[];
    handleDeleteMany: () => void;
}

const LinkDataComponent = ({
    findAllLinksResponse,
    isLoading,
    handleAnalyticsNavigate,
    handleUpdateLink,
    toggleSection,
    search,
    pagination,
    paginationActions,
    setSelectedIds,
    selectedIds,
    handleDeleteMany
}: LinkDataComponentProps) => {
    const handleCheckboxChange = (id: string, isChecked: boolean) => {
        if (isChecked) {
            setSelectedIds((prevSelected) => [...prevSelected, id]);
        } else {
            setSelectedIds((prevSelected) => prevSelected.filter((qrId) => qrId !== id));
        }
    };
    const emptyData = findAllLinksResponse && findAllLinksResponse?.data && findAllLinksResponse?.data.length > 0;

    return (
        <>
            {selectedIds.length > 0 && (
                <div className="mb-4 flex justify-end mt-5">
                    <LoadingButton
                        onClick={handleDeleteMany}
                        className="bg-red-500 w-36  text-xs  "
                        loading={isLoading}
                    >
                        Delete Selected ({selectedIds.length})
                    </LoadingButton>
                </div>
            )}
            {isLoading ? (
                <div className="flex flex-col gap-y-[14px] mt-8">{skeletonRows}</div>
            ) : findAllLinksResponse && findAllLinksResponse?.data && findAllLinksResponse?.data.length > 0 ? (
                <div className="flex flex-col gap-y-[14px] mt-8">
                    {findAllLinksResponse?.data.map((data) => {
                        return (
                            <LinkListedComponent
                                key={data?._id}
                                data={data}
                                onClickNavigate={() => handleAnalyticsNavigate(data._id)}
                                onDeleteClick={() => toggleSection('deleteModal', data)}
                                onDuplicateClick={() => toggleSection('duplicateModal', data)}
                                onQrCodeClick={() => toggleSection('qrCodeModal', data)}
                                handleUpdateLink={() => handleUpdateLink(data)}
                                onClickAchive={() => toggleSection('archiveModal', data)}
                                onClickShare={() => toggleSection('shareModal', data)}
                                checked={selectedIds.includes(data._id)}
                                onChange={() => handleCheckboxChange(data._id, !selectedIds.includes(data._id))}
                            />
                        );
                    })}
                </div>
            ) : (
                <div className="flex h-[60vh] justify-center items-center text-gray-500">
                    No data available for {search}
                </div>
            )}
            {emptyData && (
                <section className="mt-6">
                    <PaginationActions
                        totalItems={findAllLinksResponse?.meta.pagination.totalCount}
                        initialPage={pagination.page}
                        initialPageSize={pagination.perPage}
                        onPageChange={paginationActions.handlePageChange}
                    />
                </section>
            )}
        </>
    );
};

export default LinkDataComponent;
