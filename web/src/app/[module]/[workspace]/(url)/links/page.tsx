'use client';

import { Fragment, useState } from 'react';
import { Button, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Badge } from '@shtcut-ui/react';
import { dummyLinkHistory } from '@shtcut/_shared/constant';
import { LinkForm, LayoutBody } from '@shtcut/components';
import { motion } from 'framer-motion';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DndContext } from '@dnd-kit/core';
import { LinkCard } from '@shtcut/components/_shared/LinkCard';
import { ChevronDownIcon, LayoutGridIcon, ListIcon } from 'lucide-react';
import Image from 'next/image';
import LinkSkeleton from '@shtcut/components/_shared/LinkSkeleton';
import { IconSearch } from '@tabler/icons-react';
import { LinkContainer } from '@shtcut/containers';

const Links = () => {
    const [openLinkForm, setOpenLinkForm] = useState(false);

    return (
        <DndContext>
            <LayoutBody className="container">
                <div className="flex items-center justify-between space-y-2">
                    <h1 className="text-2xl font-bold tracking-light md:text-3xl">Links</h1>
                    {/* <Button className="bg-blue-600 w-[231px] font-medium flex justify-center items-center h-10 px-8 rounded-md text-white hover:bg-blue-700">
                        Create Link
                    </Button> */}
                </div>
                <LinkContainer/>
            </LayoutBody>
        </DndContext>
    );
};

export default Links;
