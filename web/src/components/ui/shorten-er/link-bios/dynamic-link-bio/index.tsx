'use client';

import SkeletonLoaderWeb from '@shtcut/components/general-template/web-template/components/skeleton-loader';
import WebTemplate1 from '@shtcut/components/general-template/web-template/template-1';
import WebTemplate2 from '@shtcut/components/general-template/web-template/template-2';
import WebTemplate3 from '@shtcut/components/general-template/web-template/template-3';
import React from 'react';

const TEMPLATES: Record<string, React.FC<{ linkData: any; isLoading: boolean }>> = {
    template_1: WebTemplate1,
    template_2: WebTemplate2,
    template_3: WebTemplate3
};

const LinkBioDynamicComponent = ({ linkData, isLoading }: { linkData: any | undefined; isLoading: boolean }) => {
    const templateKey = linkData?.template?.template || linkData?.template;

    const SelectedTemplate = TEMPLATES[templateKey];

    if (isLoading) return <SkeletonLoaderWeb />;

    if (!linkData || !templateKey || !SelectedTemplate) {
        return (
            <section className="text-center flex justify-center items-center h-screen py-10">
                <p>No valid template found.</p>
            </section>
        );
    }

    return (
        <section>
            <SelectedTemplate linkData={linkData} isLoading={isLoading} />
        </section>
    );
};

export default LinkBioDynamicComponent;
