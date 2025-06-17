'use client';
import Tabs from '@shtcut/components/_shared/Tabs';
import React, { useState, useEffect } from 'react';
import { GeneralScreen, SecurityScreen, TagsScreen, WorkspaceScreen } from './component';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { tabs } from '@shtcut/_shared/data';
import { SettingsComponentType } from '@shtcut/types/types';
import Modal from '@shtcut/components/modal';
import ChangePasswordForm from './security/components/change-password-form';
import { Form } from '@shtcut-ui/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { LoadingButton } from '@shtcut/components/_shared/loading-button';
import { changePasswordValidationSchema } from '@shtcut/components/form/auth/update-password-form/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { get } from 'lodash';

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
    changePasswordResponse
}: SettingsComponentType) => {
    const { isSuccess, isLoading: changePasswordloading, error } = changePasswordResponse;
    const params = useParams();
    const [showModal, setShowModal] = useState(false);
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
    const errorMessage = get(error, ['data', 'meta', 'error', 'message'], 'An error occurred, please try again.');

    const onSubmit = (payload: z.infer<typeof changePasswordValidationSchema>) => {
        changePassword({
            payload,
            options: {
                successMessage: 'Password changed successfully',
                errorMessage: errorMessage
            }
        });
    };
    useEffect(() => {
        if (isSuccess) {
            setShowModal(false);
            form.reset();
        }
    }, [isSuccess]);

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
                {selectedTabIndex === 0 && <GeneralScreen />}
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
                {selectedTabIndex === 3 && <SecurityScreen onOpenModal={() => setShowModal(true)} />}
                {/* {selectedTabIndex === 5 && <NotificationScreen />} */}
                {/* {selectedTabIndex === 6 && <ApiKeysScreen />} */}

                <Modal
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    title="Change Password"
                    border
                    className="w-96"
                >
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="p-4">
                            <ChangePasswordForm form={form} />
                            <LoadingButton loading={changePasswordloading} type="submit" className="mt-6">
                                Submit
                            </LoadingButton>
                        </form>
                    </Form>
                </Modal>
            </section>
        </div>
    );
};

export default SettingComponent;
