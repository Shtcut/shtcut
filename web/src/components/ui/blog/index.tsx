'use client';
import { postData_2 } from '@shtcut/_shared/data';
import AnimatedContainer from '@shtcut/components/framer/animate-div';
import { AllBlogPost, SectionTabs } from '@shtcut/components/reusable-component/blog';
import Image from 'next/image';
import React from 'react';

const BlogComponent = () => {
    const postData = [
        { text: 'Education', color: '#3538CD' },
        { text: 'Customer Stories', color: '#C11574' }
    ];

    return (
        <div className="pt-24">
            <div className="max-w-screen-custom mx-auto px-4">
                <AnimatedContainer className="flex flex-col gap-y-4">
                    <h1 className="text-primary-0 font-semibold">Blog</h1>
                    <h1 className="font-semibold text-3xl md:text-5xl">Stories and interviews</h1>
                    <p className="text-[#726C6C]">
                        Subscribe to learn about new product features, the latest in technology, solutions, and updates.
                    </p>
                </AnimatedContainer>
                <AnimatedContainer className="my-[54px]">
                    <h2 className="font-semibold text-2xl">Recent blog posts</h2>
                    <div className="flex flex-col sm:flex-row gap-6 mt-[32px]">
                        <div className="w-full sm:w-1/2">
                            <Image
                                width={0}
                                height={0}
                                src={'/blog/why-marketing.png'}
                                alt="Hero"
                                className="w-full object-cover"
                                sizes="100vw"
                                loading="eager"
                            />
                            <div className="flex flex-col gap-4 mt-[32px]">
                                <div className="">
                                    <p className="text-xs text-primary-0 font-semibold">Olivia Rhye • 20 Jan 2024</p>
                                    <h1 className="font-semibold text-lg sm:text-2xl">
                                        Why marketing agencies should switch to Shtcut
                                    </h1>
                                </div>
                                <p className="text-sm text-[#726C6C]">
                                    How do you create compelling presentations that wow your colleagues and impress your
                                    managers?
                                </p>
                                <div className="flex items-center flex-wrap gap-2">
                                    {postData.map((blogs, index) => (
                                        <SectionTabs text={blogs.text} textColor={blogs.color} key={index} />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="w-full sm:w-1/2">
                            <div className="flex flex-col gap-6">
                                {postData_2.map((data, index) => (
                                    <div key={index} className="flex lg:flex-row flex-col lg:items-center gap-4">
                                        <Image
                                            width={300}
                                            height={200}
                                            src={data.images}
                                            alt="Hero"
                                            className="w-full lg:w-72 object-cover"
                                        />
                                        <div className="flex flex-col gap-2">
                                            <p className="text-xs text-primary-0 font-semibold">{data.timeline}</p>
                                            <h2 className="font-semibold">{data.title}</h2>
                                            <p className="text-sm text-[#726C6C]">{data.text}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                {data.objectData.map((dt) => (
                                                    <SectionTabs text={dt.text} textColor={dt.color} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </AnimatedContainer>
                <div className="w-full">
                    <AllBlogPost />
                </div>
            </div>
        </div>
    );
};

export default BlogComponent;
