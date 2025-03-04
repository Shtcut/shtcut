import { api } from '@shtcut/_shared/api/app.api';
import { DELETE, POST, PUT, SHTNER } from '@shtcut/_shared/constant';
import { qrCode } from '../tags';
import { QRCodeDataResponse, QrCodePayload } from '@shtcut/types/qr-code';
import { ApiResponse, QueryArgs } from '@shtcut/_shared/namespace';
import { FetchArgs } from '@reduxjs/toolkit/query';
import { Dict } from '@shtcut-ui/react';

export const qrCodeApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createQrCode: builder.mutation<any, QrCodePayload>({
            query: (payload) => {
                return {
                    url: SHTNER.qrCode,
                    method: POST,
                    body: payload
                };
            },
            invalidatesTags: [qrCode]
        }),
        findAllQrCode: builder.query<ApiResponse<QRCodeDataResponse[]>, QueryArgs>({
            query: (params: QueryArgs) =>
                ({
                    url: SHTNER.qrCode,
                    params
                }) as unknown as FetchArgs,
            providesTags: [qrCode]
        }),
        deleteLinkQrCode: builder.mutation<Dict, { payload: { id: string } }>({
            query: ({ payload }) => ({
                url: `${SHTNER.qrCode}/${payload.id}`,
                method: DELETE
            }),
            invalidatesTags: [qrCode]
        }),
        getSingleQrCode: builder.query<ApiResponse<QRCodeDataResponse>, Record<string, any>>({
            query: (params: Record<string, string>) =>
                ({
                    url: `${SHTNER.qrCode}/${params?.id}`,
                    params
                }) as unknown as FetchArgs,
            providesTags: [qrCode]
        }),
        updateQrCode: builder.mutation<ApiResponse<any>, { payload?: QrCodePayload; id: string }>({
            query: ({ payload, id }) => {
                return {
                    url: `${SHTNER.qrCode}/${id}`,
                    method: PUT,
                    body: payload
                };
            },
            invalidatesTags: [qrCode]
        }),
        deleteBulkQrCodes: builder.mutation<Dict, { ids: string[] }>({
            query: ({ ids }) => ({
                url: `${SHTNER.qrCode}/bulk`,
                method: DELETE,
                body: { ids }
            }),
            invalidatesTags: (_) => [qrCode]
        })
        // updateQrCode: builder.mutation<any, { id: string; payload: QrCodePayload }>({
        //     query: ({ id, payload }) => ({
        //         url: `${SHTNER.qrCode}/${id}`,
        //         method: PUT,
        //         body: payload
        //     }),
        //     invalidatesTags: [qrCode]
        // })
    })
});

export const {
    useCreateQrCodeMutation,
    useLazyFindAllQrCodeQuery,
    useDeleteLinkQrCodeMutation,
    useLazyGetSingleQrCodeQuery,
    useUpdateQrCodeMutation,
    useDeleteBulkQrCodesMutation,
    endpoints: { createQrCode, findAllQrCode, deleteLinkQrCode, getSingleQrCode, updateQrCode, deleteBulkQrCodes }
} = qrCodeApi;
