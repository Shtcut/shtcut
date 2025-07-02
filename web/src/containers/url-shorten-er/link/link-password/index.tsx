'use client';
import React from 'react';
import LinkPasswordComponent from '@shtcut/components/dashboard/link/link-password';
import { useSearchParams } from 'next/navigation';
const LinkPasswordContainer = () => {
    const queryParams = useSearchParams();
    const aliasQuery = queryParams.get('alias');

    return <LinkPasswordComponent aliasQuery={aliasQuery ?? ''} />;
};

export default LinkPasswordContainer;
