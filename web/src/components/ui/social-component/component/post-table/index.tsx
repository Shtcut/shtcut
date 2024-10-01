import { Card, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@shtcut-ui/react';

import { SocialPost } from '@shtcut/types/types';
import Image from 'next/image';
import React from 'react';
import ActionPostBtn from '../action-btn-table';

const headers = ['Channels', 'Status', 'Post', 'Date & Time', 'Labels', 'Author', ''];

const PostTable = ({ socialPosts }: { socialPosts: SocialPost[] }) => {
    const labelColors: { [key: string]: string } = {
        Marketing: 'bg-[#FCB900]',
        Brands: 'bg-[#8789F3]',
        Tech: 'bg-[#2F64E9]'
    };
    return (
        <Card className="mt-10 shadow-sm p-4 border border-black/5">
            <Table>
                <TableHeader>
                    <TableRow>
                        {headers.map((header, index) => (
                            <TableHead className="text-sm text-black" key={index}>
                                {header}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {socialPosts.map((post, index) => (
                        <TableRow key={index} className="cursor-pointer">
                            <TableCell className="font-medium text-xs">
                                <div className="flex gap-2">
                                    {Array.isArray(post.channels) ? (
                                        post.channels.map((channel, idx) => (
                                            <Image
                                                key={idx}
                                                src={channel}
                                                alt={`channel-${idx}`}
                                                width={16}
                                                height={16}
                                            />
                                        ))
                                    ) : (
                                        <span>{post.channels}</span>
                                    )}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-x-2">
                                    <div
                                        className={`w-2.5 h-2.5 rounded-full  ${post.status === 'Published' ? 'bg-[#2F64E9]' : post.status === 'Scheduled' ? 'bg-[#0B7B69]' : post.status === 'Failed' ? 'bg-[#C03744]' : post.status === 'Draft' ? 'bg-[#898384]' : ''} `}
                                    />{' '}
                                    <p
                                        className={`text-xs font-medium ${post.status === 'Published' ? 'text-[#2F64E9]' : post.status === 'Scheduled' ? 'text-[#0B7B69]' : post.status === 'Failed' ? 'text-[#C03744]' : post.status === 'Draft' ? 'text-[#898384]' : ''} flex items-center gap-2 `}
                                    >
                                        {' '}
                                        {post.status}
                                    </p>
                                </div>
                            </TableCell>
                            <TableCell className="w-80 text-xs font-medium">{post.post}</TableCell>
                            <TableCell className="text-xs font-medium">{post.date}</TableCell>
                            <TableCell className="text-xs font-medium flex flex-col  gap-y-2 justify-center ">
                                {Array.isArray(post.label)
                                    ? post.label.map((label, idx) => (
                                          <p
                                              key={idx}
                                              className={`inline-block px-2 py-1 text-xs text-center w-fit text-black rounded-md ${labelColors[label] || 'bg-gray-200'} mr-2`}
                                          >
                                              {label}
                                          </p>
                                      ))
                                    : post.label && (
                                          <p
                                              className={`inline-block px-2 py-1 text-xs text-center  w-fit text-black  rounded-md ${labelColors[post.label] || 'bg-gray-200'}`}
                                          >
                                              {post.label}
                                          </p>
                                      )}
                            </TableCell>
                            <TableCell className="text-xs font-medium">{post.author}</TableCell>
                            <TableCell className="">
                                <ActionPostBtn />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    );
};

export default PostTable;
