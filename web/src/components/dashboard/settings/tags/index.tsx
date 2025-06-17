import { Button, Card, Modal, toast } from '@shtcut-ui/react';
import { Tag } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import ActionsTag from './actions-tag';
import { TagResponse } from '@shtcut/types/tags';
import StarLoader from '@shtcut/components/loader/star-loader';
import { ModalType, SettingsComponentType } from '@shtcut/types/types';
import CreateTags from './add-tag';
import DeleteTag from './delete-tag';
import PaginationActions from '@shtcut/components/pagination-component';

const TagsScreen = ({
    findAllTagsResponse,
    isLoading,
    deleteTag,
    setLoadingState,
    findAllTags,
    isLoadingState,
    deleteTagResponse,
    pagination,
    paginationActions,
    totalCount
}: SettingsComponentType) => {
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<ModalType>(null);
    const [singleTag, setSingleTag] = useState<TagResponse | null>(null);
    const hexToRgba = (hex, opacity) => {
        const rgb = parseInt(hex.slice(1), 16);
        const r = (rgb >> 16) & 255;
        const g = (rgb >> 8) & 255;
        const b = rgb & 255;
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    };
    const toggleSection = (type?: ModalType, val?: any) => {
        if ((val && type === 'deleteModal') || (val && type === 'updateModal')) {
            setSingleTag(val);
        }
        setModalType(type || null);
        setShowModal(type !== null);
    };

    const handleClose = () => {
        setSingleTag(null);
        setModalType(null);
        setShowModal(false);
    };

    const handleDeleteLink = (id: string) => {
        setLoadingState('deleting', true);
        deleteTag({
            payload: { id },
            options: {
                successMessage: 'Tags deleted successfully',
                onSuccess: () => {
                    findAllTags();
                }
            }
        });
    };

    const { isSuccess } = deleteTagResponse;
    useEffect(() => {
        if (isSuccess) {
            findAllTags();
            setLoadingState('deleting', false);
            setShowModal(false);
        }
    }, [isSuccess]);

    return (
        <div>
            <section className="flex justify-between gap-8 items-center w-full">
                <section className="h-12 flex w-full items-center px-4 border border-[#e3e3e3] bg-[#f7f7f7] rounded-[4px]">
                    <h3 className="font-semibold text-sm">Tags</h3>
                </section>
                <Button className="text-xs h-8 rounded bg-primary-0" onClick={() => toggleSection('add-tags')}>
                    Add Tags
                </Button>
            </section>
            <section>
                {isLoading ? (
                    <div className=" flex justify-center items-center h-full pt-20">
                        <StarLoader />
                    </div>
                ) : (
                    <Card className="shadow-none mt-4 rounded-[4px]">
                        {findAllTagsResponse &&
                            findAllTagsResponse?.map((tag, index) => (
                                <section className="flex border-b p-4 items-center justify-between" key={index}>
                                    <div className="flex items-center gap-2">
                                        <div
                                            style={{
                                                backgroundColor: hexToRgba(tag.color, 0.05),
                                                borderColor: tag.color
                                            }}
                                            className={' border rounded  w-6 h-6 flex justify-center items-center'}
                                        >
                                            <Tag size={14} color={tag?.color} />
                                        </div>
                                        <p className="text-xs font-medium">{tag?.name}</p>
                                    </div>
                                    <section className="flex items-center gap-2">
                                        <div
                                            className="
                                bg-[#F9FAFB] border border-[#E6E7EB] w-14 h-6 flex items-center justify-center rounded-[4px]"
                                        >
                                            <p className="text-xs">{0} Links</p>
                                        </div>
                                        <ActionsTag
                                            onClickDelete={() => toggleSection('deleteModal', tag)}
                                            onClickEdit={() => toggleSection('updateModal', tag)}
                                            onClickCopy={() => {
                                                navigator.clipboard.writeText(tag.name);
                                                toast({
                                                    variant: 'default',
                                                    title: 'Copy Tag',
                                                    description: 'Tag copied to clipboard!'
                                                });
                                            }}
                                        />
                                    </section>
                                </section>
                            ))}
                    </Card>
                )}
                <section className="mt-6">
                    <PaginationActions
                        totalItems={totalCount}
                        initialPage={pagination.page}
                        initialPageSize={pagination.perPage}
                        onPageChange={paginationActions.handlePageChange}
                    />
                </section>
            </section>
            <Modal onClose={handleClose} showModel={showModal} setShowModal={setShowModal}>
                {(modalType === 'updateModal' || modalType === 'add-tags') && (
                    <CreateTags onClose={handleClose} singleTag={singleTag} findAllTags={findAllTags} />
                )}

                {modalType === 'deleteModal' && singleTag && (
                    <DeleteTag
                        isLoadingState={isLoadingState}
                        handleDelete={() => handleDeleteLink(singleTag?._id ?? '')}
                        handleClose={() => setShowModal(false)}
                    />
                )}
            </Modal>
        </div>
    );
};

export default TagsScreen;
