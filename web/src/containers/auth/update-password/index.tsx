'use client';

import { Card, Dict } from '@shtcut-ui/react';
import { Logo, NavLink } from '@shtcut/components/ui';
import { UpdatePasswordForm } from '@shtcut/components/form';
import { useAuth } from '@shtcut/hooks/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import { get, omit } from 'lodash';
import { AppAlert } from '@shtcut/components/_shared';

export const UpdatePasswordContainer = () => {
    const searchParams = useSearchParams();
    const { push } = useRouter();

    const { updatePassword, updatePasswordResponse } = useAuth();
    const { isSuccess, isLoading, error } = updatePasswordResponse;

    const errorMessage = get(error, ['data', 'meta', 'error', 'message'], 'An error occurred, please try again.');

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
        <Card className=" block w-full bg-white border-b border-gray-200 p-4 py-6 sm:p-6 sm:rounded-lg text-gray-600 space-y-8">
            <div className="text-center">
                <NavLink href="/">
                    <Logo width={150} className="mx-auto" />
                </NavLink>
                <div className="mt-5 space-y-2 w-full mx-auto md:w-1/2">
                    <h3 className="text-gray-800 text-2xl font-poppins font-bold sm:text-3xl">Update Password</h3>
                    <p className="font-poppins font-thin items-center">
                        Set the new password for your account so you can login and access all features.
                    </p>
                </div>
            </div>

            {error && errorMessage && (
                <AppAlert variant="destructive" className="mx-auto md:w-2/3 items-center" description={errorMessage} />
            )}

            <UpdatePasswordForm handleUpdatePasswordSubmit={handleUpdatePasswordSubmit} isLoading={isLoading} />
            <div className="relative w-3/5 mx-auto" />
            <div className="grid grid-cols-4 w-full sm:w-64 mx-auto gap-x-4" />
        </Card>
    );
};
