'use client';

import SettingComponent from '@shtcut/components/dashboard/settings';
import { useAuth } from '@shtcut/hooks';
import { useTags } from '@shtcut/hooks/tags';
import React from 'react';

const SettingContainer = () => {
    const {
        findAllTagsResponse,
        isLoading,
        deleteTag,
        setLoadingState,
        isLoadingState,
        findAllTags,
        deleteTagResponse,
        pagination,
        paginationActions
    } = useTags({
        call: true
    });
    const { changePassword, changePasswordResponse, updateUser, updateUserResponse } = useAuth();

    return (
        <SettingComponent
            findAllTagsResponse={findAllTagsResponse?.data}
            isLoading={isLoading}
            deleteTag={deleteTag}
            isLoadingState={isLoadingState}
            setLoadingState={setLoadingState}
            findAllTags={findAllTags}
            deleteTagResponse={deleteTagResponse}
            pagination={pagination}
            paginationActions={paginationActions}
            totalCount={findAllTagsResponse?.meta?.pagination?.totalCount ?? 0}
            changePassword={changePassword}
            changePasswordResponse={changePasswordResponse}
            updateUser={updateUser}
            updateUserResponse={updateUserResponse}
        />
    );
};

export default SettingContainer;
