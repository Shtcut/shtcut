import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@shtcut/redux/store';
import { loggedInUserTag } from '@shtcut/services/tags';
import { getLoggedInUser } from '@shtcut/services/user';
import { omit } from 'lodash';

export const selectUser = (state: RootState) => getLoggedInUser.select(loggedInUserTag)(state);

export const selectUserData = createSelector(selectUser, (user) => ({
    ...omit(user?.data?.data, ['publicId', 'createdAt', 'updateAt', '_id', '__v'])
}));
