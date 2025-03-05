import { SearchInput } from '@shtcut/components/dashboard/nav-component';
import React from 'react';
import SocialMediaInbox from './components/social-feed';

const ReportComponent = () => {
    return (
        <div>
            <section className="flex items-center justify-between">
                <div>
                    <h1 className="font-semibold text-[#2B2829] text-xl">Reports</h1>
                    <p className="text-[#433E3F]">Manage your workflow and provide seamless customer experienxe</p>
                </div>
                <SearchInput />
            </section>
            <SocialMediaInbox />
        </div>
    );
};

export default ReportComponent;
