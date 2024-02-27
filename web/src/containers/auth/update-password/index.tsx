'use client';

import { Dict } from '@shtcut-ui/react';
import { UpdatePasswordForm } from '@shtcut/components/form';
import { useAuth } from '@shtcut/hooks/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import { get, omit } from 'lodash';

export const UpdatePasswordContainer = () => {
    const searchParams = useSearchParams();
    const { push } = useRouter();

    const { updatePassword, updatePasswordResponse } = useAuth();
    const { isSuccess, isLoading, error } = updatePasswordResponse;

    const handleUpdatePasswordSubmit = (values: Dict) => {
        const payload = {
            email: searchParams.get('email'),
            ...omit(values, ['confirmPassword'])
        };
        updatePassword({
            payload,
            options: {
                successMessage: 'Password change successful'
            }
        });
    };

    if (isSuccess) {
        push('/auth/sign-in');
    }

    return (
        <UpdatePasswordForm
            handleUpdatePasswordSubmit={handleUpdatePasswordSubmit}
            isLoading={isLoading}
            error={error}
        />
    );
};
