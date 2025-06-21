'use client';
import Tabs from '@shtcut/components/_shared/Tabs';
import React, { useState, useEffect } from 'react';
import { GeneralScreen, SecurityScreen, TagsScreen, WorkspaceScreen } from './component';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { tabs } from '@shtcut/_shared/data';
import { SettingsComponentType } from '@shtcut/types/types';
import Modal from '@shtcut/components/modal';
import ChangePasswordForm from './security/components/change-password-form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
    changePasswordValidationSchema,
    updateUserValidationSchema
} from '@shtcut/components/form/auth/update-password-form/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { get } from 'lodash';
import SettingsModalForm from './components/settings-update-wrapper';
import UpdateUserForm from './general/update-user';
import { useUser } from '@shtcut/hooks';

const SettingComponent = ({
    findAllTagsResponse,
    isLoading,
    deleteTag,
    setLoadingState,
    findAllTags,
    isLoadingState,
    deleteTagResponse,
    pagination,
    paginationActions,
    totalCount,
    changePassword,
    changePasswordResponse,
    updateUserResponse,
    updateUser
}: SettingsComponentType) => {
    const { isSuccess, isLoading: changePasswordloading, error } = changePasswordResponse;
    const { isSuccess: isSucessUpdateUser, isLoading: isLoadingUpdateUser, error: updateError } = updateUserResponse;
    const { loggedInUserData, refetchUser } = useUser({ callLoggedInUser: true });
    const { data } = loggedInUserData;
    const { data: user } = data || {};
    const params = useParams();
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<'change-passsword' | 'update'>('change-passsword');
    const { module, workspace } = params;
    const router = useRouter();
    const searchParams = useSearchParams();
    const queryTag = searchParams.get('tag') || 'general';
    const [selectedTabIndex, setSelectedTabIndex] = useState(() => {
        const index = tabs.findIndex((tab) => tab.id === queryTag);
        return index !== -1 ? index : 0;
    });

    const handleTabClick = (index: number, tag: string) => {
        router.push(`/${module}/${workspace}/settings?tag=${tag}`);
        setSelectedTabIndex(index);
    };

    useEffect(() => {
        const findTabIndex = () => {
            const index = tabs.findIndex((tab) => tab.id === queryTag);
            return index !== -1 ? index : 0;
        };

        setSelectedTabIndex(findTabIndex());
    }, [queryTag, tabs]);

    const form = useForm<z.infer<typeof changePasswordValidationSchema>>({
        resolver: zodResolver(changePasswordValidationSchema),
        defaultValues: {
            currentPassword: '',
            password: ''
        }
    });

    const updateForm = useForm<z.infer<typeof updateUserValidationSchema>>({
        resolver: zodResolver(updateUserValidationSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            gender: undefined
        }
    });
    const errorMessage = get(
        error || updateError,
        ['data', 'meta', 'error', 'message'],
        'An error occurred, please try again.'
    );

    const onSubmit = (payload: z.infer<typeof changePasswordValidationSchema>) => {
        changePassword({
            payload,
            options: {
                successMessage: 'Password changed successfully',
                errorMessage: errorMessage
            }
        });
    };
    const onSubmitUserUpdate = async (payload: z.infer<typeof updateUserValidationSchema>) => {
        try {
            await updateUser({
                payload,
                options: {
                    successMessage: 'Users successfully updated',
                    errorMessage: errorMessage
                }
            });
            refetchUser();
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (isSuccess || isSucessUpdateUser) {
            setShowModal(false);
            form.reset();
            updateForm.reset();
        }
    }, [isSuccess, isSucessUpdateUser]);
    useEffect(() => {
        if (user) {
            updateForm.reset({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                email: user.email || '',
                gender: user.gender || undefined
            });
        }
    }, [user]);

    const handlesShowModal = (val: 'change-passsword' | 'update') => {
        setModalType(val);
        setShowModal(true);
    };

    return (
        <div className="px-10">
            <div className="">
                <h1 className="font-semibold text-[#2B2829] text-xl">Settings</h1>
            </div>
            <div className="w-2/3 mt-7">
                <Tabs
                    selectedTabIndex={selectedTabIndex}
                    onTabClick={(index) => handleTabClick(index, tabs[index].id)}
                    tabs={tabs}
                />
            </div>
            <section className="mt-8 w-full">
                {selectedTabIndex === 0 && (
                    <GeneralScreen
                        onOpenModal={() => {
                            handlesShowModal('update');
                        }}
                        user={user}
                    />
                )}
                {selectedTabIndex === 1 && (
                    <TagsScreen
                        findAllTagsResponse={findAllTagsResponse}
                        isLoading={isLoading}
                        deleteTag={deleteTag}
                        setLoadingState={setLoadingState}
                        findAllTags={findAllTags}
                        isLoadingState={isLoadingState}
                        deleteTagResponse={deleteTagResponse}
                        pagination={pagination}
                        paginationActions={paginationActions}
                        totalCount={totalCount}
                    />
                )}
                {/* {selectedTabIndex === 2 && <BillingsScreen />} */}
                {selectedTabIndex === 2 && <WorkspaceScreen />}
                {selectedTabIndex === 3 && (
                    <SecurityScreen
                        onOpenModal={() => {
                            handlesShowModal('change-passsword');
                        }}
                    />
                )}
                {/* {selectedTabIndex === 5 && <NotificationScreen />} */}
                {/* {selectedTabIndex === 6 && <ApiKeysScreen />} */}

                <Modal
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    title={modalType === 'change-passsword' ? 'Change Password' : 'Update User'}
                    border
                    className="w-96"
                >
                    {modalType === 'change-passsword' && (
                        <SettingsModalForm form={form} onSubmit={onSubmit} loading={changePasswordloading}>
                            <ChangePasswordForm form={form} />
                        </SettingsModalForm>
                    )}
                    {modalType === 'update' && (
                        <SettingsModalForm
                            onSubmit={onSubmitUserUpdate}
                            loading={isLoadingUpdateUser}
                            form={updateForm}
                        >
                            <UpdateUserForm form={updateForm} />
                        </SettingsModalForm>
                    )}
                </Modal>
            </section>
        </div>
    );
};

export default SettingComponent;
