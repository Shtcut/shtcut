import { Button, Modal } from '@shtcut-ui/react';

import React, { useEffect, useState } from 'react';
import LinkBioCard from './components/link-bio-card';
import { usePathname, useRouter } from 'next/navigation';
import { LinkBioActions, LinkBioApiResponse, LinkBioStateType } from '@shtcut/types/link-bio';
import { skeletonRows } from '@shtcut/components/card-skeleton';
import { UsePaginationActions, UsePaginationState } from '@shtcut/types/pagination';
import PaginationTable from '@shtcut/components/pagination';
import DeleteComponent from '@shtcut/components/dashboard/link/link-component/delete-modal';
import { SearchInput } from '@shtcut/components/dashboard/nav-component';
import PaginationActions from '@shtcut/components/pagination-component';

const LinkBiosComponent = ({
    findAllLinkBioResponse,
    linkBioLoading,
    pagination,
    paginationActions,
    linkBiosState,
    linkBioActions,
    onSearchChange,
    search
}: {
    findAllLinkBioResponse: LinkBioApiResponse | undefined;
    linkBioLoading: boolean | undefined;
    pagination: UsePaginationState;
    paginationActions: UsePaginationActions;
    linkBiosState: LinkBioStateType;
    linkBioActions: LinkBioActions;
    search: string;
    onSearchChange: (value: string) => void;
}) => {
    const router = useRouter();
    const pathName = usePathname();
    const [showDelete, setShowDeleteModal] = useState(false);
    const [linkbioId, setLinkBioId] = useState<string>('');
    const emptyData = findAllLinkBioResponse && findAllLinkBioResponse?.data && findAllLinkBioResponse?.data.length > 0;
    const handleCloseModal = () => {
        setShowDeleteModal(false);
    };
    const handleShowDelete = (id: string) => {
        setShowDeleteModal(true);
        setLinkBioId(id);
    };
    const doFind = () => {
        linkBioActions.findAllLinkBio({
            ...linkBiosState.params
        });
    };

    const handleDeleteLinkBio = (id: string) => {
        linkBioActions.setLoadingState('deleting', true);
        linkBioActions.deleteLinkBio({
            payload: { id },
            options: {
                successMessage: 'Link-bio deleted successfully',
                onSuccess: () => {
                    linkBioActions.findAllLinkBio();
                }
            }
        });
    };

    const { isSuccess: isDeleted } = linkBiosState?.deleteLinkBioResponse;
    useEffect(() => {
        if (isDeleted) {
            doFind();
            handleCloseModal();
            linkBioActions.setLoadingState('deleting', false);
        }
    }, [isDeleted]);

    const handleNavigate = (slug: string) => {
        router.push(`${pathName}/analytics/${slug}`);
    };

    return (
        <div>
            <div className="flex justify-between  items-center">
                <h1 className="font-semibold text-[#2B2829] text-xl">Link-in-bio</h1>
                <Button
                    className="bg-primary-0 text-xs h-8 rounded "
                    onClick={() => router.push(`${pathName}/create-link-bio`)}
                >
                    Create New Link-Bio
                </Button>
            </div>
            <section className="mt-4">
                <SearchInput onChange={(e) => onSearchChange(e.target.value)} value={search} />
            </section>
            <section>
                {linkBioLoading ? (
                    <div className="flex flex-col gap-y-[14px] mt-8">{skeletonRows}</div>
                ) : findAllLinkBioResponse &&
                  findAllLinkBioResponse?.data &&
                  findAllLinkBioResponse?.data?.length > 0 ? (
                    <div className="flex flex-col gap-y-[14px] mt-8">
                        {findAllLinkBioResponse &&
                            findAllLinkBioResponse?.data?.map((data, index) => (
                                <div key={index}>
                                    <LinkBioCard
                                        data={data}
                                        handleShowDelete={() => handleShowDelete(data?.id)}
                                        handleNavigateAnalytics={() => handleNavigate(data?.slug)}
                                    />
                                </div>
                            ))}
                    </div>
                ) : (
                    <div className="flex h-[60vh] justify-center items-center text-gray-500">
                        No data available for {''}
                    </div>
                )}
                {emptyData && (
                    <section className="mt-6">
                        <PaginationActions
                            totalItems={findAllLinkBioResponse?.meta.pagination.totalCount}
                            initialPage={pagination.page}
                            initialPageSize={pagination.perPage}
                            onPageChange={paginationActions.handlePageChange}
                        />
                    </section>
                )}
            </section>
            <Modal setShowModal={setShowDeleteModal} onClose={handleCloseModal} showModel={showDelete}>
                <DeleteComponent
                    isLoadingState={linkBiosState.isLoadingState}
                    handleDelete={() => handleDeleteLinkBio(linkbioId)}
                    handleClose={handleCloseModal}
                    description="Deleting this link-bio will redirect it to the shtcut erro page and can not be undone."
                    title="link-bio"
                />
            </Modal>
        </div>
    );
};

export default LinkBiosComponent;
