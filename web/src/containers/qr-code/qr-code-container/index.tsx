'use client';

import { Button, Input, Select, SelectTrigger, SelectContent, SelectItem, SelectValue, Badge, Separator } from '@shtcut-ui/react';
import { DndContext } from '@dnd-kit/core';
import { Fragment } from 'react';
import { useLink } from '@shtcut/hooks/link';
import { useParams, useRouter } from 'next/navigation';
import { ChevronDownIcon } from 'lucide-react';
import { dummyLinkHistory } from '@shtcut/_shared/constant';
import { motion } from 'framer-motion';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { LinkCard } from '@shtcut/components/_shared/LinkCard';
import LinkSkeleton from '@shtcut/components/_shared/LinkSkeleton';
import Image from 'next/image';
import { useAuth } from '@shtcut/hooks';

interface QrcodeContainer {}

export const QrCodeContainer = () => {
    const params = useParams();
    const router = useRouter();

    const { module, workspace } = params;

    const { authData } = useAuth();
    const workspaceObject = authData?.workspaces?.find(({ slug }) => slug === workspace);

    const { findAllLinksResponse: links, isLoading } = useLink({
        callLinks: true,
        filter: { workspace: workspaceObject?._id }
    });

    const handleOnClick = () => {
        router.push(`/${module}/${workspace}/qr-codes/create`);
    };

    return (
        <DndContext>
            <div className="flex items-center justify-between space-y-2">
                <h1 className="text-2xl font-bold tracking-light md:text-3xl">Qr Code</h1>
                <Button
                    onClick={() => handleOnClick()}
                    className="bg-blue-600 w-[231px] font-medium flex justify-center items-center h-10 px-8 rounded-md text-white hover:bg-blue-700"
                >
                    Create Qr Codes
                </Button>
            </div>
            <div className="flex-1 p-6 ">
                <div className="flex justify-between w-full gap-4 items-center mb-6">
                    <div className="w-full flex-1 rounded-md">
                        <Input className="w-96 h-10" placeholder="Search here..." />
                    </div>
                   
                    <div className="flex items-center  space-x-4">
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
                <div className="bg-[#F9FAFB] flex lg:flex-row flex-col w-full gap-8  ">
                    <div className=" w-full p-6">
                        <div className="my-3">
                            {!isLoading
                                ? links?.map(({ id, ...link }) => (
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
                                                  <LinkCard
                                                      key={id}
                                                      id={id}
                                                      {...link}
                                                      domain={{ slug: link.domain.slug ?? 'shtcut.link' }}
                                                  />
                                              </SortableContext>
                                          </motion.div>
                                      </Fragment>
                                  ))
                                : Array.from({ length: 4 }).map((_, i) => <LinkSkeleton key={i} />)}

                            {!isLoading && links?.length === 0 && (
                                <div className="mt-4 w-[245px] h-auto flex flex-col justify-items-center mx-auto">
                                    <Image
                                        className="object-cover"
                                        width="220"
                                        height="220"
                                        alt="not-found"
                                        src="/no-data-found.svg"
                                    />
                                    <span className="font-normal justify-items-center mt-3 text-[#222]">
                                        No QR Codes Create! Get started - create your QR Codes
                                    </span>
                                    <p className="text-sm text-[#555] text-center px-3">
                                        <Button
                                            onClick={() => handleOnClick()}
                                            className="bg-blue-600 mb-5 w-[231px] justify-items-center font-medium flex justify-center items-center h-10 px-8 rounded-md text-white hover:bg-blue-700"
                                        >
                                            Create QR Code
                                        </Button>
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='w-4 hidden lg:flex'>  
                    
                    <Separator orientation='vertical'  />
                    </div>
                    <div className=" relative w-full h-fit lg:w-1/2 lg:border-[8px] border-black   overflow-hidden  border rounded-md p-6 my-3">
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
