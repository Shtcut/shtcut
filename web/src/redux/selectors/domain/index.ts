import { createSelector } from '@reduxjs/toolkit';
import { QueryArgs } from '@shtcut/_shared/namespace';
import { RootState } from '@shtcut/redux/store';
import { findAllDomains } from '@shtcut/services/domain';

export const selectFindAllDomain = (state: RootState, params: QueryArgs) => {
    return findAllDomains.select(params)(state);
};

export const selectFindAllDomainData = createSelector(selectFindAllDomain, ({ data }) => data?.data);
