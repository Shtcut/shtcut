import { Dispatch, isFulfilled, isRejectedWithValue } from '@reduxjs/toolkit';
import { Dict } from '@shtcut-ui/react';
import { get, isEmpty, isObject, keys } from 'lodash';
import { OptionType } from '../auth/auth';
import { paginate } from '@shtcut/redux/slices/ui';

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
                // todo show a toast error message
            }
        }
        if (isFulfilled(action) && isMutation && !noSuccessMessage) {
            // todo show a toast success message
        }
        if (isWithPagination && !isEmpty(pagination)) {
            dispatch(paginate({ pagination, endpointName }));
        }
        return next(action);
    };
