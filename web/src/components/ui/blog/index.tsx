import { SectionTabs } from '@shtcut/components/reusable-component/blog';
import Image from 'next/image';
import React from 'react';
import { blob } from 'stream/consumers';

const BlogComponent = () => {
    const data = [
        { text: 'Education', color: '#C11574' },
        { text: 'Customer Stories', color: '#C11574' }
    ];
    return (
        <div className="pt-24">
            <div className="max-w-screen-custom mx-auto px-4">
                <div className="flex flex-col gap-y-4">
                    <h1 className="text-primary-0 font-semibold">Blog</h1>
                    <h1 className="font-semibold text-5xl">Stories and interviews</h1>
                    <p className="text-[#726C6C]">
                        Subscribe to learn about new product features, the latest in technology, solutions, and updates.
                    </p>
                </div>
                <div className="mt-[54px]">
                    <h2 className="font-semibold text-2xl">Recent blog posts</h2>
                    <div className="flex gap-4 mt-[32px]">
                        <div className="w-1/2">
                            <Image
                                width={0}
                                height={0}
                                src={'/blog/why-marketing.png'}
                                alt="Hero"
                                className="w-full object-cover"
                                sizes="100vw"
                                loading="eager"
                            />
                            <div className='flex flex-col gap-2 mt-[32px]'> 
                                <div className="">
                                    <p className="text-xs text-primary-0 font-semibold">Olivia Rhye • 20 Jan 2024</p>
                                    <h1 className="font-semibold text-2xl">
                                        Why marketing agencies should switch to Shtcut
                                    </h1>
                                </div>
                                <p className="text-sm text-[#726C6C]">
                                    How do you create compelling presentations that wow your colleagues and impress your
                                    managers?
                                </p>
                                <div>
                               {data.map(blogs)=>(
                                     <SectionTabs text={blogs.text} bg={''} textColor={''} />
                               )}
                                </div>
                            </div>
                        </div>
                        <div className="w-1/2">hey</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogComponent;
