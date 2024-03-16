import { createSelector } from '@reduxjs/toolkit';
import { QueryArgs } from '@shtcut/_shared/namespace';
import { RootState } from '@shtcut/redux/store';
import { findAllWorkspaces, searchOneWorkspace } from '@shtcut/services/workspace';

export const selectWorkspace = (state: RootState, params: QueryArgs) => {
    return searchOneWorkspace.select(params)(state);
};

export const selectFindAllWorkspace = (state: RootState, params: QueryArgs) => {
    return findAllWorkspaces.select(params)(state);
};

export const selectFindAllWorkspaceData = createSelector(selectFindAllWorkspace, ({ data }) => data?.data);
export const selectWorkspaceData = createSelector(selectWorkspace, ({ data }) => data?.data);
