'use client';

import {
    Button,
    Modal,
    Dict,
    toast,
    Input,
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
    Badge
} from '@shtcut-ui/react';
import { LinkForm } from '@shtcut/components';
import { DndContext } from '@dnd-kit/core';
import { Fragment, useState } from 'react';
import { useLink } from '@shtcut/hooks/link';
import { get } from 'lodash';
import { useAuth } from '@shtcut/hooks';
import { useParams, useRouter } from 'next/navigation';
import { ChevronDownIcon, LayoutGridIcon, ListIcon } from 'lucide-react';
import { dummyLinkHistory } from '@shtcut/_shared/constant';
import { motion } from 'framer-motion';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { LinkCard } from '@shtcut/components/_shared/LinkCard';

interface LinkContainer {}

export const LinkContainer = () => {
    const params = useParams();
    const router = useRouter();

    const { module, workspace } = params;

    const { findAllLinksResponse: links } = useLink({ callLinks: true });

    const handleVisibility = () => {
        router.push(`/${module}/${workspace}/links/create`);
    };

    return (
        <DndContext>
            <div className="flex items-center justify-between space-y-2">
                <h1 className="text-2xl font-bold tracking-light md:text-3xl">Links</h1>
                <Button
                    onClick={() => handleVisibility()}
                    className="bg-blue-600 w-[231px] font-medium flex justify-center items-center h-10 px-8 rounded-md text-white hover:bg-blue-700"
                >
                    Create Link
                </Button>
            </div>
            <div className="flex-1 p-6 ">
                <div className="flex justify-between items-center mb-6">
                    <div className="relative rounded-md">
                        <Input className="max-w-[640px] h-10" placeholder="Search here..." />
                    </div>
                    <div className="flex space-x-2" />
                    <div className="flex items-center space-x-4">
                        <Button variant="outline">Filter</Button>
                        <Select>
                            <SelectTrigger id="sort">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                                <SelectItem value="date">Date</SelectItem>
                                <SelectItem value="name">Name</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="bg-[#F9FAFB] flex flex-row h-screen z-0 ">
                    <div className="max-w-[px] border rounded-md p-6">
                        <div className="my-3">
                            {dummyLinkHistory.map(({ id, ...link }) => (
                                <Fragment key={id}>
                                    <motion.div
                                        key={id}
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <SortableContext
                                            items={dummyLinkHistory && dummyLinkHistory}
                                            strategy={verticalListSortingStrategy}
                                        >
                                            <LinkCard key={id} id={id} {...link} />
                                        </SortableContext>
                                    </motion.div>
                                </Fragment>
                            ))}
                        </div>
                    </div>
                    <div className="ml-20 relative  lg:border-[8px] border-black w-60 lg:w-60 xl:w-64  overflow-hidden max-w-sm mx-auto z-0 border rounded-md p-6 my-3">
                        <div className="p-6 border bg-white rounded-lg shadow">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold">Domains</h2>
                                <ChevronDownIcon className="text-gray-400 h-5 w-5" />
                            </div>
                            <Input placeholder="Search tags" />
                            <div className="mt-4 space-y-2">
                                <Badge variant="secondary">Links</Badge>
                                <Badge variant="secondary">Analytics</Badge>
                                <Badge variant="secondary">Analytics</Badge>
                                <Badge variant="secondary">Analytics</Badge>
                            </div>
                        </div>
                    </div>
                    <div className="h-[40px] mb-12" />
                </div>
            </div>
        </DndContext>
    );
};
