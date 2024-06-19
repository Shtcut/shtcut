import { createSlice } from '@reduxjs/toolkit';
import { Dict } from '@shtcut-ui/react';
import { AppCookie } from '@shtcut/_shared/helpers';
import { authApi } from '@shtcut/services/auth';

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
    extraReducers: (builder) => {
        builder.addMatcher(authApi.endpoints.signIn.matchFulfilled, (_, action) => {
            return {
                ...initialState,
                authData: action.payload.data,
                sessionToken: action.payload.meta.token
            };
        });
        builder.addMatcher(authApi.endpoints.signUp.matchFulfilled, (_, action) => {
            return {
                ...initialState,
                authData: action.payload.data,
                sessionToken: action.payload.meta.token
            };
        });
        builder.addMatcher(authApi.endpoints.verifyEmail.matchFulfilled, (_, action) => {
            return {
                ...initialState,
                authData: action.payload.data,
                sessionToken: action.payload.meta.token
            };
        });
    }
});

export const { logout, isOwner } = authSlice.actions;

export default authSlice.reducer;
