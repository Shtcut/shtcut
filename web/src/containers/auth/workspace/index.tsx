'use client';

import { Card, Dict, Separator } from '@shtcut-ui/react';
import { AppAlert, Logo } from '@shtcut/components';
import { ForgotPasswordForm, WorkspaceForm } from '@shtcut/components/form';
import { useAuth } from '@shtcut/hooks/auth';
import { useWorkspace } from '@shtcut/hooks/workspace';
import { IconAlertCircle } from '@tabler/icons-react';
import { get } from 'lodash';
import { redirect, useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface WorkspaceContainerProps {
    type: string;
}

export const WorkspaceContainer = ({ type }: WorkspaceContainerProps) => {
    const { createWorkspace, createWorkspaceResponse } = useWorkspace({});
    const { isLoading, error, data, isSuccess } = createWorkspaceResponse;
    const errorMessage = get(error, ['data', 'meta', 'error', 'message'], 'An error occurred, please try again.');

    const handleForgotPasswordSubmit = (data: Dict) => {
        const payload = {
            ...data,
            type,
            module: 'shtcut-shortener'
        };
        createWorkspace({ payload });
    };

    useEffect(() => {
        if (isSuccess && data) {
            const {
                data: { slug }
            } = data;
            redirect(`/url/${slug}/overview`);
        }
    }, [isSuccess, data]);

    const ErrorAlert = ({ message }: { message: string }) => (
        <AppAlert
            variant="destructive"
            className="mx-auto mb-3 items-center"
            description={message}
            icon={<IconAlertCircle />}
        />
    );

    return (
        <div className="p-6">
            <div className="mb-4 flex items-center justify-center">
                <Logo className="py-2" />
            </div>
            <div className="flex flex-col items-center justify-center space-y-3 border-bpx-4 py-6 pt-8 text-center sm:px-16">
                <h1 className="text-xl flex items-center justify-center font-semibold tracking-tight">
                    Create a workspace
                </h1>
                <p className="text-sm w-52 mb-10 space-x-2 justify-center text-muted-foreground">
                    Create. Track. Collaborate
                </p>
            </div>
            <div className="mt-2">{error && errorMessage && <ErrorAlert message={errorMessage} />}</div>
            <Separator className="w-full" />

            <div className="mt-5 ">
                <WorkspaceForm handleWorkspaceSubmit={handleForgotPasswordSubmit} isLoading={isLoading} error={error} />
            </div>
        </div>
    );
};
