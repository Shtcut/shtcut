import { createSelector } from '@reduxjs/toolkit';
import { QueryArgs } from '@shtcut/_shared/namespace';
import { RootState } from '@shtcut/redux/store';
import { findAllLinks } from '@shtcut/services/link';

export const selectFindAllLinks = (state: RootState, params: QueryArgs) => {
    return findAllLinks.select(params)(state);
};

export const selectFindAllLinkData = createSelector(selectFindAllLinks, ({ data }) => data?.data);
