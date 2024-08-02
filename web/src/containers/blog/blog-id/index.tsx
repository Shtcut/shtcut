'use client';
import BlogIdComponent from '@shtcut/components/ui/blog/blog-id';
import { useParams } from 'next/navigation';
import React from 'react';

const BlogIdContainer = () => {
    const params = useParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    return <BlogIdComponent paramsId={id} />;
};

export default BlogIdContainer;
