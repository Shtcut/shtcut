import { FetchArgs, fetchBaseQuery, BaseQueryApi } from '@reduxjs/toolkit/query';
import { Dict } from '@shtcut-ui/react';
import { AppCookie } from '../helpers';
import { RootState } from '@shtcut/redux/store';

const baseQuery = (baseUrl: string) =>
    fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.sessionToken;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            headers.set('X-API-KEY', process.env.NEXT_PUBLIC_API_KEY as string);
            return headers;
        }
    });

export const baseQueryWithResponse =
    (baseUrl: string) => async (args: FetchArgs, api: BaseQueryApi, extraOptions: Dict) => {
        const { data, error } = await baseQuery(baseUrl)(args, api, extraOptions);
        const { meta, data: authData } = data as any || {};
        const token = meta?.token;
        if (error) {
            return { error: { status: error?.status, data: error?.data } };
        }
        if (token) AppCookie({ cookie: token, userRole: authData?.role });
        return { data };
    };
