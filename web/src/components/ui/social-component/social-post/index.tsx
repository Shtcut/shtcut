'use client';

import Tabs from '@shtcut/components/_shared/Tabs';
import { SearchInput } from '@shtcut/components/dashboard/nav-component';
import React, { useState } from 'react';
import PostTable from '../component/post-table';
import { socialPosts } from '@shtcut/_shared/data';
import { SocialPost } from '@shtcut/types/types';

const SocialPostComponent = () => {
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);
    const tabs = [
        { id: 'all', label: 'All' },
        { id: 'drafts', label: 'Drafts' },
        { id: 'scheduled', label: 'Scheduled' },
        { id: 'published', label: 'Published' },
        { id: 'failed', label: 'Failed' }
    ];

    const handleTabChange = (index: number) => {
        setSelectedTabIndex(index);
    };

    const getFilteredPosts = (): SocialPost[] => {
        switch (tabs[selectedTabIndex].id) {
            case 'drafts':
                return socialPosts.filter((post) => post.status === 'Draft');
            case 'scheduled':
                return socialPosts.filter((post) => post.status === 'Scheduled');
            case 'published':
                return socialPosts.filter((post) => post.status === 'Published');
            case 'failed':
                return socialPosts.filter((post) => post.status === 'Failed');
            default:
                return socialPosts;
        }
    };

    const filteredPosts = getFilteredPosts();

    return (
        <div>
            <section>
                <h1 className="font-semibold text-[#2B2829] text-xl">Posts</h1>
                <section className="flex items-center justify-between mt-4">
                    <div className="w-[512px]">
                        <Tabs tabs={tabs} selectedTabIndex={selectedTabIndex} onTabClick={handleTabChange} />
                    </div>
                    <div className="">
                        <SearchInput placeholder="search" />
                    </div>
                </section>
                <PostTable socialPosts={filteredPosts} />
            </section>
        </div>
    );
};

export default SocialPostComponent;
