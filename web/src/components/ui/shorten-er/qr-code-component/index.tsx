import { Button } from '@shtcut-ui/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import QrCodeCard from '../../qr-code-components/qr-code-component';
import { skeletonRows } from '@shtcut/components/card-skeleton';
import PaginationTable from '@shtcut/components/pagination';
import { QrCodeLinkActions, QrCodeLinkState } from '@shtcut/types/qr-code';
import { LoadingButton } from '@shtcut/components/_shared/loading-button';
import { handleError } from '@shtcut/_shared';
import { useLink } from '@shtcut/hooks/link';
import DeleteComponent from '@shtcut/components/dashboard/link/link-component/delete-modal';
import Modal from '@shtcut/components/modal';

const QrCodeComponent = ({ qrState, qrActions }: { qrActions: QrCodeLinkActions; qrState: QrCodeLinkState }) => {
    const { deleteManyLinks } = useLink({});
    const router = useRouter();
    const pathName = usePathname();
    const [ids, setIds] = useState<string[]>([]);
    const [id, setId] = useState('');
    const [showModal, setShowModal] = useState(false);
    const handleCheckboxChange = (id: string, isChecked: boolean) => {
        if (isChecked) {
            setIds((prevSelected) => [...prevSelected, id]);
        } else {
            setIds((prevSelected) => prevSelected.filter((qrId) => qrId !== id));
        }
    };
    const handleDeleteMany = async () => {
        if (ids) {
            qrActions.setLoadingState('deleting', true);
            try {
                await deleteManyLinks({
                    payload: ids,
                    options: {
                        successMessage: `Successfully deleted`
                    }
                });
                setIds([]);
            } catch (error) {
                handleError({ error });
            } finally {
                qrActions.setLoadingState('deleting', false);
            }
        }
    };

    const handleDeleteQrCodeLink = () => {
        qrActions.setLoadingState('deleting', true);
        qrActions.deleteQrCodeLink({
            payload: { id },
            options: {
                successMessage: 'Link deleted successfully'
            }
        });
    };
    const handleOpenModal = (id: string) => {
        setId(id);
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setId('');
        setShowModal(false);
    };
    const doFind = () => {
        qrActions.findAllQrCode({
            ...qrState.params
        });
    };
    const { isSuccess } = qrState.deleteLinkResponse;
    useEffect(() => {
        if (isSuccess) {
            doFind();
            handleCloseModal();
        }
    }, [isSuccess, qrActions.findAllQrCode]);

    const handleNavigate = (id: string) => {
        router.push(`${pathName}/edit/${id}`);
    };

    return (
        <div className="">
            <div className="flex justify-between  items-center">
                <h1 className="font-semibold text-[#2B2829] text-xl">QR Codes</h1>
                <Link href={`${pathName}/create`}>
                    <Button className="bg-primary-0 h-8 text-xs rounded flex justify-center items-center gap-x-2">
                        Create QR Code
                    </Button>
                </Link>
            </div>
            {ids.length > 0 && (
                <div className="mb-4 flex justify-end mt-5">
                    <LoadingButton
                        onClick={handleDeleteMany}
                        className="bg-red-500 w-36  text-xs  "
                        loading={qrState.isLoadingState}
                    >
                        Delete Selected ({ids.length})
                    </LoadingButton>
                </div>
            )}
            {qrState.isLoading ? (
                <div className="flex flex-col gap-y-[14px] mt-8">{skeletonRows}</div>
            ) : qrState.findAllQrCodeResponse?.data && qrState.findAllQrCodeResponse?.data?.length > 0 ? (
                qrState.findAllQrCodeResponse?.data?.map((data) => (
                    <div key={data?.id} className="mt-[22px]">
                        <QrCodeCard
                            selectedIds={ids}
                            id={data?.id}
                            data={data}
                            onChange={() => handleCheckboxChange(data._id, !ids.includes(data._id))}
                            handleDeleteQrCodeLink={() => handleOpenModal(data._id)}
                            handleNavigate={() => handleNavigate(data?._id)}
                        />
                    </div>
                ))
            ) : (
                <div className="flex flex-col items-center rounded-[10px] bg-white h-[500px]  justify-center gap-4 mt-10">
                    <Image src="/images/qrcode-data.png" width={232} height={172} alt="No Data" />
                    <p className="text-center  text-lg font-medium ">No QR Code found for this workspace</p>
                    <Link href={`${pathName}/create`}>
                        <Button className="bg-primary-0  text-xs h-8 rounded ">Create QR Code</Button>
                    </Link>
                </div>
            )}
            <section className="mt-6">
                <PaginationTable
                    pageSize={qrState.pagination.perPage ?? 10}
                    pageIndex={qrState.pagination.page - 1}
                    handleOnChange={qrActions.paginationActions.handlePageChange}
                    totalItemsCount={qrState.findAllQrCodeResponse?.meta.pagination.totalCount ?? 0}
                    setPageIndex={qrActions.paginationActions.setPage}
                    setPageSize={qrActions.paginationActions.setPerPage}
                />
            </section>
            <Modal closeIcon={false} isOpen={showModal} onClose={() => setShowModal(false)} className=" w-96">
                <DeleteComponent
                    isLoadingState={qrState.isLoadingState}
                    handleDelete={handleDeleteQrCodeLink}
                    handleClose={() => setShowModal(false)}
                    description="Deleting this Qr code link will redirect it to the shtcut erro page and can not be undone."
                    title="link"
                />
            </Modal>
        </div>
    );
};

export default QrCodeComponent;
