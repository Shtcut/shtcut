import { createSlice } from '@reduxjs/toolkit';
import { Dict } from '@shtcut-ui/react';
import { AppCookie } from '@shtcut/_shared/helpers';

type InitialStateType = {
    authData: null | Dict;
    sessionToken: string | null;
    isAdmin: boolean;
    isOwner: boolean;
};

export const initialState = {
    authData: null,
    sessionToken: null,
    isAdmin: false,
    isOwner: false
} as InitialStateType;

const AUTH_KEY = 'auth';

export const authSlice = createSlice({
    name: AUTH_KEY,
    initialState,
    reducers: {
        isOwner: (_, action) => {
            return {
                ...initialState,
                isOwner: action.payload
            };
        },
        logout: () => {
            AppCookie({ allowDelete: true });
            return initialState;
        }
    },
    // extraReducers: (builder) => {
    //     builder.addMatcher(authApi)
    // }
});
