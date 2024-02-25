import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithResponse } from '@shtcut/_shared/api';
import { API_BASE_URL } from '../constant';
import { HYDRATE } from 'next-redux-wrapper';

export const api = createApi({
    reducerPath: 'app_api',
    baseQuery: baseQueryWithResponse(API_BASE_URL),
    tagTypes: [],
    extractRehydrationInfo(action: any, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath];
        }
    },
    endpoints: () => ({})
});
