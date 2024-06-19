import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { Dict } from '@shtcut-ui/react';
import { selectUser } from '@shtcut/redux/selectors/user';
import { useAppSelector } from '@shtcut/redux/store';
import { loggedInUserTag } from '@shtcut/services/tags';
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
}

export const useUser = ({ callLoggedInUser = false, key }: UseUserProps): UseUserReturnType => {
    const [updateLoggedInUser, updateLoggedInUserResponse] = useUpdateLoggedInUserMutation();
    const [triggerLoggedInUser] = useLazyGetLoggedInUserQuery();
    const loggedInUserData = useAppSelector(selectUser);

    useEffect(() => {
        if (callLoggedInUser) triggerLoggedInUser(loggedInUserTag);
    }, [callLoggedInUser]);

    return {
        updateLoggedInUser,
        updateLoggedInUserResponse,
        loggedInUserData
    };
};
