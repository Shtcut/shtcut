import { Dispatch, isFulfilled, isRejectedWithValue } from '@reduxjs/toolkit';
import { Dict, toast } from '@shtcut-ui/react';
import { get, isEmpty, isObject, keys } from 'lodash';
import { OptionType } from '../auth/auth';
import { paginate } from '@shtcut/redux/slices/ui';

const variant = {
    success: 'default',
    danger: 'destructive'
};
const openNotification = (type: 'success' | 'danger' | 'info', message: string) => {
    toast({
        variant: variant[type] ?? 'default',
        title: type === 'danger' ? 'Uh oh! Something went wrong.' : type.toUpperCase(),
        description: message
    });
};

export const appMiddleware =
    ({ dispatch }: { dispatch: Dispatch }) =>
    (next) =>
    (action: Dict) => {
        const isMutation = get(action, ['meta', 'arg', 'type']) === 'mutation';
        const originalArgs = get(action, ['meta', 'arg', 'originalArgs']);
        const endpointName = get(action, ['meta', 'arg', 'endpointName']);
        const options = originalArgs?.options;
        const pagination = get(action, ['payload', 'meta', 'pagination']);

        const isWithPagination = isObject(originalArgs) && keys(originalArgs).includes('perPage');
        const { noErrorMessage, noSuccessMessage, errorMessage, successMessage }: OptionType = options || {};

        const errMsg =
            errorMessage || get(action, ['payload', 'data', 'meta', 'error', 'message']) || action?.error?.message;

        if (isRejectedWithValue(action) && !noErrorMessage) {
            if (isMutation) {
                openNotification('danger', errMsg);
            } else {
                openNotification('danger', 'A problem occurred, please refresh');
            }
        }
        if (isFulfilled(action) && isMutation && !noSuccessMessage) {
            openNotification('success', successMessage || 'Action Successful!');
        }
        if (isWithPagination && !isEmpty(pagination)) {
            dispatch(paginate({ pagination, endpointName }));
        }
        return next(action);
    };
