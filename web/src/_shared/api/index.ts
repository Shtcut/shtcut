import { fetchBaseQuery } from '@reduxjs/toolkit/query';

const baseQuery = (baseUrl: string) => fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState}) => {
        // const token = (getState() as RootState)
    }
});
