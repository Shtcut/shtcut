'use client';

import React from 'react';

import ExpireLinkComponent from '@shtcut/components/ui/expired-link';
import { useAuth } from '@shtcut/hooks/auth';
import { isEmpty, isUndefined } from 'lodash';
import { useRouter } from 'next/navigation';

const ExpireLinkContainer = () => {
    const { authData } = useAuth();
    const workspace = authData?.workspaces?.[0]?.slug;
    const router = useRouter();
    const handleNavigate = () => {
        if (!isEmpty(authData) && !isUndefined(authData)) {
            router.push(`/url/${workspace}/links`);
        } else router.push('/auth?tab=sign-in');
    };

    return <ExpireLinkComponent handleNavigate={handleNavigate} />;
};

export default ExpireLinkContainer;
