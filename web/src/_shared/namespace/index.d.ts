export interface AppObject {
    _id: string;
    __v: number;
    id: string;
    publicId: string;
    createAt?: string | Date;
    updateAt?: string | Date;
    active?: boolean;
}

export interface Option {
    noErrMessage?: boolean;
    noSuccessMessage?: boolean;
    errMessage?: string;
    successMessage?: string;
}

export interface TriggerResponse {
    isLoading?: boolean;
    isSuccess?: boolean;
    isError?: boolean;
    data: boolean;
}
export interface ApiError {
    message: string;
    messages?: string | Record<string, any>;
}

export interface QueryArgs {
    page?: number;
    perPage?: number;
    population?: Array<string> | string;
    user?: string;
    workspace?: string;
    search?: string;
    filter?: Dict;
    all?: boolean;
}

export interface Meta {
    statusCode: number;
    success: boolean;
    token?: string;
    error?: ApiError;
    pagination: ApiPagination;
}

export interface ApiResponse<T> {
    meta: Meta;
    data: T;
}

export interface ApiRequest {
    id?: string;
    ids?: string[];
    options: Option;
}

export interface ApiPagination {
    totalCount: number;
    perPage: number;
    current: number;
    currentPage: string;
}

export interface Pagination {
    total: number;
    pageSize?: number;
    current: number;
    onChange: (page: number, pageSize: number) => void;
    showSizeChanger?: boolean;
}
