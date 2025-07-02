import { Button } from '@shtcut-ui/react';

import React, { useEffect, useRef, useState } from 'react';
import LinkBioCard from './components/link-bio-card';
import { usePathname, useRouter } from 'next/navigation';
import { LinkBioActions, LinkBioApiResponse, LinkBioDataResponse, LinkBioStateType } from '@shtcut/types/link-bio';
import { skeletonRows } from '@shtcut/components/card-skeleton';
import { UsePaginationActions, UsePaginationState } from '@shtcut/types/pagination';
import DeleteComponent from '@shtcut/components/dashboard/link/link-component/delete-modal';
import { SearchInput } from '@shtcut/components/dashboard/nav-component';
import PaginationActions from '@shtcut/components/pagination-component';
import Modal from '@shtcut/components/modal';
import QrCodeScan from '@shtcut/components/dashboard/qr-code-scan';
import DownloadBtn from '@shtcut/components/download-btn';
import { CiImageOff } from 'react-icons/ci';
import { Copy } from 'lucide-react';
import useCopyToClipboard from '@shtcut/hooks/useCopyToClipboard';

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
    const qrCodeRef = useRef(null);
    const { handleCopy } = useCopyToClipboard();
    const router = useRouter();
    const pathName = usePathname();
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<'delete' | 'qr' | null>(null);
    const [selectedLinkBio, setSelectedLinkBio] = useState<LinkBioDataResponse | null>(null);

    const emptyData = findAllLinkBioResponse && findAllLinkBioResponse?.data && findAllLinkBioResponse?.data.length > 0;
    const handleCloseModal = () => {
        setShowModal(false);
    };
    const handleShowModal = (type: 'delete' | 'qr', data: LinkBioDataResponse) => {
        setModalType(type);
        setSelectedLinkBio(data);
        setShowModal(true);
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
                                        handleShowDelete={() => handleShowModal('delete', data)}
                                        handleNavigateAnalytics={() => handleNavigate(data?._id)}
                                        handleShowQr={() => handleShowModal('qr', data)}
                                    />
                                </div>
                            ))}
                    </div>
                ) : (
                    <div className="flex h-[60vh] justify-center items-center text-gray-500">No data available</div>
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
            <Modal onClose={handleCloseModal} isOpen={showModal} className="max-w-[400px] bg-black">
                {modalType === 'delete' && selectedLinkBio && (
                    <DeleteComponent
                        isLoadingState={linkBiosState.isLoadingState}
                        handleDelete={() => handleDeleteLinkBio(selectedLinkBio?._id || '')}
                        handleClose={handleCloseModal}
                        description="Deleting this link-bio will redirect it to the shtcut error page and can not be undone."
                        title="link-bio"
                    />
                )}
                {modalType === 'qr' && selectedLinkBio && (
                    <section className="w-96 flex flex-col items-center p-4">
                        <div className=" border  w-[50px] h-[50px] rounded-full flex justify-center items-center ">
                            <CiImageOff size={24} />
                        </div>
                        <div
                            className="border w-fit flex justify-center items-center my-3 rounded-md border-[##E3E3E3]"
                            ref={qrCodeRef}
                        >
                            <QrCodeScan
                                id={selectedLinkBio?._id}
                                value={`https://shtcut.co/link-bio/${selectedLinkBio?.slug}`}
                            />
                        </div>
                        <section className="border border-gray-200 rounded-md h-9 w-full flex items-center justify-between px-3">
                            <p className="truncate">{`https://shtcut.co/link-bio/${selectedLinkBio?.slug}`}</p>
                            <Copy
                                size={16}
                                onClick={() => handleCopy(`https://shtcut.co/link-bio/${selectedLinkBio?.slug}`)}
                            />
                        </section>
                        <section className="mt-10 w-full">
                            <DownloadBtn qrCodeRef={qrCodeRef} value={`https://link-bio/${selectedLinkBio?.slug}`} />
                        </section>
                    </section>
                )}
            </Modal>
        </div>
    );
};

export default LinkBiosComponent;
