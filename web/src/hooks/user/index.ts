import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { Dict } from '@shtcut-ui/react';
import { selectUser } from '@shtcut/redux/selectors/user';
import { useAppSelector } from '@shtcut/redux/store';
import { useLazyGetLoggedInUserQuery, useUpdateLoggedInUserMutation } from '@shtcut/services/user';
import { useEffect } from 'react';

interface UseUserProps {
    key?: string;
    callLoggedInUser?: boolean;
}

export interface UseUserReturnType {
    updateLoggedInUser: MutationTrigger<any>;
    updateLoggedInUserResponse: Dict;
    loggedInUserData: Dict;
    user: Dict;
    refetchUser: () => void;
}

export const useUser = ({ callLoggedInUser = false }: UseUserProps): UseUserReturnType => {
    const [updateLoggedInUser, updateLoggedInUserResponse] = useUpdateLoggedInUserMutation();
    const [triggerLoggedInUser] = useLazyGetLoggedInUserQuery();
    const loggedInUserData = useAppSelector(selectUser);

    useEffect(() => {
        if (callLoggedInUser) {
            triggerLoggedInUser({
                // population: JSON.stringify([{ path: '' }])
            });
        }
    }, [callLoggedInUser]);

    const refetchUser = () => {
        triggerLoggedInUser({
            // population: JSON.stringify([{ path: 'avatar' }])
        });
    };

    const user = loggedInUserData?.data?.data || {};

    return {
        updateLoggedInUser,
        updateLoggedInUserResponse,
        loggedInUserData,
        user,
        refetchUser
    };
};
