import React, { useState } from 'react';
import SectionTabs from '../sections-tab';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { postData_3 } from '@shtcut/_shared/data';
import { cn } from '@shtcut-ui/react';
import AnimatedContainer from '@shtcut/components/framer/animate-div';
import { usePathname, useRouter } from 'next/navigation';

const AllBlogPost = () => {
    const router = useRouter();
    const pathName = usePathname();
    const tabsData = [
        { value: 'all', label: 'All Posts' },
        { value: 'Company News', label: 'Company News' },
        { value: 'Education', label: 'Education' },
        { value: 'Engineering', label: 'Engineering' },
        { value: 'Customer Success', label: 'Customer Success' },
        { value: 'Changelog', label: 'Changelog' }
    ];

    const [selectedTab, setSelectedTab] = useState('all');

    const handleTabClick = (value: string) => {
        setSelectedTab(value);
    };

    // Filter posts based on the selected tab
    const filteredPosts =
        selectedTab === 'all'
            ? postData_3
            : postData_3.filter((post) => post.objectData.some((category) => category.text === selectedTab));

    const handleNavigation = (name: string, id: string) => {
        router.push(`${pathName}/${name}/${id}`);
    };
    return (
        <div className="w-full">
            <AnimatedContainer direction="left" className="min-w-[300px] overflow-x-auto bg-transparent border-none">
                <div className="flex gap-3 overflow-x-auto">
                    {tabsData.map((tab) => (
                        <button
                            key={tab.value}
                            className={cn(
                                `inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-[#E5E7EB]  ${
                                    selectedTab === tab.value ? 'bg-[#F9FAFB] text-black ' : 'text-[#787e8d] '
                                }`
                            )}
                            onClick={() => handleTabClick(tab.value)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </AnimatedContainer>
            <AnimatedContainer className="w-full mt-6">
                {tabsData.map((tab) => (
                    <div
                        key={tab.value}
                        className={`grid lg:grid-cols-3 gap-6 sm:grid-cols-2 ${
                            selectedTab === tab.value ? 'block' : 'hidden'
                        }`}
                    >
                        {filteredPosts.map((post) => (
                            <div key={post.title} className="h-[444px] flex flex-col gap-3">
                                <Image
                                    width={0}
                                    height={240}
                                    src={post.images}
                                    alt={post.title}
                                    className="w-full object-cover h-[240px]"
                                    sizes="100vw"
                                    loading="eager"
                                />
                                <p className="text-xs text-primary-0 font-semibold">{post.timeline}</p>
                                <div className="flex justify-between">
                                    <h2 className="text-lg font-semibold leading-tight">{post.title}</h2>
                                    <ArrowUpRight
                                        className="cursor-pointer"
                                        onClick={() => handleNavigation(post.id, post.title)}
                                    />
                                </div>
                                <p className="text-sm text-[#726C6C]">{post.text}</p>
                                <div className="mt-2 flex items-center gap-2">
                                    {post.objectData.map((tag) => (
                                        <SectionTabs key={tag.text} text={tag.text} textColor={tag.color} />
                                    ))}
                                </div>
                            </div>
                        ))}
                        {filteredPosts.length === 0 && <p>No posts found for this category.</p>}
                    </div>
                ))}
            </AnimatedContainer>
        </div>
    );
};

export default AllBlogPost;
